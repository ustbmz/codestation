import { delUser, getUserList, editUser } from '@/services/UserController';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useNavigate, useIntl } from '@umijs/max';
import { Button, Popconfirm, Switch, message } from 'antd';
import { useRef, useState, useMemo, useCallback } from 'react';

function User(props) {
  const intl = useIntl();
  const tableRef = useRef();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  function handleChangePage(current, pageSize) {
    setPagination({ current, pageSize });
  }

  const deleteUser = useCallback(
    async (userInfo) => {
      await delUser(userInfo._id);
      message.success(intl.formatMessage({ id: 'common.successDelete' }));
      tableRef.current.reload();
    },
    [intl],
  );

  const switchChange = useCallback(
    async (row, value) => {
      const userInfo = { ...row, enabled: value };
      await editUser(userInfo);
      message.success(intl.formatMessage({ id: 'common.successEdit' }));
      tableRef.current.reload();
    },
    [intl],
  );

  const columns = useMemo(
    () => [
      {
        title: intl.formatMessage({ id: 'user.col.index' }),
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        search: false,
        render: (_, row, index) => {
          return (
            pagination.current * pagination.pageSize -
            pagination.pageSize +
            index +
            1
          );
        },
      },
      {
        title: intl.formatMessage({ id: 'user.col.loginId' }),
        dataIndex: 'loginId',
        key: 'loginId',
        align: 'center',
      },
      {
        title: intl.formatMessage({ id: 'user.col.loginPwd' }),
        dataIndex: 'loginPwd',
        key: 'loginPwd',
        align: 'center',
        search: false,
      },
      {
        title: intl.formatMessage({ id: 'user.col.nickname' }),
        dataIndex: 'nickname',
        key: 'nickname',
        align: 'left',
      },
      {
        title: intl.formatMessage({ id: 'user.col.avatar' }),
        dataIndex: 'avatar',
        key: 'avatar',
        valueType: 'avatar',
        align: 'center',
        search: false,
      },
      {
        title: intl.formatMessage({ id: 'user.col.points' }),
        dataIndex: 'points',
        key: 'points',
        align: 'center',
        search: false,
      },
      {
        title: intl.formatMessage({ id: 'user.col.enabled' }),
        dataIndex: 'enabled',
        key: 'enabled',
        search: false,
        align: 'center',
        render: (_, row) => {
          return (
            <Switch
              size="small"
              key={row._id}
              defaultChecked={row.enabled ? true : false}
              onChange={(value) => switchChange(row, value)}
            ></Switch>
          );
        },
      },
      {
        title: intl.formatMessage({ id: 'user.col.actions' }),
        dataIndex: 'option',
        align: 'center',
        search: false,
        render: (_, row) => {
          return (
            <div key={row._id}>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  navigate(`/User/editUser/${row._id}`);
                }}
              >
                {intl.formatMessage({ id: 'common.edit' })}
              </Button>
              <Popconfirm
                title={intl.formatMessage({ id: 'common.deleteConfirm' })}
                description={intl.formatMessage({ id: 'common.deleteUserDesc' })}
                onConfirm={() => {
                  deleteUser(row);
                }}
                okText={intl.formatMessage({ id: 'common.confirm' })}
                cancelText={intl.formatMessage({ id: 'common.cancel' })}
              >
                <Button type="link" size="small" disabled={false}>
                  {intl.formatMessage({ id: 'common.delete' })}
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    [intl, pagination, navigate, deleteUser, switchChange],
  );

  return (
    <div>
      <PageContainer title={intl.formatMessage({ id: 'menu.user.list' })}>
        <ProTable
          actionRef={tableRef}
          headerTitle={intl.formatMessage({ id: 'user.listTitle' })}
          rowKey={(row) => row._id}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
            ...pagination,
            onChange: handleChangePage,
          }}
          request={async (params) => {
            const result = await getUserList(params);
            return {
              data: result.data.data,
              total: result.data.total,
              success: !result.code,
            };
          }}
        ></ProTable>
      </PageContainer>
    </div>
  );
}

export default User;
