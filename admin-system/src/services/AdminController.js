import { request } from '@umijs/max';

export async function getAdminList() {
  return request('/api/admin', {
    method: 'GET',
  });
}

