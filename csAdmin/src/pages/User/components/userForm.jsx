import { checkUserIsExist } from '@/services/UserController';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Upload } from 'antd';
import { useRef, useState } from 'react';
import { useIntl } from '@umijs/max';

function UserForm({ type, userInfo, setUserInfo, submitHandle }) {
  const intl = useIntl();
  const formRef = useRef();
  if (formRef.current) {
    formRef.current.setFieldsValue(userInfo);
  }

  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  function updateInfo(value, key) {
    const newUserInfo = { ...userInfo };
    newUserInfo[key] = value;
    setUserInfo(newUserInfo);
  }
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const changeAvatar = async (file) => {
    const base64 = await getBase64(file.originFileObj);
    updateInfo(base64, 'avatar');
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function checkLoginID() {
    if (type === 'edit') {
      return true;
    }
    const { data } = await checkUserIsExist(userInfo.loginId);
    if (data) {
      return Promise.reject(
        intl.formatMessage({ id: 'user.form.loginIdExists' }),
      );
    }
  }
  return (
    <Form
      initialValues={userInfo}
      autoComplete="off"
      ref={formRef}
      onFinish={submitHandle}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label={intl.formatMessage({ id: 'user.form.loginId' })}
        name="loginId"
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'user.form.ruleLoginId' }),
          },
          { validateTrigger: 'onBlur', validator: checkLoginID },
        ]}
      >
        <Input
          value={userInfo?.loginId}
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          disabled={type === 'edit' ? true : false}
        ></Input>
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ id: 'user.form.loginPwd' })}
        name="loginPwd"
        rules={[
          type === 'edit'
            ? {
                required: true,
                message: intl.formatMessage({ id: 'user.form.ruleLoginPwd' }),
              }
            : null,
        ]}
      >
        <Input
          value={userInfo?.loginPwd}
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        ></Input>
      </Form.Item>

      <Form.Item label={intl.formatMessage({ id: 'user.form.nickname' })} name="nickname">
        <Input
          value={userInfo?.nickname}
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        ></Input>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'user.form.mail' })} name="mail">
        <Input
          value={userInfo?.mail}
          onChange={(e) => updateInfo(e.target.value, 'mail')}
        ></Input>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'user.form.qq' })} name="qq">
        <Input
          value={userInfo?.qq}
          onChange={(e) => updateInfo(e.target.value, 'qq')}
        ></Input>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'user.form.wechat' })} name="wechat">
        <Input
          value={userInfo?.wechat}
          onChange={(e) => updateInfo(e.target.value, 'wechat')}
        ></Input>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'user.form.avatar' })} value="avatar">
        <Upload
          listType="picture-card"
          maxCount={1}
          onChange={(e) => {
            changeAvatar(e.fileList[0]);
          }}
          onPreview={handlePreview}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: '8px' }}>
              {intl.formatMessage({ id: 'user.form.avatar' })}
            </div>
          </div>
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === 'edit'
            ? intl.formatMessage({ id: 'user.form.submitEdit' })
            : intl.formatMessage({ id: 'user.form.submitAdd' })}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UserForm;
