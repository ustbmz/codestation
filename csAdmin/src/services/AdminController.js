import { request } from '@umijs/max';

export async function getAdminList() {
  return request('/api/admin', {
    method: 'GET',
  });
}

export async function delAdmin(id) {
  return request(`/api/admin/delAdmin/${id}`, {
    method: 'POST',
  });
}

export async function addAdmin(data) {
  return request('/api/admin/addAdmin', {
    method: 'POST',
    data,
  });
}

export async function editAdmin(data) {
  return request('/api/admin/editAdmin', {
    method: 'POST',
    data,
  });
}

export async function checkAdminIsExist(loginId) {
  return request(`/api/admin/adminIsExist/${loginId}`, {
    method: 'GET',
  });
}

export async function getCaptcha() {
  return request('/api/captcha', {
    method: 'GET',
  });
}

export async function login(data) {
  return request('/api/admin/login', {
    method: 'POST',
    data,
  });
}

export async function getInfo() {
  return request('/api/admin/whoami', {
    method: 'GET',
  });
}

export async function getAdminById(id) {
  return request(`/api/admin/${id}`, {
    method: 'GET',
  });
}