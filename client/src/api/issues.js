import request from './request'
export function getIssues(params) {
  return request({
    url: `/issue/getIssue`,
    method: 'GET',
    params: params,
  })
}

export function addIssue(params) {
  return request({
    url: `/issue/addIssue`,
    method: 'POST',
    data: params,
  })
}