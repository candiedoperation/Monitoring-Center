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

/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, ScrollView } from 'native-base';
import {
  List, Portal, Dialog, Button, Paragraph, Snackbar, Title, Caption,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { getVersion } from 'react-native-device-info';
import { computerDisplayTheme } from '../themes/bubblegum';
import { deleteStorageKey, fetchMiscKey } from '../controllers/StorageController';
import AuthKeyManager from '../components/AuthKeyManager';

const SettingsScreen = (props) => {
  const [patreonDesc, setPatreonDesc] = React.useState('App is Not Connected to Patreon');
  const [isPatreonConnected, setPatreonConnected] = React.useState(false);
  const [patreonSignOutVisible, setPatreonSignOutVisible] = React.useState(false);
  const [lockedModalTitle, setLockedModalTitle] = React.useState('');
  const [lockedModalTier, setLockedModalTier] = React.useState(0);
  const [lockedModalVisible, setLockedModalVisible] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const AuthKeyManagerReference = React.useRef();

  const PatreonActionDialog = () => {
    function handleDeleteAction() {
      setPatreonSignOutVisible(false);
      deleteStorageKey('@patreonData', () => {
        setPatreonConnected(false);
        setPatreonDesc('App is Not Connected to Patreon');
      }, () => {
        // eslint-disable-next-line no-alert
        alert('Failed to Unlink Patreon Account');
      });
    }

    return (
      <Portal>
        <Dialog
          visible={patreonSignOutVisible}
          onDismiss={() => { setPatreonSignOutVisible(false); }}
        >
          <Dialog.Title>{isPatreonConnected === true ? 'Unlink Patreon Account' : 'Link Patreon Account'}</Dialog.Title>
          <Dialog.Content>
            {isPatreonConnected === true ? (
              <Paragraph>
                Your Donation Information is Linked to your Patreon Account.
                Your Donations will remain saved in your Patreon Account but,
                You will lose perks in the app until you sign in again.
              </Paragraph>
            )
              : (
                <Paragraph>
                  You Can Link Your Patreon Account by Clicking the Donate Button
                  in the About Application Page.
                </Paragraph>
              )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={{ margin: 3, display: (isPatreonConnected === true ? 'flex' : 'none') }} mode="outlined" onPress={handleDeleteAction}>Unlink Account</Button>
            <Button style={{ margin: 3 }} mode="contained" onPress={() => { setPatreonSignOutVisible(false); }}>{(isPatreonConnected === true ? 'Cancel' : 'Done')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  const LockedModal = () => {
    function handleLockedDonation() {
      setLockedModalVisible(false);
      props.donationModalRequest();
    }

    return (
      <Portal>
        <Dialog
          visible={lockedModalVisible}
          onDismiss={() => { setPatreonSignOutVisible(false); }}
        >
          <Dialog.Title>{lockedModalTitle}</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '80%' }}>
              <FastImage
                style={{ width: 100, height: 100 }}
                source={computerDisplayTheme.addonFeature}
              />
              <Title style={{ textAlign: 'center' }}>
                {lockedModalTitle}
                {' '}
                is an Addon Feature
              </Title>
              <Caption style={{ textAlign: 'center' }}>
                It can be Unlocked by Tier
                {' '}
                {lockedModalTier}
                {' '}
                Donations
              </Caption>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button style={{ margin: 3 }} mode="outlined" onPress={() => { setLockedModalVisible(false); }}>Close</Button>
            <Button style={{ margin: 3 }} mode="contained" onPress={handleLockedDonation}>Donate</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  React.useEffect(() => {
    fetchMiscKey('@patreonData', (patreonData) => {
      if (patreonData !== null) {
        setPatreonConnected(true);
        setPatreonDesc(`Connected as ${JSON.parse(patreonData).firstName} ${JSON.parse(patreonData).lastName}`);
      } else setPatreonConnected(false);
    });
  }, []);

  function showSnackbar(internalText) {
    setSnackBarText(internalText);
    setSnackBarVisible(true);
  }

  return (
    <View>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <List.Item
          title="Authentication Keys"
          description="Manage Private Authentication Keys"
          onPress={() => { AuthKeyManagerReference.current.requestModalVisibility(); }}
          left={(props) => <List.Icon {...props} style={{ padding: 5 }} icon="key" />}
        />
        <List.Item
          title="Patreon Account"
          description={patreonDesc}
          onPress={() => { setPatreonSignOutVisible(true); }}
          left={(props) => <List.Icon {...props} style={{ padding: 5 }} icon="account-lock" />}
        />
        <List.Item
          title="Export Configuration"
          description="Export List of All Computers and Settings"
          onPress={() => {
            if (props.donationLevel > 1) {
              // eslint-disable-next-line no-alert
              alert('Feature is Under Development!');
            } else {
              setLockedModalTitle('Export Configuration');
              setLockedModalTier(2);
              setLockedModalVisible(true);
            }
          }}
          left={(props) => <List.Icon {...props} style={{ padding: 5 }} icon="export" />}
        />
        <List.Item
          title="Import Configuration"
          description="Import Saved Settings"
          onPress={() => {
            if (props.donationLevel > 1) {
              // eslint-disable-next-line no-alert
              alert('Feature is Under Development!');
            } else {
              setLockedModalTitle('Import Configuration');
              setLockedModalTier(2);
              setLockedModalVisible(true);
            }
          }}
          left={(props) => <List.Icon {...props} style={{ padding: 5 }} icon="import" />}
        />
        <List.Item
          title="About Application"
          description={`Monitoring Center Version ${getVersion()}`}
          onPress={() => { props.navigation.jumpTo('About Application'); }}
          left={(props) => <List.Icon {...props} style={{ padding: 5 }} icon="information" />}
        />
      </ScrollView>

      <PatreonActionDialog />
      <LockedModal />
      <AuthKeyManager showSnackbar={showSnackbar} ref={AuthKeyManagerReference} />

      <Portal>
        <Snackbar visible={snackBarVisible} onDismiss={() => { setSnackBarVisible(false); }}>
          {snackBarText}
        </Snackbar>
      </Portal>
    </View>
  );
};

export default SettingsScreen;
