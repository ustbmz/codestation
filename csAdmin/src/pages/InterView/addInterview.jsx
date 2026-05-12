import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';
import { useNavigate, useIntl } from '@umijs/max';
import InterviewForm from './components/interviewForm';
import { addInterView } from '@/services/InterviewController';

function AddInterview(props) {
  const intl = useIntl();
  const [interviewInfo, setinterviewInfo] = useState({
    interviewTitle: '',
    interviewContent: '',
    typeId: '',
  });

  const navigator = useNavigate();
  async function submitHandle() {
    await addInterView(interviewInfo);
    navigator('/interview/interviewList');
  }

  return (
    <div
      style={{
        background: '#F9F9F9',
      }}
    >
      <PageContainer title={intl.formatMessage({ id: 'menu.interview.add' })}>
        <div className="container" style={{ width: '1000' }}>
          <InterviewForm
            type="add"
            interviewInfo={interviewInfo}
            setinterviewInfo={setinterviewInfo}
            submitHandle={submitHandle}
          />
        </div>
      </PageContainer>
    </div>
  );
}

export default AddInterview;
