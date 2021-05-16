import { useStores } from '../store';
import { ChangePassword } from '../interfaces';
import {
  getUser,
  getUserImages,
  completeProfile,
  uploadImage,
  updateProfilePicture,
  updateProfile,
  changePassword,
  checkCandidate,
  completeProfileFirstStep,
  completeProfileSecondStep,
  getHelloSign,
  setRequestIsSigned,
  getHelloSignSignature,
  checkCreateCandidate,
  getImageLink
} from '../store/actions/user';

function isJSON(str: string) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}

export default function useUser() {
  const { userStore } = useStores();

  return {
    ...userStore.getState(),
    getUser: () => getUser(),
    getUserImages: () => getUserImages(),
    setUser: (userInfo: any) => {
      userInfo.name && userStore.set('name')(userInfo.name);
      userInfo.family_name && userStore.set('family_name')(userInfo.family_name);
      userInfo.insurance && userStore.set('insurance')(userInfo.insurance);
      userInfo.license && userStore.set('license')(userInfo.license);
      userInfo.status && userStore.set('status')(userInfo.status);
      userInfo.sub && userStore.set('sub')(userInfo.sub);
      userInfo.picture && userStore.set('picture')(userInfo.picture);
      userInfo.birthdate && userStore.set('birthdate')(userInfo.birthdate);
      userInfo.phone_number && userStore.set('phone_number')(userInfo.phone_number);
      userInfo.email && userStore.set('email')(userInfo.email);
      userInfo.make && userStore.set('make')(userInfo.make);
      userInfo.carModel && userStore.set('carModel')(userInfo.carModel);
      userInfo.carYear && userStore.set('carYear')(userInfo.carYear);
      userInfo.photosCar && userStore.set('photosCar')(userInfo.photosCar);
      userInfo.checkrId && userStore.set('checkrId')(userInfo.checkrId);
      userInfo.checkrInvLink && userStore.set('checkrInvLink')(userInfo.checkrInvLink);
      userInfo.tShirt && userStore.set('tShirt')(userInfo.tShirt);
      userInfo.isWorked && userStore.set('isWorked')(userInfo.isWorked);
      userInfo.hellosign && userStore.set('hellosign')({ ...userStore.get('hellosign'), ...userInfo.hellosign });

      // For old Users
      if (isJSON(userInfo.address)) {
        const location = JSON.parse(userInfo.address);
        userStore.set('longitude')(location.longitude);
        userStore.set('latitude')(location.latitude);
        userStore.set('address')(location.address);
      } else {
        userInfo.longitude && userStore.set('longitude')(userInfo.longitude);
        userInfo.latitude && userStore.set('latitude')(userInfo.latitude);
        userInfo.address && userStore.set('address')(userInfo.address);
      }
    },
    removeUser: () => {
      userStore.set('name')('');
      userStore.set('family_name')('');
      userStore.set('license')({ key: '', preview: '' });
      userStore.set('insurance')({ key: '', preview: '' });
      userStore.set('birthdate')('');
      userStore.set('phone_number')('');
      userStore.set('email')('');
      userStore.set('sub')('');
      userStore.set('picture')({ key: '', preview: '' });
      userStore.set('latitude')('');
      userStore.set('longitude')('');
      userStore.set('status')('');
      userStore.set('make')('');
      userStore.set('carModel')('');
      userStore.set('carYear')('');
      userStore.set('checkrId')('');
      userStore.set('checkrInvLink')('');
      userStore.set('tShirt')('');
      userStore.set('photosCar')({
        left: { key: '', preview: '' },
        right: { key: '', preview: '' },
        front: { key: '', preview: '' },
        back: { key: '', preview: '' }
      });
      userStore.set('hellosign')({
        agreement: '',
        fw9: ''
      });
      userStore.set('address')('');
      userStore.set('isWorked')(false);
    },
    completeProfile: (options: any) => completeProfile(options),
    completeProfileFirstStep: (options: any) => completeProfileFirstStep(options),
    completeProfileSecondStep: (options: any) => completeProfileSecondStep(options),
    updateProfile: (options: any) => updateProfile(options),
    uploadImage: (userId: string, options: any, size: any) => uploadImage(userId, options, size),
    updateProfilePicture: (url: string) => updateProfilePicture(url),
    changePassword: (data: ChangePassword) => changePassword(data),
    checkCandidate: () => checkCandidate(),
    getHelloSign: (templateName: string) => getHelloSign(templateName),
    setRequestIsSigned: (templateName: string) => setRequestIsSigned(templateName),
    checkCreateCandidate: () => checkCreateCandidate(),
    getHelloSignSignature: (id: string) => getHelloSignSignature(id),
    getImageLink: (key: string, fileName: string) => getImageLink(key, fileName)
  };
}
