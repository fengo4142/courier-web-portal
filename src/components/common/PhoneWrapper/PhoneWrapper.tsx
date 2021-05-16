import React, { FC } from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import SVGIcon from '../SVGIcon';
import TextField from '../TextField';

import styles from './PhoneWrapper.module.sass';

export interface PhoneProps {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const PHONE_COUNTRY_CODE = process.env.REACT_APP_PHONE_COUNTRY_CODE || '+1';

export const PhoneWrapper: FC<PhoneProps> = (props) => {
  const { onChange } = props;

  return (
    <div className={styles.phoneWrapper}>
      <div className={styles.preInput}>
        <Typography className={styles.phoneTitle}>Phone</Typography>
        <div className={classNames(styles.icon, styles.input)}>
          <SVGIcon className={styles.iconItem} name={'phone'} />
          <SVGIcon className={styles.iconItem} name={'usaFlag'} />
          <Typography className={styles.iconItem}>{PHONE_COUNTRY_CODE}</Typography>
        </div>
      </div>
      <TextField
        onChange={onChange}
        classes={{ input: styles.input }}
        inputProps={{
          placeholder: '(000) 000-0000'
        }}
      />
    </div>
  );
};
