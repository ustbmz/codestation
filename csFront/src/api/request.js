import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
})


service.interceptors.request.use(
  (config) => {
    // 拦截到请求后，这里就可以做各种事情
    // 一般是添加 token
    // 从本地拿到 userToken
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
      config.headers['Cache-Control'] = 'no-cache'
      
    }

    // 请求放行
    return config
  },
  (err) => {
    // 发生错误时的回调
    console.log('请求拦截出错，错误信息：', err)
  }
)

service.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default service