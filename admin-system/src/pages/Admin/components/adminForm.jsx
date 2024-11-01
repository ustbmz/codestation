import { checkAdminIsExist } from '@/services/AdminController';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Radio, Upload } from 'antd';
import { useRef, useState } from 'react';

function AdminForm ({ type, adminInfo, setAdminInfo, submitHandle }) {
  const adminRef = useRef()
  if (adminRef.current) {
    adminRef.current.setFieldsValue(adminInfo)
  }

  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  /**
   * 更新表单状态
   * @param {*} value
   * @param {*} key
   */
  function updateInfo(value, key) {
    const newAdminInfo = { ...adminInfo };
    newAdminInfo[key] = value;
    setAdminInfo(newAdminInfo);
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
    console.log('🦊 > file: adminForm.jsx:34 > changeAvatar > base64:', base64);
    updateInfo(base64, 'avatar');
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function checkLoginID () {
    if (type === 'edit') {
      return true
    }
    console.log('🦊 > file: adminForm.jsx:48 > checkLoginID > checkLoginID:');
    const { data } = await checkAdminIsExist(adminInfo.loginId);
    console.log('🦊 > file: adminForm.jsx:44 > checkLoginID > data:', data);
    if (data) {
      return Promise.reject('账号已存在，请确认后重新输入');
    }
  }
  return (
    <Form
      initialValues={adminInfo}
      autoComplete="off"
      onFinish={submitHandle}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      {/* 账号 */}
      <Form.Item
        label="管理员账号"
        name="loginId"
        rules={[
          { required: true, message: '请输入管理员账号' },
          { validateTrigger: 'onBlur', validator: checkLoginID },
        ]}
      >
        <Input
          value={adminInfo?.loginId}
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          disabled={type === 'edit' ? true : false}
        ></Input>
      </Form.Item>
      {/* 密码 */}
      <Form.Item
        label="管理员密码"
        name="loginPwd"
        rules={[
          type === 'edit'
            ? { required: true, message: '请输入管理员密码' }
            : null,
        ]}
      >
        <Input
          value={adminInfo?.loginPwd}
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        ></Input>
      </Form.Item>
      {/* 昵称 */}

      <Form.Item label="管理员昵称" name="nickname">
        <Input
          value={adminInfo?.nickname}
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        ></Input>
      </Form.Item>
      {/* 选择权限 */}
      <Form.Item label="权限选择" name="permission">
        <Radio.Group
          value={adminInfo?.permission}
          rules={[{ required: true, message: '请选择权限' }]}
          onChange={(e) => updateInfo(e.target.value, 'permission')}
        >
          <Radio value={1}>超级管理员</Radio>
          <Radio value={2}>普通管理员</Radio>
        </Radio.Group>
      </Form.Item>
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
          {type==='edit'?'确认修改':'新增管理员'}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AdminForm;
