import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { useEffect } from 'react';
import { Tag, Switch, Button } from 'antd';
function Admin(props) {
  const dispatch = useDispatch();
  const { adminList } = useSelector((state) => state.admin);
  console.log('🦊 > file: index.jsx:7 > Admin > adminList:', adminList);

  useEffect(() => {
    dispatch({
      type: 'admin/_initAdminList',
    });
  },[]);

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
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      valueType: 'avatar',
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
      render: (_, row) => {
        return (
          <Switch
            size="small"
            key={row._id}
            defaultChecked={row.enabled ? true : false}
            onChange={() => {}}
          ></Switch>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      align:'center',
      render: (_, row) => {
        return (
          <div key={row._id}>
            <Button type="link" size="small">
              编辑
            </Button>
            <Button type="link" size="small">
              删除
            </Button>
          </div>
        );
      }
    },
  ];

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
      </PageContainer>
    </div>
  );
}

export default Admin;
