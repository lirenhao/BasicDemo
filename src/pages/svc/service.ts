import request from '@/utils/request';

export async function getAllIds() {
  return request('/api/permit/svc');
}

export async function getInfo(id: string) {
  return request(`/api/permit/svc/${encodeURIComponent(id)}`);
}
