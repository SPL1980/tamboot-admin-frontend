import request from '@/utils/request';

export async function list() {
  return request('/system/role/list');
}

export async function page(body) {
  return request('/system/role/page', { body });
}

export async function assignMenus(body) {
  return request('/system/role/assignMenus', { method: 'POST', body });
}

export async function create(body) {
  return request('/system/role/create', { method: 'POST', body });
}

export async function update(body) {
  return request('/system/role/update', { method: 'POST', body });
}

export async function del(roleId) {
  return request(`/system/role/delete/${roleId}`, { method: 'POST' });
}
