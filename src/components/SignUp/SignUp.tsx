import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import HelloSign from 'hellosign-embedded';

import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import { useStores } from '../../store';
import { decodeErrors } from '../../utils';

import LoginMobileLayout from '../../layouts/LoginMobileLayout';
import { PHONE_COUNTRY_CODE } from '../common/PhoneWrapper/PhoneWrapper';
import Loading from '../common/Loading';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import FourthStep from './components/FourthStep';
import SixthStep from './components/SixthStep';
import SevenStep from './components/SevenStep';

import styles from './SignUp.module.sass';

const TEMPLATE_AGREEMENT = 'TEMPLATE_AGREEMENT';
const TEMPLATE_FW9 = 'TEMPLATE_FW9';

const client = new HelloSign({ clientId: process.env.REACT_APP_HELLO_SIGN_KEY });

export const SignUp: FC = () => {
  const { authStore } = useStores();

  const [err, setErr] = useState({
    email: '',
    password: '',
    phone_number: '',
    global: '',
    code: '',
    day: '',
    month: '',
    year: '',
    name: '',
    family_name: '',
    address: '',
    license: '',
    insurance: '',
    make: '',
    carModel: '',
    carYear: '',
    front: '',
    back: '',
    left: '',
    right: '',
    candidate: '',
    tShirt: '',
    latitude: '',
    longitude: ''
  });
  const {
    sendVerificationCode,
    confirmVerificationCode,
    logIn,
    setToken,
    resendVerificationCode,
    setAuthUser
  } = useAuth();
  const {
    uploadImage,
    setUser,
    getUser,
    checkCandidate,
    completeProfileFirstStep,
    completeProfileSecondStep,
    getHelloSign,
    setRequestIsSigned,
    checkCreateCandidate,
    getUserImages
  } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentSignature, setCurrentSignature] = useState({ template: '' });
  const [isSigned, setIsSigned] = useState(false);
  const [startPrepareTemplate, setStartPrepareTemplate] = useState(false);
  const helloSignRef = useRef(null);

  const handleChangeStep = useCallback(
    (step: string) => () => {
      authStore.set('step')(step);
    },
    [authStore]
  );

  const checkHelloSign = useCallback(async () => {
    const signTemplate = async (templateName: string) => {
      if (_.get(currentSignature, templateName)) {
        return;
      }
      try {
        const { signature_request_id, sign_url } = await getHelloSign(templateName);
        if (authStore.get('step') === 'fifth') {
          setCurrentSignature({
            ...currentSignature,
            template: templateName,
            [templateName]: signature_request_id
          });
          client.open(sign_url, {
            testMode: process.env.NODE_ENV !== 'production',
            allowCancel: false,
            skipDomainVerification: process.env.NODE_ENV !== 'production',
            container: helloSignRef.current,
            hideHeader: true
          });
        }
        setStartPrepareTemplate(false);
      } catch (e) {
        console.warn('signTemplate', templateName, e);
        setStartPrepareTemplate(false);
      }
    };
    if (startPrepareTemplate) {
      return;
    }
    setStartPrepareTemplate(true);
    const user = await getUser();
    const isAgreementSigned = _.get(user, 'hellosign.isAgreementSigned');
    const isFW9Signed = _.get(user, 'hellosign.isFW9Signed');

    if (!isAgreementSigned) {
      return signTemplate(TEMPLATE_AGREEMENT);
    }
    // await getHelloSignSignature(fw9);
    if (!isFW9Signed) {
      return signTemplate(TEMPLATE_FW9);
    }
    setStartPrepareTemplate(false);

    setIsLoading(true);
    await checkCreateCandidate();
    setUser(await getUser());
    setIsLoading(false);

    handleChangeStep('sixth')();
  }, [
    checkCreateCandidate,
    getUser,
    setUser,
    authStore,
    getHelloSign,
    handleChangeStep,
    startPrepareTemplate,
    currentSignature
  ]);

  useEffect(() => {
    if (authStore.get('token')) {
      if (!authStore.get('sub')) {
        getUser()
          .then(async (user) => {
            authStore.set('email')(user.email);
            authStore.set('phone_number')(user.phone_number);

            setUser(user);
            setAuthUser(user);
            try {
              const userImages = await getUserImages();
              setAuthUser({
                license: { key: user.license, preview: _.get(userImages, 'license') },
                insurance: { key: user.insurance, preview: _.get(userImages, 'insurance') },
                photosCar: {
                  front: { key: _.get(user, 'photosCar.front'), preview: _.get(userImages, 'photosCar.front') },
                  back: { key: _.get(user, 'photosCar.back'), preview: _.get(userImages, 'photosCar.back') },
                  left: { key: _.get(user, 'photosCar.left'), preview: _.get(userImages, 'photosCar.left') },
                  right: { key: _.get(user, 'photosCar.right'), preview: _.get(userImages, 'photosCar.right') }
                }
              });
            } catch (e) {
              console.warn('getUserImages err', e);
            }

            if (!user.birthdate) {
              authStore.set('step')('third');
            } else if (!user.carModel) {
              authStore.set('step')('fourth');
            } else if (!user.hellosign.isAgreementSigned || !user.hellosign.isFW9Signed || !user.checkrId) {
              authStore.set('step')('fifth');
            } else if (user.status === 'INCOMPLETE') {
              authStore.set('step')('sixth');
            } else if (user.status === 'PENDING') {
              authStore.set('step')('seventh');
            }

            setIsPageLoading(false);
          })
          .catch(console.warn);
      } else {
        authStore.set('step')('third');
        setIsPageLoading(false);
      }
    } else {
      setIsPageLoading(false);
    }
    if (authStore.get('step') === 'fifth') {
      checkHelloSign().catch(console.warn);
    }
    client.on('sign', async (data: any) => {
      setIsSigned(true);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const template = _.get(currentSignature, 'template') || '';

    if (isSigned && template && _.get(currentSignature, template)) {
      setRequestIsSigned(_.get(currentSignature, template))
        .then(() => {
          setIsSigned(false);
          checkHelloSign().catch(console.warn);
        })
        .catch(console.error);
    }
    // eslint-disable-next-line
  }, [currentSignature, isSigned]);

  useEffect(() => {
    if (authStore.get('step') === 'fifth') {
      checkHelloSign().catch((error) => {
        console.error(error);
      });
    }
    // eslint-disable-next-line
  }, [authStore]);

  const handleChange = (key: string) => (e: React.ChangeEvent<{ value: any }>) => {
    const { value } = e.target;
    switch (key) {
      case 'email':
        authStore.set('email')((value && String(value).toLowerCase()) || '');
        break;
      case 'password':
        authStore.set('password')(value);
        break;
      case 'phone_number':
        authStore.set('phone_number')(`${PHONE_COUNTRY_CODE}${value}`);
        break;
      case 'fullName':
        authStore.set('fullName')(value);
        break;
      case 'make':
        authStore.set('make')(value);
        break;
      case 'carModel':
        authStore.set('carModel')(value);
        break;
      case 'carYear':
        if (value.length > 4 || +value > new Date().getFullYear()) {
          return;
        }
        authStore.set('carYear')(value);
        break;
      case 'month':
        authStore.set('month')(value);
        break;
      case 'tShirt':
        authStore.set('tShirt')(value);
        break;
      case 'year':
        if (value.length > 4 || +value > new Date().getFullYear()) {
          return;
        }
        authStore.set('year')(value);
        break;
      case 'day':
        if (value.length > 2 || +value > 31) {
          return;
        }
        authStore.set('day')(value);
        break;
      case 'isWorked':
        authStore.set('isWorked')(!authStore.get('isWorked'));
        break;
      default:
        break;
    }
    setErr({ ...err, [key]: '', global: '' });
    if (key === 'fullName') {
      setErr({ ...err, name: '', family_name: '' });
    }
  };

  const handleSendCode = async () => {
    const { email, password, phone_number } = authStore.getState();
    setIsLoading(true);
    try {
      const {
        data: { UserSub }
      } = await sendVerificationCode({ email: email.toLowerCase(), password, phone_number });
      authStore.set('sub')(UserSub);
      handleChangeStep('second')();
    } catch (error) {
      const errors = error.response.data;
      if (errors.message !== 'validation error') {
        setErr({ ...err, global: errors.message });
      } else {
        setErr({ ...err, ...decodeErrors(errors.details) });
      }
    }
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    const { email } = authStore.getState();
    try {
      await resendVerificationCode({ email });
    } catch (error) {
      const errors = error.response.data;
      if (errors.message !== 'validation error') {
        setErr({ ...err, global: errors.message });
      } else {
        setErr({ ...err, ...decodeErrors(errors.details) });
      }
    }
    setIsLoading(false);
  };

  const handleConfirmProfile = async () => {
    try {
      setIsLoading(true);
      const { email, password, code } = authStore.getState();
      await confirmVerificationCode({ email, code });
      const { AccessToken } = await logIn({ email, password });
      setToken(AccessToken);
      handleChangeStep('third')();
    } catch (error) {
      const errors = error.response.data;
      if (errors.message !== 'validation error') {
        if (errors.code === 'CodeMismatchException' || errors.code === 'ExpiredCodeException') {
          setErr({ ...err, code: errors.message });
        } else {
          setErr({ ...err, global: errors.message });
        }
      } else {
        setErr({ ...err, ...decodeErrors(errors.details) });
      }
    }
    setIsLoading(false);
  };

  const handleUpdateProfileFirstStep = async () => {
    const [name, familyName] = authStore.get('fullName').split(' ');
    setIsLoading(true);
    try {
      const {
        day,
        month,
        year,
        address,
        latitude,
        longitude,
        license,
        insurance,
        tShirt,
        isWorked
      } = authStore.getState();
      await completeProfileFirstStep({
        day,
        month,
        year,
        address,
        latitude,
        longitude,
        license: license.key,
        insurance: insurance.key,
        name,
        tShirt,
        isWorked,
        family_name: familyName
      });
      const userInfo = await getUser();
      setUser(userInfo);
      handleChangeStep('fourth')();
    } catch (error) {
      const errors = error.response.data;
      if (errors.message !== 'validation error') {
        setErr({ ...err, global: errors.message });
      } else {
        setErr({ ...err, ...decodeErrors(errors.details) });
      }
    }
    setIsLoading(false);
  };

  const handleUpdateProfileSecondStep = async () => {
    try {
      setIsLoading(true);
      const { photosCar, make, carModel, carYear } = authStore.getState();
      const newPhotoCar: any = {};
      newPhotoCar.front = photosCar.front.key;
      newPhotoCar.back = photosCar.back.key;
      newPhotoCar.left = photosCar.left.key;
      newPhotoCar.right = photosCar.right.key;
      await completeProfileSecondStep({
        photosCar: newPhotoCar,
        make,
        carModel,
        carYear
      });
      const userInfo = await getUser();
      setUser(userInfo);
      handleChangeStep('fifth')();
    } catch (error) {
      const errors = error.response.data;
      if (errors.message !== 'validation error') {
        setErr({ ...err, global: errors.message });
      } else {
        setErr({ ...err, ...decodeErrors(errors.details) });
      }
    }
    setIsLoading(false);
  };

  const handleCheckCandidate = async () => {
    try {
      const candidate = await checkCandidate();
      setIsLoading(true);

      if (candidate && candidate.data.status === 'PENDING') {
        handleChangeStep('seventh')();
      } else {
        setErr({
          ...err,
          candidate:
            "You haven't finished your registration in CheckR. Please, enter all the necessary data and try again."
        });
      }
    } catch (error) {
      setErr({ ...err, global: error });
    }
    setIsLoading(false);
  };

  const renderFiveStep = () => {
    return (
      <>
        <div ref={helloSignRef} className={styles.helloSign}>
          {startPrepareTemplate && (
            <div className={`${styles.documentLayout} ${(startPrepareTemplate && styles.documentLayoutLoading) || ''}`}>
              <Loading />
            </div>
          )}
        </div>
      </>
    );
  };

  const renderSteps = () => {
    switch (authStore.get('step')) {
      case 'second':
        return (
          <SecondStep
            err={err}
            isLoading={isLoading}
            handleChangeStep={handleChangeStep}
            handleChange={handleChange}
            handleConfirmProfile={handleConfirmProfile}
            handleResendCode={handleResendCode}
          />
        );
      case 'third':
        return (
          <ThirdStep
            setErr={setErr}
            handleUpdateProfileFirstStep={handleUpdateProfileFirstStep}
            err={err}
            uploadImage={uploadImage}
            isLoading={isLoading}
            handleChange={handleChange}
          />
        );
      case 'fourth':
        return (
          <FourthStep
            setErr={setErr}
            err={err}
            uploadImage={uploadImage}
            isLoading={isLoading}
            handleChange={handleChange}
            handleChangeStep={handleChangeStep}
            handleUpdateProfileSecondStep={handleUpdateProfileSecondStep}
          />
        );
      case 'fifth':
        return renderFiveStep();
      case 'sixth':
        return <SixthStep err={err} handleChangeStep={handleChangeStep} handleCheckCandidate={handleCheckCandidate} />;
      case 'seventh':
        return <SevenStep />;
      default:
        return (
          <FirstStep handleChange={handleChange} err={err} isLoading={isLoading} handleSendCode={handleSendCode} />
        );
    }
  };

  return (
    <LoginMobileLayout>
      <div className={styles.root}>
        {isPageLoading ? <Loading /> : <div className={styles.mainContent}>{renderSteps()}</div>}
      </div>
    </LoginMobileLayout>
  );
};
