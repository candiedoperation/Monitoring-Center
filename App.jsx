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
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import ApplicationInterface from './appsource/screens/ApplicationInterface';
import {
  navigationTheme, monitoringTheme, monitoringProTheme, navigationProTheme,
} from './appsource/themes/bubblegum';
import DonationModal from './appsource/components/DonationModal';
import { fetchMiscKey, setMiscKey } from './appsource/controllers/StorageController';
import prodKeys from './appsource/controllers/ProductionController';

export default function App() {
  const [donationLevel, setDonationLevel] = React.useState();
  const DonationModalReference = React.useRef();

  function handleDonationModalRequest() {
    DonationModalReference.current.requestModalVisibility();
  }

  function InitializeApplication() {
    /* Seamless Switch */
    fetchMiscKey('@dlevel', (dLevel) => {
      if (dLevel != null) setDonationLevel(+dLevel);
    });

    fetchMiscKey('@patreonData', (patreonData) => {
      if (patreonData != null) {
        // eslint-disable-next-line no-param-reassign
        patreonData = JSON.parse(patreonData);
        axios.post(
          `${prodKeys.donationServer}/oauth/monitoring-center/license-status`,
          { userId: patreonData.userId },
        ).then((licenseStatus) => {
          setMiscKey('@dlevel', licenseStatus.data.dLevel.toString(), () => {
            setDonationLevel(licenseStatus.data.dLevel);
          });
        }).catch((error) => {
          console.error(error);
        });
      } else {
        setMiscKey('@dlevel', '0', () => {
          setDonationLevel(0);
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
          donationModalRequest={handleDonationModalRequest}
          navigationtheme={donationLevel > 1 ? navigationProTheme : navigationTheme}
        />

        {/* Universal Modals */}
        <DonationModal
          ref={DonationModalReference}
        />
      </PaperProvider>
      <StatusBar style="auto" backgroundColor={donationLevel > 1 ? monitoringProTheme.colors.primary : monitoringTheme.colors.primary} translucent={false} />
    </NativeBaseProvider>
  );
}
