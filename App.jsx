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

/* eslint-disable react/style-prop-object */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import ApplicationInterface from './appsource/screens/ApplicationInterface';
import {
  navigationTheme, monitoringTheme, monitoringProTheme, navigationProTheme,
} from './appsource/themes/bubblegum';
import { fetchMiscKey } from './appsource/controllers/StorageController';
import prodKeys from './appsource/controllers/ProductionController';

export default function App() {
  const [donationLevel, setDonationLevel] = React.useState(0);

  function InitializeApplication() {
    fetchMiscKey('@patreonData', (patreonData) => {
      if (patreonData != null) {
        // eslint-disable-next-line no-param-reassign
        patreonData = JSON.parse(patreonData);

        axios.post(
          `${prodKeys.donationServer}/oauth/monitoring-center/license-status`,
          { email: patreonData.email },
        ).then((licenseStatus) => {
          setDonationLevel(licenseStatus.data.dLevel);
        }).catch(() => {
          fetchMiscKey('@dlevel', (dLevel) => {
            if (dLevel != null) setDonationLevel(dLevel);
          });
        });
      }
    });
  }

  InitializeApplication();

  return (
    <NativeBaseProvider>
      <PaperProvider theme={donationLevel > 1 ? monitoringProTheme : monitoringTheme}>
        <ApplicationInterface
          donationLevel={donationLevel}
          navigationtheme={donationLevel > 1 ? navigationProTheme : navigationTheme}
        />
      </PaperProvider>
      <StatusBar style="auto" backgroundColor={donationLevel > 1 ? monitoringProTheme.colors.primary : monitoringTheme.colors.primary} translucent={false} />
    </NativeBaseProvider>
  );
}
