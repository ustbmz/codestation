import { request } from '@umijs/max';

export async function getUserList(data) {
  return request('/api/user', {
    method: 'POST',
    data
  });
}

export async function getUserByID(id) {
  return request(`/api/user/${id}`, {
    method: 'GET'
  });
}

export async function delUser(id) {
  return request(`/api/user/delUser/${id}`, {
    method: 'GET',
  });
}

export async function addUser(data) {
  return request('/api/user/addUser', {
    method: 'POST',
    data,
  });
}

export async function editUser(data) {
  return request('/api/user/editUser', {
    method: 'POST',
    data,
  });
}

export async function checkUserIsExist(loginId) {
  return request(`/api/user/userIsExist/${loginId}`, {
    method: 'GET',
  });
}
