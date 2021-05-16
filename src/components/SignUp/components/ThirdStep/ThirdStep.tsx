import React, { FC, ReactNode, useState, useCallback } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import { tShirtSizes } from '../../../../constants';
import { useStores } from '../../../../store';

import Radio from '../../../common/Radio';
import SVGIcon from '../../../common/SVGIcon';
import Select from '../../../common/Select';
import TextField from '../../../common/TextField';
import DateInput from '../../../common/DateInput';
import FileInput from '../../../common/FileInput';
import MapSearch from '../../../common/MapSearch';
import Error from '../../../common/Error';

import styles from './ThirdStep.module.sass';

interface ThirdStepProps {
  handleChange: any;
  setErr: (err: any) => void;
  handleUpdateProfileFirstStep: () => {};
  uploadImage: (userId: string, options: any, size: any) => any;
  err: any;
  isLoading: boolean;
  children?: ReactNode;
}

export const ThirdStep: FC<ThirdStepProps> = (props) => {
  const { err, handleChange, isLoading, setErr, uploadImage, handleUpdateProfileFirstStep } = props;
  const { authStore } = useStores();
  const [isLicenseUpload, setIsLicenseUpload] = useState(false);
  const [isInsuranceUpload, setIsInsuranceUpload] = useState(false);

  const handleUploadImage = useCallback(
    (key: any) => async (evt: any) => {
      setErr({ ...err, [key]: '' });
      try {
        const size = null; // { width: 200, height: 200 };
        const file = evt.target.files[0];
        key === 'insurance' ? setIsInsuranceUpload(true) : setIsLicenseUpload(true);

        const { links, keys } = await uploadImage(authStore.get('sub'), file, size);
        authStore.set(key)({
          key: keys[0],
          preview: links[0]
        });
      } catch (error) {
        setErr({ ...err, [key]: 'Something went wrong. Please try to upload another picture.' });
      }
      key === 'insurance' ? setIsInsuranceUpload(false) : setIsLicenseUpload(false);
    },
    [authStore, err, setErr, uploadImage]
  );

  const renderInputThirdStep = () => {
    return (
      <div className={styles.inputWrapper}>
        <TextField
          classes={{ input: styles.input, root: styles.textField }}
          inputProps={{
            placeholder: 'Full Name',
            startAdornment: (
              <InputAdornment position="start">
                <SVGIcon name={'avatar'} />
              </InputAdornment>
            )
          }}
          value={authStore.get('fullName')}
          onChange={handleChange('fullName')}
        />
        {err.name || err.family_name ? <Error className={styles.error} value={err.name || err.family_name} /> : null}
        <DateInput
          className={classNames(styles.textField)}
          monthLabel={'Date of birth'}
          month={authStore.get('month')}
          year={authStore.get('year')}
          day={authStore.get('day')}
          onChangeMonth={handleChange('month')}
          onChangeYear={handleChange('year')}
          onChangeDay={handleChange('day')}
        />
        {err.month || err.year || err.day ? (
          <Error className={styles.error} value={err.month || err.year || err.day} />
        ) : null}
        <MapSearch handleClearError={() => setErr({ ...err, address: '', latitude: '', longitude: '' })} />
        {err.address ? <Error value={err.address} /> : null}
        {!err.address && (err.latitude || err.longitude) ? (
          <Error value={'Please, select an address from the proposed'} />
        ) : null}
        <Select
          value={authStore.get('tShirt')}
          onChange={handleChange('tShirt')}
          items={tShirtSizes}
          label={'T-Shirt Size'}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SVGIcon name={'tShirt'} className={styles.icon} />
              </InputAdornment>
            )
          }}
          IconComponent={() => <UnfoldMoreIcon style={{ height: '15px', width: '15px' }} />}
          classes={{
            root: styles.tShirtSelect,
            input: styles.input,
            selectLabel: styles.selectLabel
          }}
        />
        {err.tShirt ? <Error className={styles.error} value={err.tShirt} /> : null}
        <FileInput
          label={`Driver's License`}
          classes={{
            input: styles.fileRootInput,
            inputLabel: styles.fileLabel,
            root: classNames(styles.textField, styles.uploadInput)
          }}
          isLoading={isLicenseUpload}
          value={_.get(authStore.get('license'), 'preview')}
          imageShow={!!_.get(authStore.get('license'), 'key')}
          onChange={handleUploadImage('license')}
        />
        {err.license ? <Error className={styles.error} value={err.license} /> : null}
        <FileInput
          label={`Car Insurance Card`}
          // secondLabel={'Optional'}
          classes={{
            input: styles.fileRootInput,
            inputLabel: classNames(styles.fileLabel),
            root: classNames(styles.textField, styles.uploadInput)
          }}
          isLoading={isInsuranceUpload}
          value={_.get(authStore.get('insurance'), 'preview')}
          imageShow={!!_.get(authStore.get('insurance'), 'key')}
          onChange={handleUploadImage('insurance')}
        />
        {err.insurance ? <Error className={styles.error} value={err.insurance} /> : null}
        <Typography className={styles.answerBlock}>
          Have you ever worked for another delivery service (Insacart, Uber Eats, etc)?
          <Radio label={'Yes'} checked={authStore.get('isWorked')} onChange={handleChange('isWorked')} />
          <Radio label={'No'} checked={!authStore.get('isWorked')} onChange={handleChange('isWorked')} />
        </Typography>
      </div>
    );
  };

  return (
    <div className={styles.signUpForm}>
      <Typography className={styles.title}>Complete profile</Typography>
      {renderInputThirdStep()}
      {err.global ? <Error className={styles.error} value={err.global} /> : null}
      <Button
        className={styles.applyButton}
        variant="contained"
        color="secondary"
        disabled={isLoading}
        onClick={handleUpdateProfileFirstStep}
      >
        <Typography className={styles.buttonText}>Continue</Typography>
      </Button>
    </div>
  );
};
