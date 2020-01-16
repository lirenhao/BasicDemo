import request from '@/utils/request';
import { AppData } from './data';

export async function getApps() {
  return request('/api/permit/app');
}

export async function getSvcs() {
  return request('/api/permit/svc');
}

export async function existAppId(appId: string) {
  return request(`/api/permit/app/${encodeURIComponent(appId)}/exist`);
}

export async function createAndUpdataApp(app: AppData) {
  return request('/api/permit/app', {
    method: 'PUT',
    data: app,
  });
}

export async function deleteApp(appId: string) {
  return request(`/api/permit/app/${encodeURIComponent(appId)}`, {
    method: 'DELETE',
  });
}
