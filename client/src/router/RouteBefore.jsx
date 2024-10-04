import { message } from 'antd'
import RouteConfig from './index.jsx'
import RouteBeforeConfig from './RouteBeforeConfig.js'
import { useLocation } from 'react-router-dom'
function RouteBefore() {
  const location = useLocation()

  console.log(location.pathname, 'RouteBefore')
  const currentPath = RouteBeforeConfig.filter(
    (item) => item.path === location.pathname
  )[0]
  console.log('🐤 ≂ currentPath:', currentPath)

  if (currentPath) {
    if (currentPath.needLogin && !localStorage.getItem('userToken')) {
      message.error('请先登录')
      // location.pathname = '/'
    }
  }
  // const currentPath = RouteBeforeConfig.filter(
  //   (item) => item.path === location.pathname
  // )[0]
  // console.log('🐤 ≂ currentPath:', currentPath)
  // if (currentPath.needLogin) {
  //   const isLogin = localStorage.getItem('userToken')
  //   console.log('🐤 ≂ isLogin:', isLogin)
  //   if (!isLogin) {
  //     navigate('/')
  //   }
  // }
  return <RouteConfig />
}

export default RouteBefore
