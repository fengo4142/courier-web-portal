import api from '../../api';
import { AuthState } from '../../interfaces';

export function setTokenApi(token: string) {
  api.setToken(token);
}

export async function logIn(data: Partial<AuthState>) {
  const response = await api.logIn(data);
  setTokenApi(response.AccessToken);
  localStorage.setItem('token', response.AccessToken);
  localStorage.setItem('id', response.IdToken);
  localStorage.setItem('refresh', response.RefreshToken);

  return response;
}

export async function logOut() {
  try {
    await api.logOut();
  } catch (e) {
    console.error(e && e.message);
  }
  setTokenApi('');
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('refresh');
}

export async function sendVerificationCode(data: Partial<AuthState>) {
  return api.sendVerificationCode(data);
}

export async function resendVerificationCode(data: Partial<AuthState>) {
  return api.resendVerificationCode(data);
}

export async function confirmVerificationCode(data: Partial<AuthState>) {
  return api.confirmVerificationCode(data);
}

export async function sendRequestForResetPassword(email: string) {
  return api.sendRequestForResetPassword(email);
}

export async function resetPassword(data: Partial<AuthState>) {
  return api.resetPassword(data);
}
