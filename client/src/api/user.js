
import request from './request'


export function getCaptcha(){
    return request({
        url: '/captcha',
        method: 'GET'
  })
}

export function userIsExist() {
  return request({
    url: '/api/user/userIsExist',
    method: 'GET',
  })
}

export function userLogin() {
  return request({
    url: '/api/user/userIsExist',
    method: 'GET',
  })
}

export function getUserById() {
  return request({
    url: '/api/user/userIsExist',
    method: 'GET',
  })
}

export function addUser() {
  return request({
    url: '/api/user/userIsExist',
    method: 'GET',
  })
}