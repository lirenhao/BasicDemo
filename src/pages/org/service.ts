import request from '@/utils/request';
import { OrgData, UserData } from './data';

export async function getOrgTree(idPrefix: string = '') {
  return request(`/api/permit/org?id_prefix=${encodeURIComponent(idPrefix)}`);
}

export async function getUserByOrgId(orgId: string) {
  return request(`/api/permit/user?org_id=${encodeURIComponent(orgId)}`);
}

export async function getApps() {
  return request('/api/permit/app');
}

export async function existOrgId(orgId: string) {
  return request(`/api/permit/org/${encodeURIComponent(orgId)}/exist`);
}

export async function existUserId(userId: string) {
  return request(`/api/permit/user/${encodeURIComponent(userId)}/exist`);
}

export async function createAndUpdataOrg(org: OrgData) {
  return request('/api/permit/org', {
    method: 'PUT',
    data: org,
  });
}

export async function deleteOrg(orgId: string) {
  return request(`/api/permit/org/${encodeURIComponent(orgId)}`, {
    method: 'DELETE',
  });
}

export async function createAndUpdataUser(user: UserData) {
  return request('/api/permit/user', {
    method: 'PUT',
    data: user,
  });
}

export async function deleteUser(userId: string) {
  return request(`/api/permit/user/${encodeURIComponent(userId)}`, {
    method: 'DELETE',
  });
}
