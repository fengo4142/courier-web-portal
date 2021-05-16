import React, { FC } from 'react';
import Avatar from '../common/Avatar';
import Logo from '../common/Logo';
import Menu from '../common/Menu';
import { useStores } from '../../store';
import logo from '../../assets/img/dashboard-logo@3x.png';

import styles from './AuthMenu.module.sass';

interface MenuProps {
  toggleMenu?: () => void;
}

export const AuthMenu: FC<MenuProps> = ({ toggleMenu }) => {
  const { userStore } = useStores();

  return (
    <div className={styles.AuthMenu}>
      <Logo className={styles.logo} logo={logo} />
      <Avatar
        src={userStore.get('picture').preview || logo}
        fullName={`${userStore.get('family_name')} ${userStore.get('name')}`}
        email={userStore.get('email')}
      />
      <Menu toggleMenu={toggleMenu} />
    </div>
  );
};
