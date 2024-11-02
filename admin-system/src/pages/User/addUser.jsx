import { PageContainer } from '@ant-design/pro-components';
import {  useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';
import UserForm from './components/userForm';
import { addUser } from '@/services/UserController';

function AddUser(props) {
  const navigate = useNavigate();
  const [newUserInfo, setNewuserInfo] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    avatar: '',
    email: '',
    qq: '',
    wx: '',
    point:100,
  });
  async function submitHandle() {
    const data = await addUser(newUserInfo);
    message.success('添加成功');
    navigate('/user/userList');
  }

  return (
    <div
      style={{
        background: '#F9F9F9',
      }}
    >
      <PageContainer>
        <div className="container" style={{ width: '500px' }}>
          <UserForm
            type="add"
            userInfo={newUserInfo}
            setUserInfo={setNewuserInfo}
            submitHandle={submitHandle}
          />
        </div>
      </PageContainer>
    </div>
  );
}

export default AddUser;
