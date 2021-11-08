/* eslint-disable global-require */
import { DefaultTheme as NavigatorDefaultTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

const monitoringTheme = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#bc245d',
    accent: '#8a715e',
  },
};

const frameBufferTheme = {
  ...monitoringTheme,
  colors: {
    primary: '#000000',
    backdrop: '#000000',
  },
};

const navigationTheme = {
  ...NavigatorDefaultTheme,
  colors: {
    ...NavigatorDefaultTheme.colors,
    primary: '#bc245d',
  },
};

const serviceStatus = {
  serviceActive: '#3a9104',
  serviceDisabled: '#a10705',
};

const computerDisplayTheme = {
  displayInderminate: require('./indeterminateDisplay.png'),
  frameBufferIndeterminate: require('./indeterminateFrame.png'),
};

export {
  monitoringTheme, navigationTheme, computerDisplayTheme, frameBufferTheme, serviceStatus,
};
