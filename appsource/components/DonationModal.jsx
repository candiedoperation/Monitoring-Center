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
  Title, Caption, Snackbar,
} from 'react-native-paper';
import { ScrollView } from 'native-base';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import FastImage from 'react-native-fast-image';
import { fetchMiscKey, setMiscKey } from '../controllers/StorageController';
import prodKeys from '../controllers/ProductionController';
import { computerDisplayTheme } from '../themes/bubblegum';

const DonationModal = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('Donate');
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);

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

  function parseQueryURL(queryURL) {
    const paramsJSON = {};
    let strippedQueryURL = queryURL.split('/').pop();

    strippedQueryURL = strippedQueryURL
      .substring(
        (strippedQueryURL.indexOf('?') + 1),
        strippedQueryURL.length,
      )
      .split('&');

    strippedQueryURL.forEach((parameter) => {
      // eslint-disable-next-line prefer-destructuring
      paramsJSON[parameter.split('=')[0]] = parameter.split('=')[1];
    });

    return paramsJSON;
  }

  React.useEffect(() => {
    fetchMiscKey('@patreonData', (patreonData) => {
      setTimeout(() => {
        if (patreonData != null) {
          // eslint-disable-next-line no-param-reassign
          setModalTitle('Choose a Donation Tier');
          if (visible) {
            InAppBrowser
              .isAvailable()
              .then(() => {
                InAppBrowser.open(prodKeys.donatePage, {
                  enableDefaultShare: false,
                  forceCloseOnRedirection: false,
                }).then((response) => {
                  // Check with Donations Server
                  setVisible(false);
                }).catch((err) => { console.error(err); });
              });
          }
        } else {
          setModalTitle('Link your Patreon Account');
          if (visible) {
            InAppBrowser
              .isAvailable()
              .then(() => {
                InAppBrowser.openAuth(prodKeys.pateronAPILink, prodKeys.appSchemeURL, {
                  enableDefaultShare: false,
                  forceCloseOnRedirection: false,
                }).then((response) => {
                  if (response.type === 'success' && response.url) {
                    setMiscKey('@patreonData', JSON.stringify(parseQueryURL(response.url)), () => {
                      setVisible(false);
                      setVisible(true);
                    });
                  } else {
                    // eslint-disable-next-line no-alert
                    setVisible(false);
                    setSnackBarVisible(true);
                  }
                });
              });
          }
        }
      }, 700);
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
        <Dialog.ScrollArea style={{ maxHeight: '85%' }}>
          <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '85%' }}>
            <FastImage
              style={{ width: 100, height: 100, marginBottom: 10 }}
              source={computerDisplayTheme.externalConnect}
            />
            <Title style={{ textAlign: 'center' }}>Connecting You to Patreon</Title>
            <Caption style={{ textAlign: 'center' }}>Please Wait while You're being securely connected to Patreon</Caption>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={() => { setVisible(false); }}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => { setSnackBarVisible(false); }}
        action={{
          label: 'Try Again',
          onPress: () => {
            setVisible(true);
          },
        }}
      >
        Error Linking App to Patreon
      </Snackbar>
    </Portal>
  );
});

export default DonationModal;
