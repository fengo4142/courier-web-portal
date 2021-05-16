import React, { FC } from 'react';
import MuiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, Theme, withStyles } from '@material-ui/core';

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <rect width="21" height="21" x=".5" y=".5" fill="#FFF" fillRule="evenodd" stroke="#CFCFE1" rx="3" />
  </svg>
);

const checkedIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <g fill="none" fillRule="evenodd">
      <rect width="22" height="22" fill="#006cf0" rx="3" />
      <path stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8l-6.875 6L6 11.273" />
    </g>
  </svg>
);

const CheckboxBase: FC<CheckboxProps & { label?: string; className?: string }> = (props) => {
  const { label, className } = props;
  return (
    <FormControlLabel
      className={className}
      control={
        <MuiCheckbox {...props} color="primary" icon={icon} checkedIcon={checkedIcon} indeterminateIcon={icon} />
      }
      label={label}
    />
  );
};

const Checkbox = withStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      width: '22px',
      height: '22px'
    }
  })
)(CheckboxBase);

export default Checkbox;
