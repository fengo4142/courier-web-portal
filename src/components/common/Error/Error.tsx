import React, { FC } from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

import styles from './Error.module.sass';

interface ErrorProps {
  className?: string;
  value: string;
}

export const Error: FC<ErrorProps> = (props) => {
  const { className, value } = props;
  return <Typography className={classNames(styles.root, className)}>{value}</Typography>;
};
