import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector, useIntl } from '@umijs/max';
import { Button, Form, Input, Select, Space } from 'antd';
import { useEffect, useRef } from 'react';

function InterviewForm({ type, interviewInfo, setinterviewInfo, submitHandle }) {
  const intl = useIntl();
  const editorRef = useRef();
  const dispatch = useDispatch();
  const { typeList } = useSelector((state) => state.type);

  useEffect(() => {
    if (!typeList.length) {
      dispatch({
        type: 'type/_initTypeList',
      });
    }
  }, [typeList, dispatch]);

  function updateInfo(value, key) {
    const newinterviewInfo = { ...interviewInfo };
    newinterviewInfo[key] = value;
    setinterviewInfo(newinterviewInfo);
  }

  function handleChange(value) {
    const newinterviewInfo = { ...interviewInfo, typeId: value };
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
    const newinterviewInfo = { ...interviewInfo, interviewContent: content };
    setinterviewInfo(newinterviewInfo);
    submitHandle(newinterviewInfo);
  }

  const editorLang =
    intl.locale?.toLowerCase().startsWith('en') ? 'en-US' : 'zh-CN';

  return (
    <Form
      initialValues={interviewInfo}
      autoComplete="off"
      onFinish={beforeSubmit}
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item
        label={intl.formatMessage({ id: 'interview.form.title' })}
        name="interviewTitle"
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'interview.form.ruleTitle' }),
          },
        ]}
        wrapperCol={{ span: 10 }}
      >
        <Input
          value={interviewInfo?.interviewTitle}
          onChange={(e) => updateInfo(e.target.value, 'interviewTitle')}
        ></Input>
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ id: 'interview.form.type' })}
        name="typeId"
      >
        <Space wrap>
          <Select
            style={{ width: 220 }}
            placeholder={intl.formatMessage({ id: 'interview.form.type' })}
            onChange={handleChange}
            options={options}
          />
        </Space>
      </Form.Item>
      <Form.Item
        name={'interviewContent'}
        label={intl.formatMessage({ id: 'interview.form.content' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'interview.form.ruleContent' }),
          },
        ]}
      >
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          language={editorLang}
          useCommandShortcut={true}
          ref={editorRef}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === 'edit'
            ? intl.formatMessage({ id: 'interview.form.submitEdit' })
            : intl.formatMessage({ id: 'interview.form.submitAdd' })}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default InterviewForm;
