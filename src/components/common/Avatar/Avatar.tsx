import React from 'react';
import classNames from 'classnames';
import { AvatarProps } from '../../../interfaces';
import Typography from '@material-ui/core/Typography';

import styles from './Avatar.module.sass';

export const Avatar = ({ className, src, fullName, email }: AvatarProps) => (
  <div className={classNames(styles.avatarWrapper, className)}>
    <img src={src} alt="avatar" className={styles.photo} />
    <div>
      <Typography className={styles.fullName}>{fullName}</Typography>
      <Typography className={styles.email}>{email}</Typography>
    </div>
  </div>
);
