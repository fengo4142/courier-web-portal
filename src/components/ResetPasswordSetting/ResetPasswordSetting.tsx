import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { decodeErrors } from '../../utils';
import useUser from '../../hooks/useUser';

import TextField from '../common/TextField';
import Error from '../common/Error';
import SVGIcon from '../common/SVGIcon';
import PendingBlock from '../common/PendingBlock';

import styles from './ResetPasswordSetting.module.sass';

export const ResetPasswordSetting: FC = () => {
  const history = useHistory();
  const user = useUser();
  const [err, setErr] = useState({ global: '', oldPassword: '', newPassword: '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', newPasswordConfirm: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoToSignIn = () => {
    history.push('/dashboard/earning');
  };

  const handleChange = (key: string) => (e: React.ChangeEvent<{ value: string }>) => {
    const { value } = e.target;
    setPasswords({ ...passwords, [key]: value });
    setErr({ ...err, [key]: '', global: '' });
  };

  const handleUpdatePassword = async () => {
    const { oldPassword, newPassword, newPasswordConfirm } = passwords;

    if (newPassword !== newPasswordConfirm) {
      setErr({ ...err, global: 'Password mismatch' });
      return;
    }

    try {
      setIsLoading(true);
      await user.changePassword({
        oldPassword,
        newPassword
      });
      setIsSuccess(true);
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

  const renderSuccess = () => {
    return (
      <div className={styles.passwordChangedWrapper}>
        <SVGIcon name={'passwordChanged'} className={styles.bigIcon} />
        <Typography className={styles.title}>Password changed</Typography>
        <Typography className={styles.subtitle}>Now you can use the new password to Sign In</Typography>
        <Button className={styles.signInButton} variant="outlined" color="secondary" onClick={handleGoToSignIn}>
          <Typography className={styles.signInText}>Ok</Typography>
        </Button>
      </div>
    );
  };

  const renderNewPassword = () => {
    return (
      <div className={styles.newPasswordForm}>
        {user.status !== 'ACTIVE' ? <PendingBlock className={styles.pendingBlock} /> : null}
        <Typography className={styles.title}>Change Password</Typography>
        <div className={styles.passwordWrapper}>
          <TextField
            label={'Old Password'}
            classes={{ input: styles.input, inputRoot: styles.inputRoot, root: styles.rootInput }}
            inputProps={{
              type: 'password',
              placeholder: 'Required'
            }}
            onChange={handleChange('oldPassword')}
          />
          {err.oldPassword ? <Error className={styles.error} value={err.oldPassword} /> : null}
          <TextField
            label={'New Password'}
            classes={{ input: styles.input, inputRoot: styles.inputRoot, root: styles.rootInput }}
            inputProps={{
              type: 'password',
              placeholder: 'Required'
            }}
            onChange={handleChange('newPassword')}
          />
          {err.newPassword ? <Error className={styles.error} value={err.newPassword} /> : null}
          <TextField
            label={'Confirm New Password'}
            classes={{ input: styles.input, inputRoot: styles.inputRoot, root: styles.rootInput }}
            inputProps={{
              type: 'password',
              placeholder: 'Required'
            }}
            onChange={handleChange('newPasswordConfirm')}
          />
          {err.newPassword ? <Error className={styles.error} value={err.newPassword} /> : null}
          {err.global ? <Error className={styles.error} value={err.global} /> : null}
          <div className={styles.buttonContainer}>
            <Button
              className={styles.changePassword}
              variant="contained"
              color="secondary"
              disabled={isLoading}
              onClick={handleUpdatePassword}
            >
              <Typography className={styles.changeText}>Change</Typography>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return isSuccess ? renderSuccess() : renderNewPassword();
};
