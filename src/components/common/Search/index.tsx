import React, { FC } from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { InputBaseProps } from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import uuid from 'uuid/v4';
import SVGIcon from '../SVGIcon';
import Input from '../Input';

interface IStyles {
  classes: {
    root: string;
    input: string;
    inputRoot: string;
  };
}

export type SearchProps = InputBaseProps & {
  id?: string;
};

const SearchBase: FC<SearchProps & IStyles> = (props) => {
  const { classes, id, inputProps, onChange } = props;
  const inputId = id || `id-${uuid()}`;

  return (
    <FormControl className={classes.root}>
      <Input
        {...(inputProps as InputBaseProps)}
        id={inputId}
        placeholder={'Search...'}
        endAdornment={
          <InputAdornment position="start">
            <SVGIcon name={'search'} style={{ minWidth: '14px', height: '14px' }} />
          </InputAdornment>
        }
        onChange={onChange}
        classes={{ root: classes.input, input: classes.inputRoot }}
      />
    </FormControl>
  );
};

const Search = withStyles((theme: Theme) =>
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
    inputRoot: {
      width: '100%'
    }
  })
)(SearchBase);

export default Search;
