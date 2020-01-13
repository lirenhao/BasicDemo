import request from '@/utils/request';

export async function getAllIds() {
  return request('/api/permit/app');
}

export async function getInfo(id: string) {
  return request(`/api/permit/app/${encodeURIComponent(id)}`);
}

export async function getSvcIds() {
  return request('/api/permit/svc');
}

export async function getSvcInfo(id: string) {
  return request(`/api/permit/svc/${encodeURIComponent(id)}`);
}
