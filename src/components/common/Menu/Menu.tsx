import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import SVGIcon from '../SVGIcon';
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';
import { dashboardItems, settingsItems } from '../../../constants';
import styles from './Menu.module.sass';

interface MenuProps {
  toggleMenu?: () => void;
}

export const Menu: FC<MenuProps> = ({ toggleMenu }) => {
  const { logOut, setToken } = useAuth();
  const { removeUser } = useUser();
  const history = useHistory();
  const [path, setPath] = useState(history.location.pathname);

  useEffect(() => {
    setPath(history.location.pathname);
  }, [history.location.pathname]);

  const handleChangeRoute = (currentPath: string) => async () => {
    if (typeof toggleMenu === 'function') {
      toggleMenu();
    }
    setPath(currentPath);
    if (currentPath === '/logout') {
      await logOut();
      setToken('');
      removeUser();
    } else {
      history.push(currentPath);
    }
  };

  return (
    <div className={classNames(styles.menuWrapper)}>
      <div className={styles.menuSection}>
        <SVGIcon className={styles.sectionIcon} name={'dashboard'} />
        <Typography className={styles.titleSection}>Dashboard</Typography>
      </div>
      {dashboardItems.map((item) => {
        return (
          <div
            className={classNames(styles.menuItem, { [styles.active]: path === item.path })}
            key={item.path}
            onClick={handleChangeRoute(item.path)}
          >
            {item.label}
          </div>
        );
      })}
      <div className={styles.menuSection}>
        <SVGIcon className={styles.sectionIcon} name={'settings'} />
        <Typography className={styles.titleSection}>Settings</Typography>
      </div>
      {settingsItems.map((item) => {
        return (
          <div
            className={classNames(styles.menuItem, { [styles.active]: path === item.path })}
            key={item.path}
            onClick={handleChangeRoute(item.path)}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};
