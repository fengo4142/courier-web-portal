import React, { FC } from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useStores } from '../../../../store';
import SVGIcon from '../../../common/SVGIcon';

import styles from './SevenStep.module.sass';

export const SevenStep: FC = () => {
  const history = useHistory();
  const { authStore, userStore } = useStores();

  const handleLogin = () => {
    authStore.set('step')('');
    history.push('/dashboard');
  };

  return (
    <div className={styles.pendingForm}>
      <SVGIcon name="doneNotes" className={styles.bigIcon} />
      <Typography className={styles.title}>Your application is pending</Typography>
      <Typography className={styles.subtitle}>
        We will alert you to
        <span className={styles.email}> {userStore.get('email')} </span>
        once we have reviewed your application
      </Typography>
      <Button className={styles.okButton} variant="contained" color="secondary" onClick={handleLogin}>
        <Typography className={styles.buttonText}>Ok</Typography>
      </Button>
    </div>
  );
};
