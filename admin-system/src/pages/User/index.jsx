import { delUser, getUserList ,editUser} from '@/services/UserController';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, Popconfirm, Switch, message } from 'antd';
import { useRef, useState } from 'react';

function User(props) {
  const tableRef = useRef();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  function handleChangePage(current, pageSize) {
    console.log(
      '🦊 > file: index.jsx:13 > handleChangePage > pageSize:',
      pageSize,
    );
    console.log(
      '🦊 > file: index.jsx:13 > handleChangePage > current:',
      current,
    );
    setPagination({ current, pageSize });
  }
  const columns = [
    {
      title: '序号',
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
      title: '用户ID',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '用户密码',
      dataIndex: 'loginPwd',
      key: 'loginPwd',
      align: 'center',
      search: false,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'left',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      valueType: 'avatar',
      align: 'center',
      search: false,
    },
    {
      title: '积分',
      dataIndex: 'points',
      key: 'points',
      align: 'center',
      search: false,
    },
    {
      title: '账号状态',
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
      title: '操作',
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
              编辑
            </Button>
            <Popconfirm
              title="是否确认删除"
              description="Are you sure to delete this user?"
              onConfirm={() => {
                deleteUser(row);
              }}
              okText="确认"
              cancelText="取消"
            >
              <Button type="link" size="small" disabled={false}>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const deleteUser = async (userInfo) => {
    const res = await delUser(userInfo._id);
    message.success('删除成功');
    tableRef.current.reload();
  };

  const switchChange = async (row, value) => {
    const userInfo = { ...row, enabled: value };
    console.log('🦊 > file: index.jsx:136 > switchChange > row:', userInfo);
    const res = await editUser(userInfo);
    message.success('修改成功');
    tableRef.current.reload();

  };

  return (
    <div>
      <PageContainer>
        <ProTable
          actionRef={tableRef}
          headerTitle="用户列表"
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
            console.log(params, 'request params');
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
