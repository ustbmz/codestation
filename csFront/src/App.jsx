import { Layout } from 'antd'
import { useState, useEffect } from 'react'
import NavHeader from './components/NavHeader'
import PageFooter from './components/PageFooter'
import './css/App.css'

import RouteBefore from './router/RouteBefore.jsx'
import LoginForm from './components/LoginForm'
import { getInfoWithToken, getUserById } from './api/user'
import { useDispatch } from 'react-redux'
import { initUserInfo, changeLoginStatus } from './redux/userSlice.js'

const { Header, Footer, Content } = Layout

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  function closeModal() {
    setIsModalOpen(false)
  }
  function loginHandle() {
    setIsModalOpen(true)
  }

  useEffect(() => {
    async function getInfo() {
      const { data } = await getInfoWithToken()
      if (data?._id) {
        const res = await getUserById(data._id)
        dispatch(initUserInfo(res.data))
        dispatch(changeLoginStatus(true))
      }
    }
    getInfo()
  }, [])

  return (
    <div className="App">
      {/* 头部 */}
      <Header className="header">
        <NavHeader loginHandle={loginHandle} />
      </Header>
      {/* 匹配上的路由页面 */}
      <Content className="content">
        <RouteBefore />
      </Content>
      {/* 底部 */}
      <Footer className="footer">
        <PageFooter />
      </Footer>
      {/* 登录弹窗 */}
      <LoginForm isShow={isModalOpen} closeModal={closeModal} />
    </div>
  )
}

export default App
