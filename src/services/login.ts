import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/admin/login', {
    method: 'POST',
    data: params,
  });
}

export async function fakeAccountLogout() {
  return request('/api/admin/logout', {
    method: 'POST',
  });
}
