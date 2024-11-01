import { checkAdminIsExist } from '@/services/AdminController';
import { PageContainer } from '@ant-design/pro-components';
import { useDispatch, useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';
import AdminForm from './components/adminForm';

function AddAdmin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newAdminInfo, setNewAdminInfo] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    avatar: '',
    permission: 2,
  });
  async function submitHandle() {
    // const { data } = await checkAdminIsExist(newAdminInfo.loginId);
    // console.log('🦊 > file: addAdmin.jsx:20 > submitHandle > data:', data);
    // if (!data) {
    //   message.error('用户名已存在');
    //   return;
    // }
    dispatch({ type: 'admin/_addAdmin', payload: newAdminInfo });
    message.success('添加成功');
    navigate('/admin/adminList');
  }

  return (
    <div
      style={{
        background: '#F9F9F9',
      }}
    >
      <PageContainer>
        <div className="container" style={{ width: '500px' }}>
          <AdminForm
            type="add"
            adminInfo={newAdminInfo}
            setAdminInfo={setNewAdminInfo}
            submitHandle={submitHandle}
          />
        </div>
      </PageContainer>
    </div>
  );
}

export default AddAdmin;
