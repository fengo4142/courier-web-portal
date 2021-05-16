export interface AuthState {
  token?: string;
  refresh?: string;
  fullName: string;
  email: string;
  phone_number: string;
  password: string;
  code: string;
  step: string;
  month: string;
  year: string;
  day: string;
  address: string;
  latitude: string;
  longitude: string;
  license: { key: string; preview: string };
  insurance: { key: string; preview: string };
  sub: string;
  picture: { key: string; preview: string };
  make: string;
  carModel: string;
  carYear: string;
  tShirt: string;
  isLoading: boolean;
  isWorked: boolean;
  hellosign: {
    agreement: string;
    fw9: string;
  };
  photosCar: {
    front: { key: string; preview: string };
    back: { key: string; preview: string };
    left: { key: string; preview: string };
    right: { key: string; preview: string };
  };
}
