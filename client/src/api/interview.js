import request from './request'

export function getInterviewTitle() {
  return request({
    url: '/interview/geInterViewTitle',
    method: 'GET',
  })
}


export function getInterviewById(id) {
  return request({
    url: `/interview/getInterview/${id}`,
    method: 'GET',
  })
}