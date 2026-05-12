import { checkAdminIsExist } from '@/services/AdminController';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Radio, Upload } from 'antd';
import { useRef, useState } from 'react';
import { useIntl } from '@umijs/max';

function AdminForm({ type, adminInfo, setAdminInfo, submitHandle }) {
  const intl = useIntl();
  const adminRef = useRef();
  if (adminRef.current) {
    adminRef.current.setFieldsValue(adminInfo);
  }

  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  function updateInfo(value, key) {
    console.log('🦊 > file: adminForm.jsx:20 > updateInfo > key:', key);
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
    const { data } = await checkAdminIsExist(adminInfo.loginId);
    if (data) {
      return Promise.reject(
        intl.formatMessage({ id: 'admin.form.loginIdExists' }),
      );
    }
  }
  return (
    <Form
      initialValues={adminInfo}
      autoComplete="off"
      actionRef="adminRef"
      onFinish={submitHandle}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label={intl.formatMessage({ id: 'admin.form.loginId' })}
        name="loginId"
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'admin.form.ruleLoginId' }),
          },
          { validateTrigger: 'onBlur', validator: checkLoginID },
        ]}
      >
        <Input
          value={adminInfo?.loginId}
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          disabled={type === 'edit' ? true : false}
        ></Input>
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ id: 'admin.form.loginPwd' })}
        name="loginPwd"
        rules={[
          type === 'edit'
            ? {
                required: true,
                message: intl.formatMessage({ id: 'admin.form.ruleLoginPwd' }),
              }
            : null,
        ]}
      >
        <Input
          value={adminInfo?.loginPwd}
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        ></Input>
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ id: 'admin.form.nickname' })}
        name="nickname"
      >
        <Input
          value={adminInfo?.nickname}
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        ></Input>
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ id: 'admin.form.permission' })}
        name="permission"
      >
        <Radio.Group
          value={adminInfo?.permission}
          onChange={(e) => updateInfo(e.target.value, 'permission')}
        >
          <Radio value={1}>{intl.formatMessage({ id: 'admin.role.super' })}</Radio>
          <Radio value={2}>{intl.formatMessage({ id: 'admin.role.normal' })}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'admin.form.avatar' })} value="avatar">
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
              {intl.formatMessage({ id: 'admin.form.avatar' })}
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
            ? intl.formatMessage({ id: 'admin.form.submitEdit' })
            : intl.formatMessage({ id: 'admin.form.submitAdd' })}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AdminForm;
