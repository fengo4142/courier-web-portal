import React, { FC } from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SVGIcon from '../common/SVGIcon';
import Logo from '../common/Logo';
import logo from '../../assets/img/login-logo@3x.png';

import styles from './InfoLogin.module.sass';

export const InfoLogin: FC = () => {
  const renderFooter = () => (
    <div className={styles.footer}>
      <Typography className={styles.footerItem}>© Copyright {new Date().getFullYear()} MZ </Typography>
      <Link to={'/policy'} className={classNames(styles.footerItem, styles.link)}>
        Privacy Policy
      </Link>
      <Link to={'/terms'} className={classNames(styles.footerItem, styles.link)}>
        Terms & Conditions
      </Link>
    </div>
  );

  return (
    <div className={styles.informationBlock}>
      <Logo className={styles.logo} logo={logo} />
      <SVGIcon name={'courier'} />
      {renderFooter()}
    </div>
  );
};
