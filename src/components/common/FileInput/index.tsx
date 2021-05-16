import React, { FC } from 'react';
import uuid from 'uuid/v4';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { InputBaseProps } from '@material-ui/core/InputBase';
import Input from '../Input';
import SVGIcon from '../SVGIcon';
import Loading from '../Loading';

import { colors, fontSizes } from '../../../theme';

interface IStyles {
  classes: {
    root: string;
    input: string;
    inputLabel: string;
    inputRoot: string;
    fileIcon: string;
    optional: string;
    img: string;
  };
}

export type FileFieldProps = InputBaseProps & {
  id?: string;
  label?: string;
  secondLabel?: string;
  imageShow?: boolean;
  value: any;
  isLoading?: boolean;
};

const FileFieldBase: FC<FileFieldProps & IStyles> = (props) => {
  const { classes, id, label, inputProps, onChange, value, secondLabel, imageShow, isLoading } = props;
  const inputId = id || `id-${uuid()}`;
  return (
    <FormControl className={classes.root}>
      <InputLabel shrink htmlFor={inputId} classes={{ formControl: classes.inputLabel }}>
        <SVGIcon name={'upload'} className={classes.fileIcon} />
        {label}
        <Input
          inputProps={inputProps}
          id={inputId}
          type={'file'}
          onChange={onChange}
          classes={{ root: classes.input, input: classes.inputRoot }}
        />
      </InputLabel>
      {isLoading ? (
        <Loading />
      ) : imageShow ? (
        <img src={value} alt="empty" className={classes.img} />
      ) : (
        <Typography className={classes.optional}>{secondLabel}</Typography>
      )}
    </FormControl>
  );
};

const FileField = withStyles((theme: Theme) =>
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
    },
    fileIcon: {
      marginRight: '5px'
    },
    optional: {
      marginBottom: '9px',
      fontSize: fontSizes.table,
      color: '#999999'
    },
    img: {
      padding: '0 10px 20px',
      maxWidth: '50%',
      width: '100%'
    }
  })
)(FileFieldBase);

export default FileField;
