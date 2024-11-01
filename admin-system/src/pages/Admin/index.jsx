import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, message, Modal, Popconfirm, Switch, Tag } from 'antd';
import { useEffect, useState } from 'react';
import AdminForm from './components/adminForm';
function Admin(props) {
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

  const columns = [
    {
      title: '登录账号',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '登录密码',
      dataIndex: 'loginPwd',
      key: 'loginPwd',
      align: 'center',
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
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      align: 'center',
      render: (_, row) => {
        return row.permission === 1 ? (
          <Tag color="blue">超级管理员</Tag>
        ) : (
          <Tag color="green">普通管理员</Tag>
        );
      },
    },
    {
      title: '账号状态',
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
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      render: (_, row) => {
        return (
          <div key={row._id}>
            <Button
              type="link"
              size="small"
              onClick={() => {
                showModal(row);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否确认删除"
              description="Are you sure to delete this admin user?"
              onConfirm={() => {
                deleteAdmin(row);
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

  const switchChange = (row, value) => {
    const adminInfo = { ...row, enabled: value };
    dispatch({
      type: 'admin/_editAdmin',
      payload: adminInfo,
    });
    message.success('修改成功');
  };
  const deleteAdmin = (adminInfo) => {
    console.log(
      '🦊 > file: index.jsx:93 > deleteAdmin > adminInfo:',
      adminInfo,
    );
    dispatch({
      type: 'admin/_deleteAdmin',
      payload: adminInfo,
    });
    message.success('删除成功');
  };

  function showModal(row) {
    console.log('🦊 > file: index.jsx:126 > showModal > row:', row);
    console.log('点击编辑');
    setAdminInfo(row);
    setIsModalOpen(true);
  }

  const handleOk = () => {
    console.log('🦊 > file: index.jsx:133 > handleOk > handleOk:', handleOk);
    dispatch({
      type: 'admin/_editAdmin',
      payload: adminInfo,
    });
    message.success('修改成功');
    setIsModalOpen(false);

  };

  const handleCancel = () => {
    console.log('点击确定');
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageContainer>
        <ProTable
          search={false}
          headerTitle="管理员列表"
          dataSource={adminList}
          rowKey={(row) => row._id}
          columns={columns}
        />
        <Modal
          title="修改管理员信息"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{top:'50px'}}
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
