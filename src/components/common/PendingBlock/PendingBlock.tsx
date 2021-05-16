import React, { FC } from 'react';
import classNames from 'classnames';
import useUser from '../../../hooks/useUser';
import Typography from '@material-ui/core/Typography';
import SVGIcon from '../SVGIcon';

import styles from './PendingBlock.module.sass';

interface IStyles {
  className?: string;
}
export const PendingBlock: FC<IStyles> = ({ className }) => {
  const user = useUser();
  return (
    <div className={classNames(styles.pendingHeader, className)}>
      <SVGIcon name={'pendingApplication'} />
      <div className={styles.textBlock}>
        <Typography className={styles.titlePending}>
          {user.status === 'PENDING' ? 'Your application is pending' : 'Your application is declined'}
        </Typography>
        {user.status === 'PENDING' ? (
          <Typography className={styles.subtitlePending}>
            We will alert you to
            <span className={styles.email}>{` ${user.email} `}</span>
            once we have reviewed your application
          </Typography>
        ) : (
          <Typography className={styles.subtitlePending}>
            We sent you the details to
            <span className={styles.email}> {user.email}</span>
            Please correct your profile and apply once again.
          </Typography>
        )}
      </div>
    </div>
  );
};
