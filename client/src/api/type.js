import request from './request'


export function getTypes() {
  return request({
    url: '/type/getTypes',
    method: 'GET',
  })
}