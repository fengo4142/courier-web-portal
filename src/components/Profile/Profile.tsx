import React, { FC, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import GooglePlacesSuggest from 'react-google-places-suggest';
import GoogleMapLoader from 'react-google-maps-loader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import useUser from '../../hooks/useUser';
import { useStores } from '../../store';
import { decodeErrors } from '../../utils';
import { months, tShirtSizes } from '../../constants';

import SVGIcon from '../common/SVGIcon';
import TextField from '../common/TextField';
import FileInput from '../common/FileInput';
import Loading from '../common/Loading';
import Select from '../common/Select';
import Error from '../common/Error';
import PendingBlock from '../common/PendingBlock';

import styles from './Profile.module.sass';
import useAuth from '../../hooks/useAuth';

export const Profile: FC = () => {
  const user = useUser();
  const { setAuthUser } = useAuth();
  const [location, setLocation] = useState('');
  const { authStore } = useStores();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isPreviewUpload, setIsPreviewUpload] = useState(false);
  const [isLicenseUpload, setIsLicenseUpload] = useState(false);
  const [isInsuranceUpload, setIsInsuranceUpload] = useState(false);
  const [isFrontUpload, setIsFrontUpload] = useState(false);
  const [isBackUpload, setIsBackUpload] = useState(false);
  const [isLeftUpload, setIsLeftUpload] = useState(false);
  const [isRightUpload, setIsRightUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({
    email: '',
    password: '',
    phone_number: '',
    global: '',
    day: '',
    month: '',
    year: '',
    name: '',
    family_name: '',
    picture: '',
    address: '',
    license: '',
    insurance: '',
    make: '',
    carModel: '',
    carYear: '',
    front: '',
    back: '',
    left: '',
    right: '',
    tShirt: '',
    latitude: '',
    longitude: ''
  });

  const handleGoToEarning = () => {
    setIsUpdate(!isUpdate);
  };

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
      const { links, keys } = await user.uploadImage(authStore.get('sub'), file, size);
      authStore.set('photosCar')({ ...authStore.get('photosCar'), [key]: { key: keys[0], preview: links[0] } });
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

  const handleUploadImage = (key: any) => async (evt: any) => {
    setErr({ ...err, [key]: '', global: '' });
    try {
      const size = null; // { width: 200, height: 200 };
      const file = evt.target.files[0];
      switch (key) {
        case 'insurance':
          setIsInsuranceUpload(true);
          break;
        case 'license':
          setIsLicenseUpload(true);
          break;
        default:
          setIsPreviewUpload(true);
      }
      const { links, keys } = await user.uploadImage(authStore.get('sub'), file, size);
      authStore.set(key)({ key: keys[keys.length - 1], preview: links[links.length - 1] });
    } catch (error) {
      setErr({ ...err, [key]: 'Something went wrong. Please try to upload another picture.' });
    }
    switch (key) {
      case 'insurance':
        setIsInsuranceUpload(false);
        break;
      case 'license':
        setIsLicenseUpload(false);
        break;
      default:
        setIsPreviewUpload(false);
    }
  };

  const setAuth = useCallback(async () => {
    setAuthUser(user);
  }, [setAuthUser, user]);

  useEffect(() => {
    setAuth().catch();
    // eslint-disable-next-line
  }, []);

  const handleChange = (key: string) => (e: React.ChangeEvent<{ value: string }>) => {
    const { value } = e.target;
    switch (key) {
      case 'fullName':
        authStore.set('fullName')(value);
        break;
      case 'month':
        authStore.set('month')(value);
        break;
      case 'year':
        if (value.length > 4 || +value > new Date().getFullYear()) {
          return;
        }
        authStore.set('year')(value);
        break;
      case 'make':
        authStore.set('make')(value);
        break;
      case 'tShirt':
        authStore.set('tShirt')(value);
        break;
      case 'carModel':
        authStore.set('carModel')(value);
        break;
      case 'carYear':
        if (value.length > 4 || +value > new Date().getFullYear()) {
          return;
        }
        authStore.set('carYear')(value);
        break;
      case 'day':
        if (value.length > 2 || +value > 31) {
          return;
        }
        authStore.set('day')(value);
        break;
      default:
        break;
    }
    setErr({ ...err, [key]: '', global: '' });
    if (key === 'fullName') {
      setErr({ ...err, name: '', family_name: '' });
    }
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    const [name, familyName] = authStore.get('fullName').split(' ');
    try {
      const {
        day,
        month,
        year,
        address,
        latitude,
        longitude,
        license,
        insurance,
        picture,
        phone_number,
        make,
        carModel,
        carYear,
        photosCar,
        tShirt
      } = authStore.getState();
      const newPhotoCar: any = {};
      newPhotoCar.front = photosCar.front.key;
      newPhotoCar.back = photosCar.back.key;
      newPhotoCar.left = photosCar.left.key;
      newPhotoCar.right = photosCar.right.key;
      const { data } = await user.updateProfile({
        day,
        month,
        year,
        address,
        latitude,
        longitude,
        license: license.key,
        insurance: insurance.key,
        name,
        picture: picture.key,
        phone_number,
        make,
        carModel,
        carYear,
        photosCar: newPhotoCar,
        tShirt,
        family_name: familyName
      });
      const userImages = await user.getUserImages();
      user.setUser({
        ...data,
        picture: { key: data.picture, preview: _.get(userImages, 'picture') },
        license: { key: data.license, preview: _.get(userImages, 'license') },
        insurance: { key: data.insurance, preview: _.get(userImages, 'insurance') },
        photosCar: {
          front: { key: _.get(data, 'photosCar.front'), preview: _.get(userImages, 'photosCar.front') },
          back: { key: _.get(data, 'photosCar.back'), preview: _.get(userImages, 'photosCar.back') },
          left: { key: _.get(data, 'photosCar.left'), preview: _.get(userImages, 'photosCar.left') },
          right: { key: _.get(data, 'photosCar.right'), preview: _.get(userImages, 'photosCar.right') }
        }
      });
      setIsUpdate(!isUpdate);
    } catch (error) {
      const errors = error.response.data;
      if (errors.message !== 'validation error') {
        setErr({ ...err, global: errors.message });
      } else {
        setErr({ ...err, ...decodeErrors(errors.details) });
      }
    }
    setIsLoading(false);
  };

  const handleChangeAddress = (address: string, longitude: string, latitude: string) => {
    authStore.set('address')(address);
    authStore.set('longitude')(longitude);
    authStore.set('latitude')(latitude);
  };

  const getLocation = (locationAddress: { lat: () => string; lng: () => string }) => {
    return {
      latitude: locationAddress.lat().toString(),
      longitude: locationAddress.lng().toString()
    };
  };

  const handleSelectSuggest = (geocodedPrediction: any) => {
    setLocation('');
    const locationAddress = getLocation(geocodedPrediction.geometry.location);
    handleChangeAddress(geocodedPrediction.formatted_address, locationAddress.longitude, locationAddress.latitude);
  };

  const handleChangeLocation = (e: React.ChangeEvent<{ value: string }>) => {
    setLocation(e.target.value);
    authStore.set('address')(e.target.value);
    setErr({ ...err, address: '', latitude: '', longitude: '' });
  };

  const renderMapSearch = () => {
    return (
      <GoogleMapLoader
        params={{
          key: process.env.REACT_APP_GOOGLE_KEY,
          libraries: 'places'
        }}
        className={styles.textField}
        render={(googleMaps: any) =>
          googleMaps && (
            <GooglePlacesSuggest
              googleMaps={googleMaps}
              autocompletionRequest={{
                input: location
              }}
              className={styles.map}
              onSelectSuggest={handleSelectSuggest}
              textNoResults="No results"
            >
              <TextField
                label={'Full Address'}
                classes={{
                  input: styles.input,
                  inputRoot: styles.inputRoot
                }}
                onChange={handleChangeLocation}
                value={authStore.get('address')}
              />
            </GooglePlacesSuggest>
          )
        }
      />
    );
  };

  const renderInput = () => {
    return (
      <>
        <div className={styles.twoInput}>
          <div className={styles.textField}>
            <TextField
              label={'Name'}
              classes={{
                input: styles.input,
                inputRoot: styles.inputRoot,
                root: styles.textField
              }}
              value={authStore.get('fullName')}
              onChange={handleChange('fullName')}
            />
            {err.name || err.family_name ? <Error value={err.name || err.family_name} /> : null}
          </div>
          <div className={styles.textField}>
            <div className={styles.dateInput}>
              <Select
                value={authStore.get('month')}
                onChange={handleChange('month')}
                label={'Date of birth'}
                items={months}
                IconComponent={() => <ArrowDropDown style={{ height: '15px', width: '15px' }} />}
                classes={{ input: styles.input, selectLabel: styles.selectLabel, inputRoot: styles.inputRoot }}
                className={styles.monthSelect}
              />
              <TextField
                classes={{
                  input: styles.input,
                  inputRoot: classNames(styles.inputRoot, styles.textCenter)
                }}
                inputProps={{
                  type: 'number'
                }}
                value={authStore.get('day')}
                onChange={handleChange('day')}
              />
              <TextField
                classes={{
                  input: styles.input,
                  inputRoot: classNames(styles.inputRoot, styles.textCenter)
                }}
                inputProps={{
                  type: 'number'
                }}
                value={authStore.get('year')}
                onChange={handleChange('year')}
              />
            </div>
            {err.month || err.year || err.day ? <Error value={err.month || err.year || err.day} /> : null}
          </div>
        </div>
        <div className={styles.twoInput}>
          <div className={styles.textField}>
            <TextField
              label={'Contact email'}
              classes={{
                input: styles.input,
                inputRoot: styles.inputRoot,
                root: styles.textField
              }}
              inputProps={{
                disabled: true
              }}
              value={authStore.get('email')}
            />
            {err.email ? <Error value={err.email} /> : null}
          </div>
          <div className={styles.textField}>
            <TextField
              label={'Contact phone number'}
              classes={{
                input: styles.input,
                inputRoot: styles.inputRoot,
                root: styles.textField
              }}
              inputProps={{
                disabled: true
              }}
              value={authStore.get('phone_number')}
            />
          </div>
          {err.phone_number ? <Error value={err.phone_number} /> : null}
        </div>
        {renderMapSearch()}
        {err.address ? <Error value={err.address} /> : null}
        {!err.address && (err.latitude || err.longitude) ? (
          <Error value={'Please, select an address from the proposed'} />
        ) : null}
        <Select
          value={authStore.get('tShirt')}
          onChange={handleChange('tShirt')}
          items={tShirtSizes}
          label={'T-shirt size'}
          IconComponent={() => <ArrowDropDown style={{ height: '15px', width: '15px' }} />}
          classes={{ input: styles.input, selectLabel: styles.tShirtLabel, inputRoot: styles.inputRoot }}
          className={styles.tShirtSelect}
        />
        {err.tShirt ? <Error value={err.tShirt} /> : null}
      </>
    );
  };

  const renderVehicleInfo = () => {
    return (
      <div className={styles.vehicleInfo}>
        <Typography className={styles.title}>Vehicle information</Typography>
        <div className={styles.carInfo}>
          <div className={styles.textField}>
            <TextField
              label={'Make'}
              classes={{
                input: styles.input,
                inputRoot: styles.inputRoot,
                root: styles.textField
              }}
              value={authStore.get('make')}
              onChange={handleChange('make')}
            />
            {err.make ? <Error value={err.make} /> : null}
          </div>
          <div className={classNames(styles.textField, styles.carModelInput)}>
            <TextField
              label={'Model'}
              classes={{
                input: styles.input,
                inputRoot: styles.inputRoot,
                root: styles.textField
              }}
              value={authStore.get('carModel')}
              onChange={handleChange('carModel')}
            />
            {err.carModel ? <Error value={err.carModel} /> : null}
          </div>
          <div className={classNames(styles.textField, styles.yearInput)}>
            <TextField
              label={'Year'}
              classes={{
                input: styles.input,
                inputRoot: styles.inputRoot,
                root: styles.textField
              }}
              inputProps={{ type: 'number' }}
              value={authStore.get('carYear')}
              onChange={handleChange('carYear')}
            />
            {err.carYear ? <Error value={err.carYear} /> : null}
          </div>
        </div>
        <div className={styles.documents}>
          <div className={styles.document}>
            <div className={styles.documentTitle}>
              <Typography className={styles.subtitle}>Front</Typography>
            </div>
            <div
              className={
                authStore.get('photosCar').front.preview
                  ? classNames(styles.documentPhoto, styles.isPhoto)
                  : styles.documentPhoto
              }
            >
              {isFrontUpload ? (
                <Loading />
              ) : authStore.get('photosCar').front.preview ? (
                <img
                  style={{ maxHeight: '160px', maxWidth: '292px', borderRadius: '10px' }}
                  src={authStore.get('photosCar').front.preview}
                  alt="Car front"
                />
              ) : (
                <SVGIcon name={'uploadPhoto'} className={styles.uploadIcon} />
              )}
            </div>
            <FileInput
              label={authStore.get('photosCar').front.preview ? `Change photo` : `Upload Photo`}
              classes={{
                input: styles.fileRootInput,
                inputLabel: styles.fileLabel,
                fileIcon: styles.fileIcon
              }}
              inputProps={{ accept: '.png,jpeg,.jpg' }}
              value={authStore.get('photosCar').front.preview}
              onChange={handleUploadCarPhoto('front')}
            />
            {err.front ? <Error className={styles.error} value={err.front} /> : null}
          </div>
          <div className={styles.document}>
            <div className={styles.documentTitle}>
              <Typography className={styles.subtitle}>Back</Typography>
            </div>
            <div
              className={
                authStore.get('photosCar').back.preview
                  ? classNames(styles.documentPhoto, styles.isPhoto)
                  : styles.documentPhoto
              }
            >
              {isBackUpload ? (
                <Loading />
              ) : authStore.get('photosCar').back.preview ? (
                <img
                  style={{ maxHeight: '160px', maxWidth: '292px', borderRadius: '10px' }}
                  src={authStore.get('photosCar').back.preview}
                  alt="Car back"
                />
              ) : (
                <SVGIcon name={'uploadPhoto'} className={styles.uploadIcon} />
              )}
            </div>
            <FileInput
              label={authStore.get('photosCar').back.preview ? `Change photo` : `Upload Photo`}
              classes={{
                input: styles.fileRootInput,
                inputLabel: styles.fileLabel,
                fileIcon: styles.fileIcon
              }}
              inputProps={{ accept: '.png,jpeg,.jpg' }}
              value={authStore.get('photosCar').back.preview}
              onChange={handleUploadCarPhoto('back')}
            />
            {err.back ? <Error className={styles.error} value={err.back} /> : null}
          </div>
        </div>
        <div className={styles.documents}>
          <div className={styles.document}>
            <div className={styles.documentTitle}>
              <Typography className={styles.subtitle}>Left Side</Typography>
            </div>
            <div
              className={
                authStore.get('photosCar').left.preview
                  ? classNames(styles.documentPhoto, styles.isPhoto)
                  : styles.documentPhoto
              }
            >
              {isLeftUpload ? (
                <Loading />
              ) : authStore.get('photosCar').left.preview ? (
                <img
                  style={{ maxHeight: '160px', maxWidth: '292px', borderRadius: '10px' }}
                  src={authStore.get('photosCar').left.preview}
                  alt="Car left"
                />
              ) : (
                <SVGIcon name={'uploadPhoto'} className={styles.uploadIcon} />
              )}
            </div>
            <FileInput
              label={authStore.get('photosCar').left.preview ? `Change photo` : `Upload Photo`}
              classes={{
                input: styles.fileRootInput,
                inputLabel: styles.fileLabel,
                fileIcon: styles.fileIcon
              }}
              inputProps={{ accept: '.png,jpeg,.jpg' }}
              value={authStore.get('photosCar').left.preview}
              onChange={handleUploadCarPhoto('left')}
            />
            {err.left ? <Error className={styles.error} value={err.left} /> : null}
          </div>
          <div className={styles.document}>
            <div className={styles.documentTitle}>
              <Typography className={styles.subtitle}>Right Side</Typography>
            </div>
            <div
              className={
                authStore.get('photosCar').right.preview
                  ? classNames(styles.documentPhoto, styles.isPhoto)
                  : styles.documentPhoto
              }
            >
              {isRightUpload ? (
                <Loading />
              ) : authStore.get('photosCar').right.preview ? (
                <img
                  style={{ maxHeight: '160px', maxWidth: '292px', borderRadius: '10px' }}
                  src={authStore.get('photosCar').right.preview}
                  alt="Car right"
                />
              ) : (
                <SVGIcon name={'uploadPhoto'} className={styles.uploadIcon} />
              )}
            </div>
            <FileInput
              label={authStore.get('photosCar').right.preview ? `Change photo` : `Upload Photo`}
              classes={{
                input: styles.fileRootInput,
                inputLabel: styles.fileLabel,
                fileIcon: styles.fileIcon
              }}
              inputProps={{ accept: '.png,jpeg,.jpg' }}
              value={authStore.get('photosCar').right.preview}
              onChange={handleUploadCarPhoto('right')}
            />
            {err.right ? <Error className={styles.error} value={err.right} /> : null}
          </div>
        </div>
      </div>
    );
  };

  const renderProfileSettings = () => (
    <div className={styles.profileSettings}>
      <Typography className={styles.title}>Profile Settings</Typography>
      {renderInput()}
      <div className={styles.documents}>
        <div className={styles.document}>
          <div className={styles.documentTitle}>
            <Typography className={styles.subtitle}>Driver's License</Typography>
            <Typography className={styles.option}>Required</Typography>
          </div>
          <div
            className={
              authStore.get('license').preview ? classNames(styles.documentPhoto, styles.isPhoto) : styles.documentPhoto
            }
          >
            {isLicenseUpload ? (
              <Loading />
            ) : authStore.get('license').preview ? (
              <img
                style={{ maxHeight: '160px', maxWidth: '292px', borderRadius: '10px' }}
                src={authStore.get('license').preview}
                alt="License"
              />
            ) : (
              <SVGIcon name={'uploadPhoto'} className={styles.uploadIcon} />
            )}
          </div>
          <FileInput
            label={authStore.get('license').preview ? `Change photo` : `Upload Photo`}
            classes={{
              input: styles.fileRootInput,
              inputLabel: styles.fileLabel,
              fileIcon: styles.fileIcon
            }}
            value={authStore.get('license').preview}
            onChange={handleUploadImage('license')}
          />
          {err.license ? <Error className={styles.error} value={err.license} /> : null}
        </div>
        <div className={styles.document}>
          <div className={styles.documentTitle}>
            <Typography className={styles.subtitle}>Car Insurance Card</Typography>
            <Typography className={styles.option}>Optional</Typography>
          </div>
          <div
            className={
              authStore.get('insurance').preview
                ? classNames(styles.documentPhoto, styles.isPhoto)
                : styles.documentPhoto
            }
          >
            {isInsuranceUpload ? (
              <Loading />
            ) : authStore.get('insurance').preview ? (
              <img
                style={{ maxHeight: '160px', maxWidth: '292px', borderRadius: '10px' }}
                src={authStore.get('insurance').preview}
                alt="Insurance"
              />
            ) : (
              <SVGIcon name={'uploadPhoto'} className={styles.uploadIcon} />
            )}
          </div>
          <FileInput
            label={authStore.get('insurance').preview ? `Change photo` : `Upload Photo`}
            classes={{
              input: styles.fileRootInput,
              inputLabel: styles.fileLabel,
              fileIcon: styles.fileIcon
            }}
            value={authStore.get('insurance').preview}
            onChange={handleUploadImage('insurance')}
          />
          {err.insurance ? <Error className={styles.error} value={err.insurance} /> : null}
        </div>
      </div>
      {renderVehicleInfo()}
      <div className={styles.updateButtonWrapper}>
        <Button
          className={styles.updateButton}
          variant="contained"
          color="secondary"
          disabled={isLoading}
          onClick={handleUpdateProfile}
        >
          <Typography>Update Information</Typography>
        </Button>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className={styles.uploadPhoto}>
      <div className={styles.photo}>
        {isPreviewUpload ? (
          <Loading />
        ) : authStore.get('picture').preview ? (
          <span className={styles.picture} style={{ backgroundImage: `url(${authStore.get('picture').preview})` }} />
        ) : (
          <SVGIcon name={'uploadPhoto'} className={styles.uploadIcon} />
        )}
      </div>
      <FileInput
        label={authStore.get('picture').preview ? `Change photo` : `Upload Photo`}
        classes={{
          input: styles.fileRootInput,
          inputLabel: classNames(styles.fileLabel, styles.picture),
          fileIcon: styles.fileIcon
        }}
        value={authStore.get('picture').preview}
        onChange={handleUploadImage('picture')}
      />
      {err.picture ? <Error className={styles.error} value={err.picture} /> : null}
    </div>
  );

  const renderPendingBlock = () => {
    return (
      <div className={styles.pendingBlock}>
        <SVGIcon name="doneNotes" className={styles.bigIcon} />
        <Typography className={styles.title}>Your request is pending</Typography>
        <Typography className={styles.subtitle}>
          We will update your profile once we have reviewed your application
        </Typography>
        <Button className={styles.okButton} variant="outlined" color="secondary" onClick={handleGoToEarning}>
          <Typography>Ok</Typography>
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.mainContent}>
      {isUpdate ? (
        renderPendingBlock()
      ) : (
        <>
          {user.status !== 'ACTIVE' ? <PendingBlock className={styles.pendingHeaderBlock} /> : null}
          <div className={styles.profile}>
            {renderUpload()}
            {renderProfileSettings()}
          </div>
        </>
      )}
    </div>
  );
};
