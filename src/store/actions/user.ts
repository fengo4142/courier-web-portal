import api from '../../api';
import { ChangePassword } from '../../interfaces';

export const getUser = () => {
  return api.getUser();
};

export const getUserImages = () => {
  return api.getUserImages();
};

export const completeProfile = (options: any) => {
  return api.completeProfile(options);
};

export const completeProfileFirstStep = (options: any) => {
  return api.completeProfileFirstStep(options);
};

export const completeProfileSecondStep = (options: any) => {
  return api.completeProfileSecondStep(options);
};

export const uploadImage = (userId: string, imageOptions: any, size: any) => {
  return api.uploadImage(userId, imageOptions, size);
};

export const updateProfilePicture = (url: string) => {
  return api.updateProfilePicture(url);
};

export const updateProfile = (options: any) => {
  return api.updateProfile(options);
};

export const changePassword = (data: ChangePassword) => {
  return api.changePassword(data);
};

export const checkCandidate = () => {
  return api.checkCandidate();
};

export const getHelloSign = (templateName: string) => {
  return api.getHelloSign(templateName);
};

export const setRequestIsSigned = (templateName: string) => {
  return api.setRequestIsSigned(templateName);
};

export const getHelloSignSignature = (id: string) => {
  return api.getHelloSignSignature(id);
};

export const checkCreateCandidate = () => {
  return api.checkCreateCandidate();
};

export const getImageLink = (key: string, fileName: string) => {
  return api.getImageLink(key, fileName);
};
