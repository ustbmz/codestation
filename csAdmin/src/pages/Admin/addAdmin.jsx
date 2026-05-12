import { PageContainer } from '@ant-design/pro-components';
import { useDispatch, useNavigate, useIntl } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';
import AdminForm from './components/adminForm';

function AddAdmin(props) {
  const intl = useIntl();
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
    dispatch({ type: 'admin/_addAdmin', payload: newAdminInfo });
    message.success(intl.formatMessage({ id: 'common.successAdd' }));
    navigate('/admin/adminList');
  }

  return (
    <div
      style={{
        background: '#F9F9F9',
      }}
    >
      <PageContainer title={intl.formatMessage({ id: 'menu.admin.add' })}>
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
