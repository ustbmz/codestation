import { PageContainer } from '@ant-design/pro-components';
import { useDispatch, useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useState,useEffect } from 'react';
import UserForm from './components/userForm';
import { editUser,getUserByID} from '@/services/UserController';
import { useParams } from '@umijs/max';
function EditUser (props) {

  const { id } = useParams();
  console.log('🦊 > file: editUser.jsx:11 > EditUser > id:', id);

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
      const { data } = await getUserByID(id)
      console.log('🦊 > file: editUser.jsx:29 > fetchData > data:', data);
      setUserInfo(data)
    }
    fetchData()
  }, [])

 
  async function submitHandle() {
    const data = await editUser(userInfo);
    console.log('🦊 > file: editUser.jsx:38 > submitHandle > data:', data);
    message.success('修改成功');
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
