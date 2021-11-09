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

import React from 'react';
import {
  Dialog, Portal, Button, Provider, Title, Caption,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'native-base';
import { computerDisplayTheme } from '../themes/bubblegum';
import { monitoringTheme } from '../themes/bubblegum';

const FeatureGenericModal = React.forwardRef((props, ref) => {
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

  return (
    <Provider theme={monitoringTheme}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => { setVisible(false); }}
          contentContainerStyle={modalStyle}
        >
          <Dialog.Title>{modalTitle}</Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: '90%' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: "90%" }}>
              <FastImage
                style={{ width: 100, height: 100 }}
                source={computerDisplayTheme.underConstruction}
              />
              <Title style={{ textAlign: 'center' }}>This Page is Under Construction</Title>
              <Caption style={{ textAlign: 'center' }}>This Version of Monitoring Center is a Pre Release for Testing</Caption>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => { setVisible(false); }}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
});

export default FeatureGenericModal;
