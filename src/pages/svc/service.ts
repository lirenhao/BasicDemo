import request from '@/utils/request';

export async function getSvcs() {
  return request('/api/permit/svc');
}
