/*
    Monitoring Center
    Copyright (C) 2021  Atheesh Thirumalairajan

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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

const monitoringProTheme = {
  ...PaperDefaultTheme,
  roundness: 5,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#f9c440',
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

const navigationProTheme = {
  ...NavigatorDefaultTheme,
  colors: {
    ...NavigatorDefaultTheme.colors,
    primary: '#f9c440',
  },
};

const serviceStatus = {
  serviceActive: '#3a9104',
  serviceDisabled: '#a10705',
};

const computerDisplayTheme = {
  displayInderminate: require('./indeterminateDisplay.png'),
  frameBufferIndeterminate: require('./indeterminateFrame.png'),
  underConstruction: require('./constructionBoard.png'),
  donateRequest: require('./donateRequest.png'),
  externalConnect: require('./connectExternal.png'),
};

export {
  monitoringTheme, monitoringProTheme, navigationTheme, navigationProTheme, computerDisplayTheme, frameBufferTheme, serviceStatus,
};
