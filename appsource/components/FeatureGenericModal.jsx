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

/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dialog, Portal, Button, Title, Caption,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'native-base';
import { computerDisplayTheme } from '../themes/bubblegum';

const FeatureGenericModal = React.forwardRef((props, ref) => {
  const hasDonated = (props.donationLevel > 1);
  const [visible, setVisible] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalID, setModalID] = React.useState('');
  const [connectionData, setConnectionData] = React.useState({});

  React.useImperativeHandle(ref, () => ({
    requestModalVisibility(featureID, featureData, internalConnectionData) {
      setModalTitle(featureData.name);
      setModalID(featureID);
      setConnectionData(internalConnectionData);
      setVisible(true);
    },
  }));

  const modalStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
  };

  const AddonFeaturePage = () => (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '90%' }}>
      <FastImage
        style={{ width: 100, height: 100 }}
        source={computerDisplayTheme.addonFeature}
      />
      <Title style={{ textAlign: 'center' }}>
        {modalTitle}
        {' '}
        is an Addon Feature
      </Title>
      <Caption style={{ textAlign: 'center' }}>
        {modalTitle}
        {' '}
        can be Unlocked by Tier 2 Donations
      </Caption>
    </ScrollView>
  );

  const AvailablFeaturePage = () => (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '90%' }}>
      <FastImage
        style={{ width: 100, height: 100 }}
        source={computerDisplayTheme.underConstruction}
      />
      <Title style={{ textAlign: 'center' }}>This Page is Under Construction</Title>
      <Caption style={{ textAlign: 'center' }}>This Version of Monitoring Center is a Pre Release for Testing</Caption>
    </ScrollView>
  );

  function handleDonateRequest() {
    props.donationModalRequest();
    setVisible(false);
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => { setVisible(false); }}
        contentContainerStyle={modalStyle}
      >
        <Dialog.Title>{modalTitle}</Dialog.Title>
        <Dialog.ScrollArea style={{ maxHeight: '80%' }}>
          {(hasDonated) ? <AvailablFeaturePage /> : <AddonFeaturePage />}
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button style={{ margin: 3 }} onPress={() => { setVisible(false); }}>Cancel</Button>
          <Button mode="contained" style={{ margin: 3, display: (hasDonated) ? 'none' : 'flex' }} onPress={handleDonateRequest}>Donate</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default FeatureGenericModal;
