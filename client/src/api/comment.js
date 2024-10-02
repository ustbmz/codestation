import request from './request'

/**
 * 获取问答对应评论
 *
 * @param   {[type]}  id
 *
 * @return  {[type]}  reutrn arr list
 */
export function getIssueComment(id) {
  console.log('🐤 ≂ id:', id);
  return request({
    url: `/comment/issueComment/${id}`,
    method: 'GET',
  })
}

export function addComment(params) {
  return request({
    url: '/comment/addComment',
    method: 'POST',
    data: params,
  })
}

export function deleteComment(params) {
  return request({
    url: '/comment/deleteComment',
    method: 'POST',
    data: params,
  })
}

