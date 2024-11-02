import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewForm from './components/interviewForm';
import { addInterView } from '@/services/InterviewController'
function AddInterview(props) {
  const [interviewInfo, setinterviewInfo] = useState({
    interviewTitle: '',
    interviewContent: '',
    typeId: '',
  });

  const navigator = useNavigate();
  async function submitHandle() {
    const data = await addInterView(interviewInfo);
    console.log(
      '🦊 > file: addInterview.jsx:17 > submitHandle > data:',
      interviewInfo,
    );
    navigator('/interview/interviewList');
  }

  return (
    <div
      style={{
        background: '#F9F9F9',
      }}
    >
      <PageContainer>
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
