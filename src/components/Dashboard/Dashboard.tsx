import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import Earning from '../Earning';
import Delivery from '../Delivery';
import TermsDashboard from '../TermsDashboard';
import Payment from '../Payment';
import Profile from '../Profile';
import ResetPasswordSetting from '../ResetPasswordSetting';

import styles from './Dashboard.module.sass';

export const Dashboard: FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className={styles.root}>
      <Switch>
        <Route path={`${path}/earning`} component={Earning} />
        <Route path={`${path}/delivery`} component={Delivery} />
        <Route path={`${path}/terms`} component={TermsDashboard} />
        <Route path={`${path}/payment`} component={Payment} />
        <Route path={`${path}/profile`} component={Profile} />
        <Route path={`${path}/reset-password`} component={ResetPasswordSetting} />
        <Redirect path={`${path}/*`} to={`${path}`} />
        <Redirect exact from={path} to={`${path}/earning`} />
      </Switch>
    </div>
  );
};
