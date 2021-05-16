export interface User {
  sub: string;
  name: string;
  family_name: string;
  email: string;
  phone_number: string;
  password: string;
  license: { key: string; preview: string };
  insurance: { key: string; preview: string };
  birthdate: string;
  address: string;
  latitude: string;
  longitude: string;
  picture: { key: string; preview: string };
  status: string;
  make: string;
  carModel: string;
  carYear: string;
  photosCar: {
    front: { key: string; preview: string };
    back: { key: string; preview: string };
    left: { key: string; preview: string };
    right: { key: string; preview: string };
  };
  hellosign: {
    agreement: string;
    fw9: string;
  };
  isWorked: boolean;
  checkrId: string;
  checkrInvLink: string;
  tShirt: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
