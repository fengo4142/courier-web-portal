import React, { FC, useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router';
import AuthMenu from '../../components/AuthMenu';
import Logo from '../../components/common/Logo';
import Loading from '../../components/common/Loading';
import useUser from '../../hooks/useUser';
import useAuth from '../../hooks/useAuth';
import { useStores } from '../../store';
import api from '../../api';

import menuIcon from '../../assets/icon/ico-menu.svg';
import closeIcon from '../../assets/icon/ico-close.svg';
import logo from '../../assets/img/dashboard-logo@3x.png';

import styles from './AuthLayout.module.sass';

export const AuthLayout: FC = (props) => {
  const history = useHistory();
  const { authStore } = useStores();
  const user = useUser();
  const auth = useAuth();
  const [showMenu, seShowMenu] = useState(false);

  const checkToken = useCallback(async () => {
    authStore.set('isLoading')(true);
    const token = authStore.get('token');
    if (token) {
      auth.setToken(token);
      const userInfo = await user.getUser().catch(() => {
        return auth.logOut();
      });
      if (userInfo) {
        const userImages = await user.getUserImages();
        user.setUser({
          ...userInfo,
          picture: { key: userInfo.picture, preview: _.get(userImages, 'picture') },
          license: { key: userInfo.license, preview: _.get(userImages, 'license') },
          insurance: { key: userInfo.insurance, preview: _.get(userImages, 'insurance') },
          photosCar: {
            front: { key: _.get(userInfo, 'photosCar.front'), preview: _.get(userImages, 'photosCar.front') },
            back: { key: _.get(userInfo, 'photosCar.back'), preview: _.get(userImages, 'photosCar.back') },
            left: { key: _.get(userInfo, 'photosCar.left'), preview: _.get(userImages, 'photosCar.left') },
            right: { key: _.get(userInfo, 'photosCar.right'), preview: _.get(userImages, 'photosCar.right') }
          }
        });
        if (!userInfo.address) {
          authStore.set('step')('third');
          history.push('/sign-up');
          authStore.set('isLoading')(false);
        } else if (!userInfo.carModel) {
          authStore.set('step')('fourth');
          history.push('/sign-up');
          authStore.set('isLoading')(false);
        } else if (!userInfo.hellosign.isAgreementSigned || !userInfo.hellosign.isFW9Signed || !userInfo.checkrId) {
          authStore.set('step')('fifth');
          history.push('/sign-up');
          authStore.set('isLoading')(false);
        } else if (userInfo.checkrId && userInfo.status === 'INCOMPLETE') {
          authStore.set('step')('sixth');
          history.push('/sign-up');
          authStore.set('isLoading')(false);
        } else {
          authStore.set('isLoading')(false);
        }
      }
    } else {
      authStore.set('isLoading')(false);
    }
  }, [authStore, history, auth, user]);

  useEffect(() => {
    const unauthorized = api.on('unauthorized').subscribe((value) => {
      console.warn('** unauthorized **', value);
      auth.logOut().catch(console.warn);
    });

    checkToken().catch();

    return () => {
      unauthorized.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const getPageTitle = () => {
    switch (window.location.pathname) {
      case '/dashboard/earning':
        return 'Dashboard';
      case '/dashboard/delivery':
        return 'Delivery History';
      case '/dashboard/terms':
        return 'Terms and Conditions';
      case '/dashboard/payment':
        return 'Payment options';
      case '/dashboard/profile':
        return 'Profile Settings';
      case '/dashboard/reset-password':
        return 'Change password';
      default:
        return '';
    }
  };

  const toggleMenu = () => {
    window.scrollTo(0, 0);
    if (!showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    seShowMenu(!showMenu);
  };

  return authStore.get('isLoading') ? (
    <div className={'globalLoader'}>
      <Loading />
    </div>
  ) : (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerLine} />
        <div className={styles.headerContent}>
          <button onClick={toggleMenu} className={styles.menuBtn}>
            <img src={showMenu ? closeIcon : menuIcon} alt="" />
          </button>
          {showMenu ? (
            <Logo className={styles.logo} logo={logo} />
          ) : (
            <h3 className={styles.pageTitle}>{getPageTitle()}</h3>
          )}
          <button className={styles.avatarInitials}>
            {`${user.name && user.name[0]}${user.family_name && user.family_name[0]}`}
          </button>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.menuWrapper}>
          <AuthMenu />
        </div>
        {props.children}
      </div>

      {showMenu && (
        <div className={styles.menu}>
          <AuthMenu toggleMenu={toggleMenu} />
        </div>
      )}
    </div>
  );
};
