import request from '@/utils/request';

export async function getApps() {
  return request('/api/permit/app');
}

export async function getSvcs() {
  return request('/api/permit/svc');
}
