import { User } from '../../interfaces';

export function initUser(): User {
  return {
    sub: '',
    name: '',
    family_name: '',
    email: '',
    phone_number: '',
    password: '',
    license: { key: '', preview: '' },
    insurance: { key: '', preview: '' },
    birthdate: '',
    address: '',
    latitude: '',
    longitude: '',
    picture: { key: '', preview: '' },
    status: '',
    make: '',
    carModel: '',
    carYear: '',
    photosCar: {
      front: { key: '', preview: '' },
      back: { key: '', preview: '' },
      left: { key: '', preview: '' },
      right: { key: '', preview: '' }
    },
    isWorked: false,
    hellosign: {
      agreement: '',
      fw9: ''
    },
    tShirt: '',
    checkrId: '',
    checkrInvLink: ''
  };
}
