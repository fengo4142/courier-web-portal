import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LoginMobileLayout.module.sass';
import Typography from '@material-ui/core/Typography';
import logo from '../../assets/img/login-logo@3x.png';
import Logo from '../../components/common/Logo';

export const LoginMobileLayout: FC = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerLine} />
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} logo={logo} />
        </div>
      </div>

      <div className={styles.content}>{props.children}</div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerRow}>
            <Typography className={styles.footerItem}>© Copyright {new Date().getFullYear()} MZ</Typography>
          </div>
          <div className={styles.footerRow}>
            <Link to={'/policy'} className={classNames(styles.footerLink, styles.leftFooterLink)}>
              Privacy Policy
            </Link>
            <Link to={'/terms'} className={styles.footerLink}>
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
