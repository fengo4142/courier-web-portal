import React, { FC, useState } from 'react';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useQueryParam, StringParam } from 'use-query-params';
import SVGIcon from '../common/SVGIcon';
import TextField from '../common/TextField';
import Error from '../common/Error';
import useAuth from '../../hooks/useAuth';
import { decodeErrors } from '../../utils';
import LoginMobileLayout from '../../layouts/LoginMobileLayout';

import styles from './ResetPassword.module.sass';

export const ResetPassword: FC = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const { sendRequestForResetPassword, resetPassword } = useAuth();
  const [err, setErr] = useState({ email: '', password: '', global: '', newPassword: '', newPasswordConfirm: '' });
  const [user, setUser] = useState({ email: '', password: '' });
  const [passwords, setPasswords] = useState({ newPassword: '', newPasswordConfirm: '' });
  const [code] = useQueryParam('code', StringParam);
  const [email] = useQueryParam('email', StringParam);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoToSignIn = () => {
    history.push('/login');
  };

  const handleChange = (key: string) => (e: React.ChangeEvent<{ value: string }>) => {
    const { value } = e.target;
    if (key === 'email') {
      setUser({ ...user, email: value });
    } else {
      setPasswords({ ...passwords, [key]: value });
    }
    setErr({ ...err, [key]: '' });
  };

  /**
   * Validate fields, only email field now
   */
  const validate = () => {
    let valid: boolean = true;
    for (const field in user) {
      if (user.hasOwnProperty(field)) {
        switch (field) {
          case 'email':
            if (!user[field]) {
              setErr({ ...err, email: 'Please enter an email address' });
              valid = false;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user[field])) {
              setErr({ ...err, email: 'Email is not valid' });
              valid = false;
            }
            break;
          default:
            break;
        }
      }
    }
    return valid;
  };

  const handleSendRequestForResetPassword = async () => {
    if (validate()) {
      try {
        setIsLoading(true);
        await sendRequestForResetPassword(user.email);
        history.push('/reset-password/sent');
      } catch (error) {
        const errors = error.response.data;
        if (errors.code === 'UserNotFoundException') {
          history.push('/reset-password/sent');
        }
        if (errors.message !== 'validation error') {
          setErr({ ...err, global: errors.message });
        } else {
          setErr({ ...err, ...decodeErrors(errors.details) });
        }
      }
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!passwords.newPassword || !passwords.newPasswordConfirm) {
      setErr({ ...err, global: 'All fields are required' });
      return;
    }

    if (!passwords.newPassword.match(/^\S*$/) || !passwords.newPasswordConfirm.match(/^\S*$/)) {
      setErr({ ...err, global: 'The password should contain numbers and uppercase letters' });
      return;
    }

    if (passwords.newPassword !== passwords.newPasswordConfirm) {
      setErr({ ...err, global: 'Password mismatch' });
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword({
        email: email as string,
        password: passwords.newPassword,
        code: code as string
      });
      history.push('/reset-password/success');
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

  const renderResetPassword = () => {
    return (
      <div className={styles.resetPasswordWrapper}>
        <div>
          <Link to={'/login'}>
            <SVGIcon name={'backArrow'} className={styles.backArrowIcon} />
          </Link>
        </div>
        <div className={styles.passwordForm}>
          <Typography className={styles.title}>Reset Password</Typography>
          <Typography className={styles.subtitle}>Please enter an email with which you registered</Typography>
          <div className={styles.emailWrapper}>
            <TextField
              classes={{ input: styles.input, root: styles.textField }}
              inputProps={{
                placeholder: 'Email',

                startAdornment: (
                  <InputAdornment position="start">
                    <SVGIcon name={'email'} />
                  </InputAdornment>
                )
              }}
              value={user.email}
              onChange={handleChange('email')}
            />
            {err.email ? <Error value={err.email} /> : null}
            <Button
              className={styles.sendRequest}
              variant="contained"
              color="secondary"
              disabled={isLoading}
              onClick={handleSendRequestForResetPassword}
            >
              <Typography className={styles.requestText}>Send request</Typography>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderSent = () => {
    return (
      <div className={styles.mainContent}>
        <div className={styles.checkEmail}>
          <SVGIcon name={'checkEmail'} className={styles.bigIcon} />
          <Typography className={styles.title}>Check your email</Typography>
          <Typography className={styles.subtitle}>
            We have sent instructions to
            <span className={styles.email}> {user.email} </span>
          </Typography>
          <Typography className={styles.resend}>
            Didn’t receive the email?
            <span onClick={handleSendRequestForResetPassword} className={styles.link}>
              Resend
            </span>
          </Typography>
        </div>
        <div className={styles.checkEmailFooter}>
          <Typography>Back to</Typography>
          <Link to={'/login'} className={styles.link}>
            Sign In
          </Link>
        </div>
      </div>
    );
  };

  const renderNewPassword = () => {
    return (
      <div className={styles.newPasswordForm}>
        <Typography className={styles.title}>Set New Password</Typography>
        <Typography className={styles.subtitle}>
          For more security the password should contain numbers and uppercase letters
        </Typography>
        <div className={styles.passwordWrapper}>
          <TextField
            classes={{ input: styles.input, root: styles.textField }}
            inputProps={{
              type: 'password',
              placeholder: 'New Password',
              startAdornment: (
                <InputAdornment position="start">
                  <SVGIcon name={'password'} />
                </InputAdornment>
              )
            }}
            onChange={handleChange('newPassword')}
          />
          {err.newPassword ? <Error value={err.newPassword} /> : null}
          <TextField
            classes={{ input: styles.input, root: styles.textField }}
            inputProps={{
              type: 'password',
              placeholder: 'Confirm New Password',
              startAdornment: (
                <InputAdornment position="start">
                  <SVGIcon name={'password'} />
                </InputAdornment>
              )
            }}
            onChange={handleChange('newPasswordConfirm')}
          />
          {err.newPasswordConfirm ? <Error value={err.newPasswordConfirm} /> : null}
          {err.global ? <Error className={styles.error} value={err.global} /> : null}
          <Button
            className={styles.changePassword}
            variant="contained"
            color="secondary"
            disabled={isLoading}
            onClick={handleUpdatePassword}
          >
            <Typography className={styles.changeText}>Change Password</Typography>
          </Button>
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    return (
      <div className={styles.passwordChangedWrapper}>
        <SVGIcon name={'passwordChanged'} className={styles.bigIcon} />
        <Typography className={styles.title}>Password changed</Typography>
        <Typography className={styles.subtitle}>Now you can use the new password to Sign In</Typography>
        <Button className={styles.signInButton} variant="outlined" color="secondary" onClick={handleGoToSignIn}>
          <Typography className={styles.signInTextDesktop}>Go to Sign In</Typography>
          <Typography className={styles.signInTextMobile}>Ok</Typography>
        </Button>
      </div>
    );
  };

  return (
    <LoginMobileLayout>
      <Switch>
        <Route exact path={path}>
          {renderResetPassword()}
        </Route>
        <Route path={`${path}/sent`}>{renderSent()}</Route>
        <Route path={`${path}/new-password`}>{renderNewPassword()}</Route>
        <Route path={`${path}/success`}>{renderSuccess()}</Route>
      </Switch>
    </LoginMobileLayout>
  );
};
