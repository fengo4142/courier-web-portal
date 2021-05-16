import React, { FC } from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { InputBaseProps } from '@material-ui/core/InputBase';
import Input from '../Input';
import { colors, fontSizes } from '../../../theme';
import uuid from 'uuid/v4';

interface IStyles {
  classes: {
    root: string;
    input: string;
    inputLabel: string;
    inputRoot: string;
  };
}

export type TextFieldProps = InputBaseProps & {
  id?: string;
  label?: string;
};

const TextFieldBase: FC<TextFieldProps & IStyles> = (props) => {
  const { classes, id, label, inputProps, onChange, value } = props;
  const inputId = id || `id-${uuid()}`;

  return (
    <FormControl className={classes.root}>
      <InputLabel shrink htmlFor={inputId} classes={{ formControl: classes.inputLabel }}>
        {label}
      </InputLabel>
      <Input
        {...(inputProps as InputBaseProps)}
        id={inputId}
        value={value}
        onChange={onChange}
        classes={{ root: classes.input, input: classes.inputRoot }}
      />
    </FormControl>
  );
};

const TextField = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
      width: '100%'
    },
    input: {
      'label + &': {
        marginTop: '0 !important'
      }
    },
    inputLabel: {
      position: 'relative',
      transform: 'none',
      color: colors.label,
      '&.Mui-focused': {
        color: colors.label
      },
      fontSize: fontSizes.table,
      fontWeight: theme.typography.fontWeightMedium,
      marginBottom: 9
    },
    inputRoot: {
      width: '100%'
    }
  })
)(TextFieldBase);

export default TextField;
