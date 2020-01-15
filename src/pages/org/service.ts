import request from '@/utils/request';

export async function getOrgTree() {
  return request('/api/permit/org');
}

export async function getUserByOrgId(orgId: string) {
  return request(`/api/permit/user?orgId=${orgId}`);
}

export async function getApps() {
  return request('/api/permit/app');
}
