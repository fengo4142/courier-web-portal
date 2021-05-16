import React, { FC, ReactNode } from 'react';
import ReactCodeInput from 'react-code-input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useStores } from '../../../../store';
import SVGIcon from '../../../common/SVGIcon';
import Error from '../../../common/Error';

import styles from './SecondStep.module.sass';

interface SecondStepProps {
  handleChangeStep: any;
  handleChange: any;
  handleConfirmProfile: () => {};
  handleResendCode: () => {};
  err: any;
  isLoading: boolean;
  children?: ReactNode;
}

const codeStyle = {
  width: window.innerWidth < 400 ? '36px' : '40px',
  height: '32px',
  border: 'none',
  marginRight: window.innerWidth < 400 ? '8px' : '14px',
  textAlign: 'center',
  fontSize: '17px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.14)'
};

export const SecondStep: FC<SecondStepProps> = (props) => {
  const { err, handleConfirmProfile, handleResendCode, isLoading, handleChangeStep } = props;
  const { authStore } = useStores();

  const handleChangeCode = (code: string) => {
    authStore.set('code')(code);
  };

  return (
    <>
      <div onClick={handleChangeStep('first')}>
        <SVGIcon name="backArrow" className={styles.backArrowIcon} />
      </div>
      <div className={styles.codeForm}>
        <Typography className={styles.title}>Confirm your phone number</Typography>
        <Typography className={styles.subtitle}>
          We sent a verification code to
          <span className={styles.phone}> {authStore.get('phone_number')} </span>
        </Typography>
        <Typography className={styles.subtitle}>Please enter that code below</Typography>
        <div className={styles.codeWrapper}>
          <ReactCodeInput
            type="number"
            fields={6}
            placeholder={'0'}
            onChange={handleChangeCode}
            inputStyle={codeStyle}
          />
        </div>
        {err.code ? <Error value={err.code} className={styles.error} /> : null}
        <Button
          className={styles.continueButton}
          disabled={authStore.get('code').length < 6 || isLoading}
          variant="contained"
          color="secondary"
          onClick={handleConfirmProfile}
        >
          <Typography className={styles.buttonText}>Continue</Typography>
        </Button>
      </div>
      <div className={styles.signUpFooter}>
        <Typography>Didn't get a verification code?</Typography>
        <Typography className={styles.resend} onClick={handleResendCode}>
          Re-send
        </Typography>
      </div>
    </>
  );
};
