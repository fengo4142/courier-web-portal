import React, { FC } from 'react';
import { Route, useRouteMatch, Redirect } from 'react-router';
import Payment from '../Payment';
import Profile from '../Profile';
import ResetPasswordSetting from '../ResetPasswordSetting';

import styles from './Settings.module.sass';

export const Settings: FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className={styles.root}>
      <Route path={`${path}/payment`} component={Payment} />
      <Route path={`${path}/profile`} component={Profile} />
      <Route path={`${path}/reset-password`} component={ResetPasswordSetting} />
      {/* <Redirect path={`${path}/*`} to={path} /> */}
    </div>
  );
};
