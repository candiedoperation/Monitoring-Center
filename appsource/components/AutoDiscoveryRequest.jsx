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

/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dialog, Portal, Button, Provider, Title, Caption,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'native-base';
import { computerDisplayTheme, monitoringTheme } from '../themes/bubblegum';
import { fetchMiscKey } from '../controllers/StorageController';

const AddonFeaturePage = () => (
  <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '90%' }}>
    <FastImage
      style={{ width: 100, height: 100 }}
      source={computerDisplayTheme.underConstruction}
    />
    <Title style={{ textAlign: 'center' }}>This is an Addon Feature</Title>
    <Caption style={{ textAlign: 'center' }}>Addon Features in Monitoring Center can be Unlocked by Tier 3 Donations</Caption>
  </ScrollView>
);

const AddonAvailableFeaturePage = () => (
  <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '90%' }}>
    <FastImage
      style={{ width: 100, height: 100 }}
      source={computerDisplayTheme.underConstruction}
    />
    <Title style={{ textAlign: 'center' }}>Thank You for Donating!</Title>
    <Caption style={{ textAlign: 'center' }}>Auto Discovery Feature has been Enabled. You can Discover Veyon Servers in your Network by using the Discover Computers Button.</Caption>
  </ScrollView>
);

const AutoDiscoveryRequest = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    requestModalVisibility() {
      setVisible(true);
    },
  }));

  const modalStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
  };

  function requestDonation() {

  }

  function handleManualAddition() {
    props.manualAdd();
    setVisible(false);
  }

  function handleAutoAddition() {
    (props.donationLevel > 2 ? props.autoAdd() : requestDonation());
    setVisible(false);
  }

  React.useEffect(() => {
    /* fetchMiscKey('@license', (licenseKey) => {
      if (licenseKey == null || licenseKey.trim() === '') {
        setHasDonated(false);
      } else {
        setHasDonated(true);
      }
    }); */
  }, []);

  return (
    <Provider theme={props.theme}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => { setVisible(false); }}
          contentContainerStyle={modalStyle}
        >
          <Dialog.Title>Auto Discovery Feature</Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: '90%' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '90%' }}>
              {props.donationLevel > 2 ? <AddonAvailableFeaturePage /> : <AddonFeaturePage />}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button
              mode="outlined"
              onPress={handleManualAddition}
            >
              Add Manually
            </Button>
            <Button
              mode="contained"
              onPress={handleAutoAddition}
              style={{ marginLeft: 5 }}
            >
              {props.donationLevel > 2 ? 'Discover Computers' : 'Donate'}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
});

export default AutoDiscoveryRequest;
