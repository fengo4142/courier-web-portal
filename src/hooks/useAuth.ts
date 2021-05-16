import { AuthState } from '../interfaces';
import { useStores } from '../store';
import {
  logIn,
  logOut,
  sendVerificationCode,
  confirmVerificationCode,
  sendRequestForResetPassword,
  setTokenApi,
  resetPassword,
  resendVerificationCode
} from '../store/actions/auth';
import { months } from '../constants';

export default function useAuth() {
  const { authStore } = useStores();
  return {
    ...authStore.getState(),
    setAuthUser: (userInfo: any) => {
      userInfo.name &&
        authStore.set('fullName')(`${userInfo.name}${userInfo.family_name ? ` ${userInfo.family_name}` : ''}`);
      userInfo.insurance && authStore.set('insurance')(userInfo.insurance);
      userInfo.license && authStore.set('license')(userInfo.license);
      userInfo.sub && authStore.set('sub')(userInfo.sub);
      userInfo.picture && authStore.set('picture')(userInfo.picture);
      userInfo.phone_number && authStore.set('phone_number')(userInfo.phone_number);
      userInfo.email && authStore.set('email')(userInfo.email);
      userInfo.address && authStore.set('address')(userInfo.address);
      userInfo.latitude && authStore.set('latitude')(userInfo.latitude);
      userInfo.longitude && authStore.set('longitude')(userInfo.longitude);
      if (userInfo.birthdate) {
        const [month, day, year] = userInfo.birthdate.split('/');
        authStore.set('month')(months[+month - 1].value);
        authStore.set('day')(day);
        authStore.set('year')(year);
      }
      userInfo.make && authStore.set('make')(userInfo.make);
      userInfo.carModel && authStore.set('carModel')(userInfo.carModel);
      userInfo.carYear && authStore.set('carYear')(userInfo.carYear);
      userInfo.photosCar && authStore.set('photosCar')(userInfo.photosCar);
      userInfo.tShirt && authStore.set('tShirt')(userInfo.tShirt);
      userInfo.isWorked && authStore.set('isWorked')(userInfo.isWorked);
      userInfo.hellosign && authStore.set('hellosign')({ ...authStore.get('hellosign'), ...userInfo.hellosign });
    },
    isAuth: Boolean(authStore.get('token')),
    logIn: (user: Partial<AuthState>) => logIn(user),
    logOut: () => logOut(),
    sendVerificationCode: (data: Partial<AuthState>) => sendVerificationCode(data),
    resendVerificationCode: (data: Partial<AuthState>) => resendVerificationCode(data),
    confirmVerificationCode: (data: Partial<AuthState>) => confirmVerificationCode(data),
    sendRequestForResetPassword: (email: string) => sendRequestForResetPassword(email),
    resetPassword: (data: Partial<AuthState>) => resetPassword(data),
    setToken: (token: string) => {
      setTokenApi(token);
      authStore.set('token')(token);
    }
  };
}
