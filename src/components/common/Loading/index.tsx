import React, { FC } from 'react';
import classNames from 'classnames';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

interface IStyles {
  classes: {
    root: string;
  };
}
export type LoadingProps = CircularProgressProps & {
  className?: string;
};

const LoadingBase: FC<LoadingProps & IStyles> = (props) => {
  const { className, classes } = props;

  return <CircularProgress className={classNames(className, classes.root)} disableShrink />;
};

const Loading = withStyles((theme: Theme) =>
  createStyles({
    root: {
      alignSelf: 'center'
    }
  })
)(LoadingBase);

export default Loading;
