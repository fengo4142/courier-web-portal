import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

import LoginMobileLayout from '../../layouts/LoginMobileLayout';
import SVGIcon from '../common/SVGIcon';
import TextField from '../common/TextField';
import Error from '../common/Error';

import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import { useStores } from '../../store';
import { decodeErrors } from '../../utils';

import styles from './Login.module.sass';

export const Login: FC = () => {
  const { logIn, setToken, logOut } = useAuth();
  const history = useHistory();
  const user = useUser();
  const [err, setErr] = useState({ email: '', password: '', global: '' });
  const { authStore } = useStores();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: string) => (e: React.ChangeEvent<{ value: unknown }>) => {
    setLoginData({ ...loginData, [key]: e.target.value });
    setErr({ ...err, [key]: '', global: '' });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await logIn(loginData);
      const { AccessToken: token } = response;
      authStore.set('email')(loginData.email);
      authStore.set('password')(loginData.password);
      const userInfo = await user.getUser().catch(() => {
        return logOut();
      });
      if (userInfo) {
        user.setUser(userInfo);

        if (!userInfo.address) {
          authStore.set('step')('third');
          history.push('/sign-up');
        } else if (!userInfo.carModel) {
          authStore.set('step')('fourth');
          history.push('/sign-up');
        } else if (!userInfo.hellosign.isAgreementSigned || !userInfo.hellosign.isFW9Signed) {
          authStore.set('step')('fifth');
          history.push('/sign-up');
        } else if (userInfo.checkrId && userInfo.status === 'INCOMPLETE') {
          authStore.set('step')('sixth');
          history.push('/sign-up');
        }
        setToken(token);
      }
    } catch (error) {
      const errors = error.response && error.response.data;
      if (errors.message !== 'validation error') {
        setErr({ ...err, global: errors.message });
      } else {
        setErr({ ...err, ...decodeErrors(errors.details) });
      }
    }
    setIsLoading(false);
  };

  const renderForm = () => (
    <div className={styles.signInForm}>
      <Typography className={styles.title}>Sign In</Typography>
      <div className={styles.inputWrapper}>
        <TextField
          classes={{
            input: styles.input,
            root: styles.textField
          }}
          inputProps={{
            placeholder: 'Login',
            startAdornment: (
              <InputAdornment position="start">
                <SVGIcon name={'avatar'} />
              </InputAdornment>
            )
          }}
          onChange={handleChange('email')}
        />
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
      </div>
      <div className={styles.forgotPassword}>
        <Typography>Forgot your password?</Typography>
        <Link to={'/reset-password'} className={styles.resetPassword}>
          Reset
        </Link>
      </div>
      {err.global ? <Error className={styles.error} value={err.global} /> : null}
      {err.password || err.email ? <Error className={styles.error} value={err.password || err.email} /> : null}
      <Button
        className={styles.signInButton}
        variant="contained"
        disabled={isLoading}
        color="primary"
        onClick={handleLogin}
      >
        <Typography>Sign in</Typography>
      </Button>
    </div>
  );

  return (
    <LoginMobileLayout>
      <div className={styles.root}>
        <div className={styles.mainContent}>
          {renderForm()}
          <div className={styles.signInFooter}>
            <Typography>Want to be a courier?</Typography>
            <Link to={'/sign-up'} className={styles.signUp}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </LoginMobileLayout>
  );
};
