import React, { FC } from 'react';
import uuid from 'uuid/v4';
import classNames from 'classnames';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputBaseProps } from '@material-ui/core/InputBase';
import { colors, fontSizes } from '../../../theme';
import { SelectItem } from '../../../types';
import Input from '../Input';

interface IStyles {
  classes: {
    root: string;
    input: string;
    selectLabel: string;
    visibleLabel: string;
    inputRoot: string;
    disabled: string;
  };
}

export type SelectFieldProps = SelectProps &
  InputBaseProps & {
    id?: string;
    label?: string;
    value: unknown;
    items: SelectItem;
  } & { onChange: any };

const SelectFieldBase: FC<SelectFieldProps & IStyles> = (props) => {
  const { classes, id, label, value, className, IconComponent, MenuProps, onChange, inputProps, items } = props;
  const selectId = id || `id-${uuid()}`;
  return (
    <FormControl className={classes.root}>
      <InputLabel classes={{ formControl: classNames(classes.selectLabel, { [classes.visibleLabel]: value === '' }) }}>
        {label}
      </InputLabel>
      <Select
        id={selectId}
        labelId={selectId}
        className={className}
        onChange={onChange}
        IconComponent={IconComponent}
        {...(MenuProps as SelectProps)}
        value={value}
        input={
          <Input
            {...(inputProps as InputBaseProps)}
            classes={{
              root: classNames(classes.input, { [classes.disabled]: value === '' }),
              input: classes.inputRoot
            }}
          />
        }
      >
        {items &&
          items.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

const SelectField = withStyles((theme: Theme) =>
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
    selectLabel: {
      position: 'relative',
      transform: 'none',
      color: colors.label,
      '&.Mui-focused': {
        color: colors.label
      },
      fontSize: fontSizes.table,
      fontWeight: theme.typography.fontWeightMedium,
      marginBottom: 9,
      pointerEvents: 'none'
    },
    visibleLabel: {
      zIndex: 1
    },
    inputRoot: {
      width: '100%'
    },
    disabled: {
      color: '#c9c9c9'
    }
  })
)(SelectFieldBase);

export default SelectField;
