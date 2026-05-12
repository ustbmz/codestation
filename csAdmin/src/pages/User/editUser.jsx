import { PageContainer } from '@ant-design/pro-components';
import { useNavigate, useIntl, useParams } from '@umijs/max';
import { message } from 'antd';
import { useState, useEffect } from 'react';
import UserForm from './components/userForm';
import { editUser, getUserByID } from '@/services/UserController';

function EditUser(props) {
  const intl = useIntl();
  const { id } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    avatar: '',
    email: '',
    qq: '',
    wx: '',
    point: 100,
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserByID(id);
      setUserInfo(data);
    }
    fetchData();
  }, [id]);

  async function submitHandle() {
    await editUser(userInfo);
    message.success(intl.formatMessage({ id: 'common.successEdit' }));
    navigate('/user/userList');
  }

  return (
    <div
      style={{
        background: '#F9F9F9',
      }}
    >
      <PageContainer title={intl.formatMessage({ id: 'menu.user.edit' })}>
        <div className="container" style={{ width: '500px' }}>
          <UserForm
            type="edit"
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            submitHandle={submitHandle}
          />
        </div>
      </PageContainer>
    </div>
  );
}

export default EditUser;
