import {
  Modal,
  Radio,
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  message,
} from 'antd'
import { useState, useRef, useEffect } from 'react'
import {
  getCaptcha,
  userIsExist,
  addUser,
  userLogin,
} from '../api/user'

import { initUserInfo, changeLoginStatus } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
import md5 from 'md5'
import styles from '../css/LoginForm.module.css'

function LoginForm(props) {
  const [value, setValue] = useState(1)
  const loginFormRef = useRef()
  const registerFormRef = useRef()
  const dispatch = useDispatch()

  // 登录表单的状态数据
  const [loginInfo, setLoginInfo] = useState({
    loginId: '',
    loginPwd: '',
    captcha: '',
    remember: false,
  })
  // 注册表单的状态数据
  const [registerInfo, setRegisterInfo] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    captcha: '',
  })

  const [captcha, setCaptcha] = useState(null)

  useEffect(() => {
    captchaClickHandle()
  }, [props.isShow])

  function handleOk() {}

  function onChange(e) {
    // 修改 value 的值，达到单选框能够切换
    setValue(e.target.value)
    captchaClickHandle()
  }

  async function loginHandle() {
    const result = await userLogin(loginInfo)
    console.log('🐤 ≂ result:', result)
    if (result.data) {
      // 验证码是正确的
      // 接下来会有这么几种情况 （1）密码不正确 （2）账户被冻结 （3）账户正常，能够正常登录
      const data = result.data

      if (result.code === 0) {
        message.success(result.msg)
        // 说明账号密码正确，能够登录
        // 存储 token
        localStorage.userToken = result.token
        // 将用户的信息存储到状态仓库，方便后面使用
        dispatch(initUserInfo(data))
        dispatch(changeLoginStatus(true))
        handleCancel()
      }
    } else {
      message.warning(result.msg)
      captchaClickHandle()
    }
  }

  function handleCancel() {
    // 清空上一次的内容
    setRegisterInfo({
      loginId: '',
      nickname: '',
      captcha: '',
    })
    setLoginInfo({
      loginId: '',
      loginPwd: '',
      captcha: '',
      remember: false,
    })
    props.closeModal()
  }

  async function registerHandle() {
    registerInfo.loginPwd = md5('admin123')
    const result = await addUser(registerInfo)
    if (result.data) {
      message.success('用户注册成功，默认密码为 123456')
      // 还需要将用户的信息存储到数据仓库里面
      dispatch(initUserInfo(result.data))
      // 将数据仓库的登录状态进行修改
      dispatch(changeLoginStatus(true))
      // 关闭登录注册的弹出框
      handleCancel()
    } else {
      message.warning(result.msg)
      captchaClickHandle()
    }
  }

  /**
   * @param {*} oldInfo 之前整体的状态
   * @param {*} newContent 用户输入的新的内容
   * @param {*} key 对应的键名
   * @param {*} setInfo 修改状态值的函数
   */
  function updateInfo(oldInfo, newContent, key, fn) {
    const obj = { ...oldInfo }
    obj[key] = newContent
    fn(obj)
  }

  async function captchaClickHandle() {
    const result = await getCaptcha()
    setCaptcha(result)
  }

  /**
   * 验证登录账号是否存在
   */
  async function checkLoginIdIsExist() {
    if (registerInfo.loginId) {
      const { data } = await userIsExist(registerInfo.loginId)
      if (data) {
        // 该 loginId 已经注册过了
        return Promise.reject('该用户已经注册过了')
      }
    }
  }

  let container = null
  const formLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
  const buttonItemLayout = { wrapperCol: { span: 14, offset: 6 } }
  if (value === 1) {
    // 登录面板的 JSX
    container = (
      <div className={styles.container}>
        <Form
          name="basic1"
          autoComplete="off"
          onFinish={loginHandle}
          ref={loginFormRef}
          {...formLayout}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input
              placeholder="请输入你的登录账号"
              value={loginInfo.loginId}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)
              }
            />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password
              placeholder="请输入你的登录密码，新用户默认为123456"
              value={loginInfo.loginPwd}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)
              }
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="logincaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      loginInfo,
                      e.target.value,
                      'captcha',
                      setLoginInfo
                    )
                  }
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

          <Form.Item
            name="remember"
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Checkbox
              onChange={(e) =>
                updateInfo(
                  loginInfo,
                  e.target.checked,
                  'remember',
                  setLoginInfo
                )
              }
              checked={loginInfo.remember}
            >
              记住我
            </Checkbox>
          </Form.Item>

          <Form.Item {...buttonItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              登录
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  } else {
    // 注册面板的 JSX
    container = (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={registerHandle}
          {...formLayout}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: '请输入账号，仅此项为必填项',
              },
              // 验证用户是否已经存在
              { validator: checkLoginIdIsExist },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  'loginId',
                  setRegisterInfo
                )
              }
            />
          </Form.Item>

          <Form.Item label="用户昵称" name="nickname">
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickname}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  'nickname',
                  setRegisterInfo
                )
              }
            />
          </Form.Item>

          <Form.Item
            name="registercaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      registerInfo,
                      e.target.value,
                      'captcha',
                      setRegisterInfo
                    )
                  }
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

          <Form.Item {...buttonItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  return (
    <div>
      <Modal
        title="登录"
        open={props.isShow}
        onOk={handleOk}
        onCancel={props.closeModal}
        footer={null}
      >
        <Radio.Group
          value={value}
          onChange={onChange}
          className={styles.radioGroup}
          buttonStyle="solid"
        >
          <Radio.Button value={1} className={styles.radioButton}>
            登录
          </Radio.Button>
          <Radio.Button value={2} className={styles.radioButton}>
            注册
          </Radio.Button>
        </Radio.Group>
        {/* 下面需要显示对应功能的表单 */}
        {container}
      </Modal>
    </div>
  )
}

export default LoginForm
