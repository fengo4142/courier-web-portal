import React, { FC } from 'react';
import MuiRadio, { RadioProps } from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, Theme, withStyles } from '@material-ui/core';

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <circle cx="11" cy="11" r="10.5" fill="#FFF" fill-rule="evenodd" stroke="#CFCFE1" />
  </svg>
);

const checkedIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <g fill="none" fill-rule="evenodd">
      <circle cx="11" cy="11" r="11" fill="#006cf0" />
      <circle cx="11" cy="11" r="9" fill="#FFF" />
      <circle cx="11" cy="11" r="8" fill="#006cf0" />
    </g>
  </svg>
);

const RadioBase: FC<RadioProps & { label?: string; className?: string }> = (props) => {
  const { label, className } = props;
  return (
    <FormControlLabel
      className={className}
      control={<MuiRadio {...props} color="primary" icon={icon} checkedIcon={checkedIcon} />}
      label={label}
    />
  );
};

const Radio = withStyles((theme: Theme) => createStyles({}))(RadioBase);

export default Radio;
