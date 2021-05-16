import { HttpInterface } from './httpAdapter';
import { AuthState, ChangePassword, DeliveryPagination } from '../interfaces';
import { AxiosRequestConfig } from 'axios';
import ApiError from './apiError';
import { EventEmitter } from 'events';
import { fromEvent, Observable } from 'rxjs';

type ApiClientEvents = 'unauthorized' | string;

export default class ApiClient {
  private _eventEmitter = new EventEmitter();

  constructor(protected http: HttpInterface) {
    http.initErrorResponseInterceptor(async (error) => {
      const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
      if (error.response!.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: await this.refreshTokens()
          };
          return http.repeatRequest(originalRequest);
        } catch (e) {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('refresh');

          this._eventEmitter.emit('unauthorized');
        }
      } else {
        throw new ApiError(error, originalRequest.url!);
      }
    });
  }

  public on(event: ApiClientEvents): Observable<any> {
    return fromEvent<any>(this._eventEmitter, event);
  }

  public setToken(token: string) {
    this.http.setAuthorizationToken(token);
  }

  public async refreshTokens(): Promise<string> {
    const data = {
      refreshToken: localStorage.getItem('refresh'),
      idToken: localStorage.getItem('id')
    };

    const res = await this.http.post('/profile-guest/refresh', data);

    this.setToken(res.AccessToken);

    localStorage.setItem('token', res.AccessToken);
    localStorage.setItem('id', res.IdToken);

    if (res.RefreshToken) {
      localStorage.setItem('refresh', res.RefreshToken);
    }

    return res.AccessToken;
  }

  public getHealthCheck() {
    return this.http.get('/profile-guest/health-check');
  }

  // Not Login
  public logIn(data: Partial<AuthState>) {
    return this.http.post('/profile-guest/sign-in', data);
  }

  public logOut() {
    return this.http.post('/profile-auth/sign-out');
  }

  public sendVerificationCode(data: Partial<AuthState>) {
    return this.http.post('/profile-guest/sign-up', data);
  }

  public resendVerificationCode(data: Partial<AuthState>) {
    return this.http.post('/profile-guest/sign-up/resend-code', data);
  }

  public confirmVerificationCode(data: Partial<AuthState>) {
    return this.http.post('/profile-guest/sign-up/confirm', data);
  }

  public sendRequestForResetPassword(email: string) {
    return this.http.post('profile-guest/forgot-password', { email });
  }

  public resetPassword(data: Partial<AuthState>) {
    return this.http.post('/profile-guest/reset-password', data);
  }

  // login
  public getUser() {
    return this.http.get('/profile-auth');
  }

  public getUserImages() {
    return this.http.get('/profile-auth/images');
  }

  public getHelloSign(templateName: string) {
    return this.http.get(`/hellosign/getSignURL/${templateName}`);
  }

  public setRequestIsSigned(id: string) {
    return this.http.put(`/hellosign/setIsSigned/${id}`);
  }

  public getHelloSignSignature(id: string) {
    return this.http.get(`/hellosign/getSignatureRequest/${id}`);
  }

  public checkCandidate() {
    return this.http.get(`/checkr/candidate`);
  }

  public checkCreateCandidate() {
    return this.http.post(`/checkr/candidate`);
  }

  public completeProfile(options: any) {
    return this.http.put('/profile-auth/sign-up/complete-profile', options);
  }

  public completeProfileFirstStep(options: any) {
    return this.http.put('/profile-auth/sign-up/complete-profile/first-step', options);
  }

  public completeProfileSecondStep(options: any) {
    return this.http.put('/profile-auth/sign-up/complete-profile/second-step', options);
  }

  public updateProfilePicture(url: string) {
    return this.http.put('/profile-auth/sign-up/set-picture', { picture: url });
  }

  public updateProfile(options: any) {
    return this.http.put('/profile-auth/profile', options);
  }

  public changePassword(data: ChangePassword) {
    return this.http.put('/profile-auth/profile/reset-password', data);
  }

  public uploadImage(userId: string, imageOptions: any, size: any) {
    const data = new FormData();
    data.append('key', userId);
    data.append('image', imageOptions);
    data.append('size', JSON.stringify(size));

    return this.http.post('/courier/image', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  public getImageLink(key: string, fileName: string) {
    return this.http.get(`/image/${key}/${fileName}`);
  }

  // delivery history
  public getDeliveries(data: DeliveryPagination) {
    const { sub, perPage, page = 0, search, sortField, order } = data;
    let query = '';

    if (sortField) {
      query += '&sortField=' + sortField + '&order=' + order;
    }

    if (search) {
      query += '&search=' + encodeURIComponent(search);
    }

    return this.http.get(`/deliveries/courier?sub=${sub}&perPage=${perPage}&page=${page}${query}`);
  }

  public getDeliveryOverview(data: DeliveryPagination) {
    const { sub, period } = data;
    let query = '';

    if (period) {
      query += '&period=' + period;
    }

    if (sub) {
      query += '&sub=' + sub;
    }

    return this.http.get(`/transactions/courier?sub=${sub}${query}`);
  }
}
