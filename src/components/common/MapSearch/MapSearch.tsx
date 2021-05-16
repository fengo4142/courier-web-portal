import React, { useState } from 'react';
import classNames from 'classnames';
import GooglePlacesSuggest from 'react-google-places-suggest';
import GoogleMapLoader from 'react-google-maps-loader';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useStores } from '../../../store';
import SVGIcon from '../SVGIcon';
import TextField from '../TextField';

import styles from './MapSearch.module.sass';

export const MapSearch = ({ handleClearError }: { handleClearError: any }) => {
  const { authStore } = useStores();
  const [location, setLocation] = useState('');

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
    handleClearError();
  };

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
              classes={{ input: classNames(styles.input, styles.addressInput), root: styles.textField }}
              inputProps={{
                placeholder: 'Full Address',
                startAdornment: (
                  <InputAdornment position="start">
                    <SVGIcon name={'location'} />
                  </InputAdornment>
                )
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
