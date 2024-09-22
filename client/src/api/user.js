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

export function userLogin(userId) {
  return request({
    url: `/user/userIsExist/${userId}`,
    method: 'GET',
  })
}

export function getUserById(userId) {
  return request({
    url: `/user/userIsExist/${userId}`,
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
