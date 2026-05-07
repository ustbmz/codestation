import React from 'react'
import { Button, List, Popover, Avatar, Image } from 'antd'
import { useSelector } from 'react-redux'
import { clearUserInfo, changeLoginStatus } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from '../css/LoginAvatar.module.css'
import { UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

function LoginAvatar(props) {
  const { t } = useTranslation()
  const { isLogin, userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const menuItems = [
    { key: 'profile', label: t('avatar.profile') },
    { key: 'logout', label: t('avatar.logout') },
  ]

  function listClickHandle(key) {
    if (key === 'profile') {
      navigate('/personal')
    } else {
      localStorage.removeItem('userToken')
      dispatch(clearUserInfo)
      dispatch(changeLoginStatus(false))
      navigate('/')
    }
  }

  let loginStatus = null
  if (isLogin) {
    const content = (
      <List
        dataSource={menuItems}
        size="large"
        renderItem={(item) => (
          <List.Item
            style={{ cursor: 'pointer' }}
            onClick={() => listClickHandle(item.key)}
          >
            {item.label}
          </List.Item>
        )}
      />
    )
    loginStatus = (
      <Popover content={content} trigger="hover" placement="bottom">
        <div className={styles.avatarContainer}>
          <Avatar
            src={<Image src={userInfo?.avatar} preview={false} />}
            size="large"
            icon={<UserOutlined />}
          />
        </div>
      </Popover>
    )
  } else {
    loginStatus = (
      <Button
        type="primary"
        size="large"
        style={{
          borderRadius: '4px',
        }}
        onClick={props.loginHandle}
      >
        {t('login.registerLogin')}
      </Button>
    )
  }

  return <div>{loginStatus}</div>
}

export default LoginAvatar
