import React, { FC, useState } from 'react';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import Typography from '@material-ui/core/Typography';
import SVGIcon from '../SVGIcon';
import TextField from '../TextField';
import Select from '../Select';
import { months } from '../../../constants';

import styles from './DateInput.module.sass';

interface IStyles {
  className?: string;
  onChangeMonth: any;
  onChangeYear: any;
  onChangeDay: any;
  year: string;
  day: string;
  month: string;
  monthLabel: string;
}

export const DateInput: FC<IStyles> = (props) => {
  const { className, onChangeMonth, onChangeYear, onChangeDay, year, day, month, monthLabel } = props;
  const [inputValue, setInputValue] = useState<string>(month);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInputValue(event.target.value as string);
    onChangeMonth(event);
  };

  return (
    <>
      <Typography className={styles.monthLabel}>{monthLabel}</Typography>
      <div className={classNames(styles.dateWrapper, className)}>
        <Select
          value={inputValue}
          onChange={handleChange}
          label={'Month'}
          items={months}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SVGIcon name={'calendar'} className={styles.icon} />
              </InputAdornment>
            )
          }}
          IconComponent={() => <UnfoldMoreIcon style={{ height: '15px', width: '15px' }} />}
          classes={{ input: styles.input, selectLabel: styles.selectLabel }}
          className={styles.monthSelect}
        />
        <TextField
          classes={{
            input: styles.input,
            root: styles.textField
          }}
          inputProps={{
            placeholder: 'Day',
            type: 'number'
          }}
          value={day}
          onChange={onChangeDay}
        />
        <TextField
          classes={{
            input: styles.input,
            root: styles.textField
          }}
          inputProps={{
            placeholder: 'Year',
            type: 'number'
          }}
          value={year}
          onChange={onChangeYear}
        />
      </div>
    </>
  );
};
