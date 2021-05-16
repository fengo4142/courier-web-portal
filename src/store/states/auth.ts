import { AuthState } from '../../interfaces';

export function initAuth(): AuthState {
  return {
    token: localStorage.getItem('token') || '',
    refresh: '',
    email: '',
    password: '',
    phone_number: '',
    code: '',
    step: '',
    fullName: '',
    month: '',
    year: '',
    day: '',
    address: '',
    longitude: '',
    latitude: '',
    license: { key: '', preview: '' },
    insurance: { key: '', preview: '' },
    sub: '',
    picture: { key: '', preview: '' },
    tShirt: '',
    make: '',
    isLoading: false,
    isWorked: false,
    carModel: '',
    carYear: '',
    hellosign: {
      agreement: '',
      fw9: ''
    },
    photosCar: {
      front: { key: '', preview: '' },
      back: { key: '', preview: '' },
      left: { key: '', preview: '' },
      right: { key: '', preview: '' }
    }
  };
}
