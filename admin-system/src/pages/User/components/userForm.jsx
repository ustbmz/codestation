import { checkUserIsExist } from '@/services/UserController';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';

function UserForm({ type, userInfo, setUserInfo, submitHandle }) {
  const formRef = useRef();
  if (formRef.current) {
    formRef.current.setFieldsValue(userInfo);
  }
  // useEffect(() => {
  // }, [userInfo]);

  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  /**
   * 更新表单状态
   * @param {*} value
   * @param {*} key
   */
  function updateInfo(value, key) {
    console.log('🦊 > file: userForm.jsx:20 > updateInfo > key:', key);
    console.log('🦊 > file: userForm.jsx:20 > updateInfo > value:', value);
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
    console.log('file', file);
    const base64 = await getBase64(file.originFileObj);
    console.log('🦊 > file: userForm.jsx:34 > changeAvatar > base64:', base64);
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
    console.log('🦊 > file: userForm.jsx:48 > checkLoginID > checkLoginID:');
    const { data } = await checkUserIsExist(userInfo.loginId);
    console.log('🦊 > file: userForm.jsx:44 > checkLoginID > data:', data);
    if (data) {
      return Promise.reject('账号已存在，请确认后重新输入');
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
      {/* 账号 */}
      <Form.Item
        label="用户账号"
        name="loginId"
        rules={[
          { required: true, message: '请输入用户账号' },
          { validateTrigger: 'onBlur', validator: checkLoginID },
        ]}
      >
        <Input
          value={userInfo?.loginId}
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          disabled={type === 'edit' ? true : false}
        ></Input>
      </Form.Item>
      {/* 密码 */}
      <Form.Item
        label="用户密码"
        name="loginPwd"
        rules={[
          type === 'edit'
            ? { required: true, message: '请输入用户密码' }
            : null,
        ]}
      >
        <Input
          value={userInfo?.loginPwd}
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        ></Input>
      </Form.Item>
      {/* 昵称 */}

      <Form.Item label="用户昵称" name="nickname">
        <Input
          value={userInfo?.nickname}
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        ></Input>
      </Form.Item>
      <Form.Item label="用户邮箱" name="mail">
        <Input
          value={userInfo?.mail}
          onChange={(e) => updateInfo(e.target.value, 'mail')}
        ></Input>
      </Form.Item>
      <Form.Item label="QQ" name="qq">
        <Input
          value={userInfo?.qq}
          onChange={(e) => updateInfo(e.target.value, 'qq')}
        ></Input>
      </Form.Item>
      <Form.Item label="微信" name="wechat">
        <Input
          value={userInfo?.wechat}
          onChange={(e) => updateInfo(e.target.value, 'wechat')}
        ></Input>
      </Form.Item>
      {/* 选择权限 */}
      <Form.Item label="上传头像" value="avatar">
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
            <div style={{ marginTop: '8px' }}>上传头像</div>
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
          {type === 'edit' ? '确认修改' : '新增用户'}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UserForm;
