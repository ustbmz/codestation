import { request } from '@umijs/max';

export async function getInterViewList(data) {
  return request('/api/interview/geInterViewTitleByPage', {
    method: 'POST',
    data
  });
}

export async function getInterViewByID(id) {
  return request(`/api/interview/${id}`, {
    method: 'GET'
  });
}

export async function delInterView(id) {
  return request(`/api/interview/delInterview/${id}`, {
    method: 'GET',
  });
}

export async function addInterView(data) {
  return request('/api/interview/addInterview', {
    method: 'POST',
    data,
  });
}

export async function editInterView(data) {
  return request('/api/interview/editInterView', {
    method: 'POST',
    data,
  });
}

