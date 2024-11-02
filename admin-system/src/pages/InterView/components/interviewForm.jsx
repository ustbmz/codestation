import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Form, Input, Select, Space } from 'antd';
import { useEffect, useRef } from 'react';

function InterviewForm({ type, interviewInfo, setinterviewInfo, submitHandle }) {
//   const interViewRef = useRef();
  const editorRef = useRef();
  const dispatch = useDispatch();
//   if (interViewRef.current) {
//     interViewRef.current.setFieldsValue(adminInfo);
//   }
  const { typeList } = useSelector((state) => state.type);

  useEffect(() => {
    if (!typeList.length) {
      dispatch({
        type: 'type/_initTypeList',
      });
    }
  }, [typeList]);
  /**
   * 更新表单状态
   * @param {*} value
   * @param {*} key
   */
  function updateInfo(value, key) {
    console.log('🦊 > file: adminForm.jsx:20 > updateInfo > key:', key);
    console.log('🦊 > file: adminForm.jsx:20 > updateInfo > value:', value);
    const newinterviewInfo = { ...interviewInfo };
    newinterviewInfo[key] = value;
    setinterviewInfo(newinterviewInfo);
  }

  function handleChange(value) {
    const newinterviewInfo = { ...interviewInfo, typeId: value };
    console.log('🦊 > file: interviewForm.jsx:38 > handleChange > newinterviewInfo:', newinterviewInfo);
    setinterviewInfo(newinterviewInfo);
  }

  const options = typeList.map((item) => {
    return {
      label: item.typeName,
      value: item._id,
    };
  });

  function beforeSubmit() {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getHTML();
    const newinterviewInfo = { ...interviewInfo, interviewContent : content };
    setinterviewInfo(newinterviewInfo);
    submitHandle(newinterviewInfo);
  }

  return (
    <Form
      initialValues={interviewInfo}
      autoComplete="off"
      actionRef="interViewRef"
      onFinish={beforeSubmit}
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 14 }}
    >
      {/* interviewTitle */}
      <Form.Item
        label="标题"
        name="interviewTitle"
        rules={[{ required: true, message: '请输入面试题标题' }]}
        wrapperCol={{ span: 10 }}
      >
        <Input
          value={interviewInfo?.interviewTitle}
          onChange={(e) => updateInfo(e.target.value, 'interviewTitle')}
        ></Input>
      </Form.Item>
      {/* typeId */}
      <Form.Item label="面试题类型" name="typeId">
        <Space wrap>
          <Select
            defaultValue="HTML"
            style={{ width: 120 }}
            onChange={handleChange}
            options={options}
          />
        </Space>
      </Form.Item>
      {/* interviewContent */}
      <Form.Item
        name={'interviewContent'}
        label="面试题内容"
        rules={[
          {
            required: true,
            message: 'Please choose your question content!',
          },
        ]}
      >
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          language={'zh-CN'}
          useCommandShortcut={true}
          ref={editorRef}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === 'edit' ? '确认修改' : '新增面试题'}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default InterviewForm;
