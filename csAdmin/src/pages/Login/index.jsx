import { getCaptcha, login } from '@/services/AdminController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { useNavigate, useIntl } from '@umijs/max';
import ReactCanvasNest from 'react-canvas-nest';

function Login(props) {
  const intl = useIntl();
  const [loginInfo, setLoginInfo] = useState({
    loginId: '',
    loginPwd: '',
    captcha: '',
    remember: true,
  });

  const navigate = useNavigate();

  const [captcha, setCaptcha] = useState('');
  function onFinish() {
    console.log('submit');
    console.log('🦊 > file: index.jsx:20 > login > loginInfo:', loginInfo);

    login(loginInfo).then((res) => {
      console.log(' > onFinish > res:', res);
      if (res.code === 0) {
        localStorage.setItem('adminToken', res.token);
        navigate('/');
      } else {
        message.error(res.msg);
        captchaClickHandle();
      }
    });
  }
  const updateInfo = (value, key) => {
    console.log(' > updateInfo > value:', value, key);
    setLoginInfo({ ...loginInfo, [key]: value });
  };

  useEffect(() => {
    captchaClickHandle();
  }, []);

  async function captchaClickHandle() {
    const result = await getCaptcha();
    setCaptcha(result);
  }
  return (
    <div>
      <ReactCanvasNest
        className="canvasNest"
        config={{ pointColor: ' 255, 255, 255 ' }}
        style={{ zIndex: 66 }}
      />
      <div className={styles.container}>
        <h1>{intl.formatMessage({ id: 'login.title' })}</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={loginInfo}
          onFinish={onFinish}
        >
          <Form.Item
            name="loginId"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'login.ruleAccount' }),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              placeholder={intl.formatMessage({ id: 'login.placeholderAccount' })}
              value={loginInfo.loginId}
              onChange={(e) => {
                updateInfo(e.target.value, 'loginId');
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            name="loginPwd"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'login.rulePassword' }),
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={intl.formatMessage({ id: 'login.placeholderPassword' })}
              value={loginInfo.loginPwd}
              onChange={(e) => {
                updateInfo(e.target.value, 'loginPwd');
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'login.ruleCaptcha' }),
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder={intl.formatMessage({ id: 'login.placeholderCaptcha' })}
                  value={loginInfo.captcha}
                  onChange={(e) => updateInfo(e.target.value, 'captcha')}
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={(e) => updateInfo(e.target.checked, 'remember')}>
              {intl.formatMessage({ id: 'login.remember' })}
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginBtn}
            >
              {intl.formatMessage({ id: 'login.submit' })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
