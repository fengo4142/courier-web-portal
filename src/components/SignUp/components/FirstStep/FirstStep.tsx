import React, { FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

import CheckBox from '../../../common/Checkbox';
import SVGIcon from '../../../common/SVGIcon';
import TextField from '../../../common/TextField';
import PhoneWrapper from '../../../common/PhoneWrapper';
import Error from '../../../common/Error';

import styles from './FirstStep.module.sass';

interface FirstStepProps {
  handleChange: any;
  handleSendCode: () => {};
  err: any;
  isLoading: boolean;
  children?: ReactNode;
}

export const FirstStep: FC<FirstStepProps> = (props) => {
  const [isAgree, setIsAgree] = useState(false);
  const { err, handleChange, isLoading, handleSendCode } = props;

  const renderInputFirstStep = () => {
    return (
      <div className={styles.inputWrapper}>
        <TextField
          classes={{
            input: styles.input,
            root: styles.textField
          }}
          inputProps={{
            placeholder: 'Email',
            startAdornment: (
              <InputAdornment position="start">
                <SVGIcon name={'email'} />
              </InputAdornment>
            )
          }}
          onChange={handleChange('email')}
        />
        {err.email ? <Error className={styles.error} value={err.email} /> : null}
        <PhoneWrapper onChange={handleChange('phone_number')} />
        {err.phone_number ? <Error className={styles.error} value={err.phone_number} /> : null}
        <TextField
          classes={{
            input: styles.input,
            root: styles.textField
          }}
          inputProps={{
            type: 'password',
            placeholder: 'Password',
            startAdornment: (
              <InputAdornment position="start">
                <SVGIcon name={'password'} />
              </InputAdornment>
            )
          }}
          onChange={handleChange('password')}
        />
        {err.password ? <Error className={styles.error} value={err.password} /> : null}
      </div>
    );
  };

  return (
    <>
      <div className={styles.signUpForm}>
        <Typography className={styles.title}>Sign Up</Typography>
        {renderInputFirstStep()}
        <Typography className={styles.termsAndPolicy}>
          <CheckBox className={styles.checkBox} checked={isAgree} onChange={() => setIsAgree(!isAgree)} />I agree to
          <Link to={'/terms'} className={styles.link}>
            Terms of Use
          </Link>
          and
          <Link to={'/terms'} className={styles.link}>
            Privacy Policy
          </Link>
        </Typography>
        {err.global ? <Error className={styles.error} value={err.global} /> : null}
        <Button
          className={styles.continueButton}
          variant="contained"
          disabled={!isAgree || isLoading}
          color="secondary"
          onClick={handleSendCode}
        >
          <Typography className={styles.buttonText}>Continue</Typography>
        </Button>
      </div>
      <div className={styles.signUpFooter}>
        <Typography>Already have an account?</Typography>
        <Link to={'/login'} className={styles.signIn}>
          Sign In
        </Link>
      </div>
    </>
  );
};
