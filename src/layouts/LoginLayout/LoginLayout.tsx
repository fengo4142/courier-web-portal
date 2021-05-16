import React, { FC } from 'react';
import InfoLogin from '../../components/InfoLogin';

import styles from './LoginLayout.module.sass';

export const LoginLayout: FC = (props) => {
  return (
    <div className={styles.root}>
      <InfoLogin />
      {props.children}
    </div>
  );
};
