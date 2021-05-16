import React, { FC, useState, ReactNode } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useStores } from '../../../../store';

import SVGIcon from '../../../common/SVGIcon';
import TextField from '../../../common/TextField';
import FileInput from '../../../common/FileInput';
import Error from '../../../common/Error';

import styles from './FourthStep.module.sass';

interface FourthStepProps {
  handleChange: any;
  handleChangeStep: any;
  setErr: (err: any) => void;
  handleUpdateProfileSecondStep: () => {};
  uploadImage: (userId: string, options: any, size: any) => any;
  err: any;
  isLoading: boolean;
  children?: ReactNode;
}

export const FourthStep: FC<FourthStepProps> = (props) => {
  const { err, handleChange, isLoading, setErr, uploadImage, handleChangeStep, handleUpdateProfileSecondStep } = props;
  const { authStore } = useStores();
  const [isFrontUpload, setIsFrontUpload] = useState(false);
  const [isBackUpload, setIsBackUpload] = useState(false);
  const [isLeftUpload, setIsLeftUpload] = useState(false);
  const [isRightUpload, setIsRightUpload] = useState(false);

  const handleUploadCarPhoto = (key: any) => async (evt: any) => {
    setErr({ ...err, [key]: '' });
    try {
      const size = null; // { width: 200, height: 200 };
      const file = evt.target.files[0];
      switch (key) {
        case 'front': {
          setIsFrontUpload(true);
          break;
        }
        case 'back': {
          setIsBackUpload(true);
          break;
        }
        case 'left': {
          setIsLeftUpload(true);
          break;
        }
        case 'right': {
          setIsRightUpload(true);
          break;
        }
        default:
          break;
      }
      const { links, keys } = await uploadImage(authStore.get('sub'), file, size);
      authStore.set('photosCar')({
        ...authStore.get('photosCar'),
        [key]: {
          key: keys[0],
          preview: links[0]
        }
      });
    } catch (error) {
      setErr({ ...err, [key]: 'Something went wrong. Please try to upload another picture.' });
    }
    switch (key) {
      case 'front': {
        setIsFrontUpload(false);
        break;
      }
      case 'back': {
        setIsBackUpload(false);
        break;
      }
      case 'left': {
        setIsLeftUpload(false);
        break;
      }
      case 'right': {
        setIsRightUpload(false);
        break;
      }
      default:
        break;
    }
  };

  const renderInputFourthStep = () => {
    return (
      <div className={styles.inputWrapper}>
        <div className={styles.carDetailsWrapper}>
          <div className={styles.makeInput}>
            <TextField
              classes={{ input: styles.input, root: classNames(styles.textField, styles.makeInput) }}
              inputProps={{
                placeholder: 'Make',
                startAdornment: (
                  <InputAdornment position="start">
                    <SVGIcon name={'car'} />
                  </InputAdornment>
                )
              }}
              value={authStore.get('make')}
              onChange={handleChange('make')}
            />
            {err.make ? <Error className={styles.error} value={err.make} /> : null}
          </div>
          <div className={styles.modelInput}>
            <TextField
              classes={{ input: styles.input, root: styles.textField }}
              inputProps={{ placeholder: 'Model' }}
              value={authStore.get('carModel')}
              onChange={handleChange('carModel')}
            />
            {err.carModel ? <Error className={styles.error} value={err.carModel} /> : null}
          </div>
          <div className={styles.yearInput}>
            <TextField
              classes={{ input: styles.input, root: classNames(styles.textField, styles.yearInput) }}
              inputProps={{ placeholder: 'Year', type: 'number' }}
              value={authStore.get('carYear')}
              onChange={handleChange('carYear')}
            />
            {err.carYear ? <Error className={styles.error} value={err.carYear} /> : null}
          </div>
        </div>
        <Typography className={styles.vehicleTitle}>Vehicle Photos</Typography>
        <Typography className={styles.vehicleSubtitle}>Formats required: jpg, jpeg or png</Typography>
        <FileInput
          label={`Front`}
          secondLabel={'Required'}
          classes={{
            input: styles.fileRootInput,
            inputLabel: styles.fileLabel,
            root: classNames(styles.textField, styles.uploadInput)
          }}
          inputProps={{ accept: '.png,jpeg,.jpg' }}
          isLoading={isFrontUpload}
          value={_.get(authStore.get('photosCar'), 'front.preview')}
          imageShow={!!_.get(authStore.get('photosCar'), 'front.key')}
          onChange={handleUploadCarPhoto('front')}
        />
        {err.front ? <Error className={styles.error} value={err.front} /> : null}
        <FileInput
          label={`Back`}
          secondLabel={'Required'}
          classes={{
            input: styles.fileRootInput,
            inputLabel: classNames(styles.fileLabel),
            root: classNames(styles.textField, styles.uploadInput)
          }}
          inputProps={{ accept: '.png,jpeg,.jpg' }}
          isLoading={isBackUpload}
          value={_.get(authStore.get('photosCar'), 'back.preview')}
          imageShow={!!_.get(authStore.get('photosCar'), 'back.key')}
          onChange={handleUploadCarPhoto('back')}
        />
        {err.back ? <Error className={styles.error} value={err.back} /> : null}
        <FileInput
          label={`Right Side`}
          secondLabel={'Required'}
          classes={{
            input: styles.fileRootInput,
            inputLabel: classNames(styles.fileLabel),
            root: classNames(styles.textField, styles.uploadInput)
          }}
          inputProps={{ accept: '.png,jpeg,.jpg' }}
          isLoading={isRightUpload}
          value={_.get(authStore.get('photosCar'), 'right.preview')}
          imageShow={!!_.get(authStore.get('photosCar'), 'right.key')}
          onChange={handleUploadCarPhoto('right')}
        />
        {err.right ? <Error className={styles.error} value={err.right} /> : null}
        <FileInput
          label={`Left Side`}
          secondLabel={'Required'}
          classes={{
            input: styles.fileRootInput,
            inputLabel: classNames(styles.fileLabel),
            root: classNames(styles.textField, styles.uploadInput)
          }}
          inputProps={{ accept: '.png,jpeg,.jpg' }}
          isLoading={isLeftUpload}
          value={_.get(authStore.get('photosCar'), 'left.preview')}
          imageShow={!!_.get(authStore.get('photosCar'), 'left.key')}
          onChange={handleUploadCarPhoto('left')}
        />
        {err.left ? <Error className={styles.error} value={err.left} /> : null}
      </div>
    );
  };

  return (
    <>
      <div onClick={handleChangeStep('third')}>
        <SVGIcon name={'backArrow'} className={styles.backArrowIcon} />
      </div>
      <div className={styles.signUpForm}>
        <Typography className={styles.title}>Confirm your car</Typography>
        {renderInputFourthStep()}
        {err.global ? <Error className={styles.error} value={err.global} /> : null}
        <Button
          className={styles.applyButton}
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleUpdateProfileSecondStep}
        >
          <Typography className={styles.buttonText}>Apply</Typography>
        </Button>
      </div>
    </>
  );
};
