import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector, useIntl } from '@umijs/max';
import { Button, message, Modal, Popconfirm, Switch, Tag } from 'antd';
import { useEffect, useState, useMemo, useCallback } from 'react';
import AdminForm from './components/adminForm';

function Admin(props) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { adminList } = useSelector((state) => state.admin);
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  }, [adminList]);

  const switchChange = useCallback(
    (row, value) => {
      const next = { ...row, enabled: value };
      dispatch({
        type: 'admin/_editAdmin',
        payload: next,
      });
      message.success(intl.formatMessage({ id: 'common.successEdit' }));
    },
    [dispatch, intl],
  );

  const deleteAdmin = useCallback(
    (info) => {
      dispatch({
        type: 'admin/_deleteAdmin',
        payload: info,
      });
      message.success(intl.formatMessage({ id: 'common.successDelete' }));
    },
    [dispatch, intl],
  );

  const showModal = useCallback((row) => {
    setAdminInfo(row);
    setIsModalOpen(true);
  }, []);

  const columns = useMemo(
    () => [
      {
        title: intl.formatMessage({ id: 'admin.col.loginId' }),
        dataIndex: 'loginId',
        key: 'loginId',
        align: 'center',
      },
      {
        title: intl.formatMessage({ id: 'admin.col.loginPwd' }),
        dataIndex: 'loginPwd',
        key: 'loginPwd',
        align: 'center',
      },
      {
        title: intl.formatMessage({ id: 'admin.col.nickname' }),
        dataIndex: 'nickname',
        key: 'nickname',
        align: 'left',
      },
      {
        title: intl.formatMessage({ id: 'admin.col.avatar' }),
        dataIndex: 'avatar',
        key: 'avatar',
        valueType: 'avatar',
        align: 'center',
      },
      {
        title: intl.formatMessage({ id: 'admin.col.permission' }),
        dataIndex: 'permission',
        key: 'permission',
        align: 'center',
        render: (_, row) => {
          return row.permission === 1 ? (
            <Tag color="blue">{intl.formatMessage({ id: 'admin.role.super' })}</Tag>
          ) : (
            <Tag color="green">{intl.formatMessage({ id: 'admin.role.normal' })}</Tag>
          );
        },
      },
      {
        title: intl.formatMessage({ id: 'admin.col.enabled' }),
        dataIndex: 'enabled',
        key: 'enabled',
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
        title: intl.formatMessage({ id: 'admin.col.actions' }),
        dataIndex: 'option',
        align: 'center',
        render: (_, row) => {
          return (
            <div key={row._id}>
              <Button
                type="link"
                size="small"
                onClick={() => showModal(row)}
              >
                {intl.formatMessage({ id: 'common.edit' })}
              </Button>
              <Popconfirm
                title={intl.formatMessage({ id: 'common.deleteConfirm' })}
                description={intl.formatMessage({ id: 'common.deleteAdminDesc' })}
                onConfirm={() => deleteAdmin(row)}
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
    [intl, switchChange, deleteAdmin, showModal],
  );

  const handleOk = () => {
    dispatch({
      type: 'admin/_editAdmin',
      payload: adminInfo,
    });
    message.success(intl.formatMessage({ id: 'common.successEdit' }));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageContainer title={intl.formatMessage({ id: 'menu.admin.list' })}>
        <ProTable
          search={false}
          headerTitle={intl.formatMessage({ id: 'admin.listTitle' })}
          dataSource={adminList}
          rowKey={(row) => row._id}
          columns={columns}
        />
        <Modal
          title={intl.formatMessage({ id: 'admin.modalEdit' })}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ top: '50px' }}
        >
          <AdminForm
            type="edit"
            adminInfo={adminInfo}
            setAdminInfo={setAdminInfo}
            submitHandle={handleOk}
          />
        </Modal>
      </PageContainer>
    </div>
  );
}

export default Admin;
