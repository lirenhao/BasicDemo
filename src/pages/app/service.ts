import request from '@/utils/request';

export async function getAllIds() {
  return request('/api/permit/app');
}

export async function getInfo(id: string) {
  return request(`/api/permit/app/${encodeURIComponent(id)}`);
}

export async function getRoleIds(id: string) {
  return request(`/api/permit/role/${encodeURIComponent(id)}`);
}

export async function getRoleInfo(appId: string, roleId: string) {
  return request(`/api/permit/role/${encodeURIComponent(appId)}/${encodeURIComponent(roleId)}`);
}

export async function getSvcIds() {
  return request('/api/permit/svc');
}

export async function getSvcInfo(id: string) {
  return request(`/api/permit/svc/${encodeURIComponent(id)}`);
}
