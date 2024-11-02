import { request } from '@umijs/max';
export async function getTypes() {
  return request('/api/type/getTypes', {
    method: 'GET',
  });
}
