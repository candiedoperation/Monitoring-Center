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
  Dialog, Portal, Button,
} from 'react-native-paper';
import { ScrollView } from 'native-base';
import WebView from 'react-native-webview';
import { fetchMiscKey } from '../controllers/StorageController';
import prodKeys from '../controllers/ProductionController';

const DonationModal = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [webViewURL, setWebViewURL] = React.useState(prodKeys.donatePage);
  const [modalTitle, setModalTitle] = React.useState('Donate');

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

  React.useEffect(() => {
    fetchMiscKey('@patreonData', (patreonData) => {
      if (patreonData != null) {
        // eslint-disable-next-line no-param-reassign
        setModalTitle('Choose a Donation Tier');
        setWebViewURL(prodKeys.donatePage);
      } else {
        setModalTitle('Link your Patreon Account');
        setWebViewURL(prodKeys.pateronAPILink);
      }
    });
  }, [visible]);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => { setVisible(false); }}
        contentContainerStyle={modalStyle}
      >
        <Dialog.Title>{modalTitle}</Dialog.Title>
        <Dialog.ScrollArea style={{ height: '85%', paddingLeft: 0, paddingRight: 0 }}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <WebView
              source={{ uri: webViewURL }}
              style={{ flex: 1 }}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState={false}
            />
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={() => { setVisible(false); }}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DonationModal;
