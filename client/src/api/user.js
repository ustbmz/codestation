import request from './request'

export function getCaptcha() {
  return request({
    url: '/captcha',
    method: 'GET',
  })
}

export function userIsExist(id) {
  console.log('🐤 ≂ id:', id)
  return request({
    url: `/user/userIsExist/${id}`,
    method: 'GET',
  })
}
export function getUserById(id) {
  return request({
    url: `/user/${id}`,
    method: 'GET',
  })
}

export function addUser(userInfo) {
  userInfo.avatar = '/static/default.png'
  console.log('🐤 ≂ userInfo:', userInfo);
  return request({
    url: `/user/addUser/`,
    method: 'POST',
    data: userInfo,
  })
}

export function userLogin(userInfo) {
  console.log('🐤 ≂ userInfo:', userInfo)
  return request({
    url: `/user/login/`,
    method: 'POST',
    data: userInfo,
  })
}

export function getInfoWithToken() {
  return request({
    url: `/user/whoami/`,
    method: 'GET',
  })
}

