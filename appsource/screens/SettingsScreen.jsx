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
import { PermissionsAndroid } from 'react-native';
import * as mime from 'react-native-mime-types';
import * as RNFS from 'react-native-fs';
import { pick as configPicker, isCancel as isPickCancelled } from 'react-native-document-picker';
import { View, ScrollView } from 'native-base';
import {
  List, Portal, Dialog, Button, Paragraph, Snackbar, Title, Caption,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { getVersion } from 'react-native-device-info';
import { computerDisplayTheme } from '../themes/bubblegum';
import { deleteStorageKey, exportStorageData, fetchMiscKey, importStorageData } from '../controllers/StorageController';
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
          onDismiss={() => { setLockedModalVisible(false); }}
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

  async function handleExportConfiguration() {
    if (props.donationLevel > 1) {
      try {
        const directoryAccessGranted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if (!readGranted || !writeGranted) {
          showSnackbar('File Access Permission Denied');
        } else {
          exportStorageData((storageData) => {
            const exportDirectory = `${RNFS.ExternalStorageDirectoryPath}/Documents/Monitoring Center/Configurations`;
            const exportPath = `${exportDirectory}/monitoringcenter-config (${new Date().getTime()}).json`;

            RNFS.mkdir(exportDirectory); // Does not throw if already exists
            RNFS.writeFile(exportPath, storageData, 'utf8')
              .then(() => {
                showSnackbar(`Configuration Exported to ${exportDirectory}`);
              })
              .catch((err) => {
                console.error(err);
                showSnackbar('Configuration Export Failed');
              });
          });
        }
      } catch (error) {
        console.warn(error);
      }
    } else {
      setLockedModalTitle('Export Configuration');
      setLockedModalTier(2);
      setLockedModalVisible(true);
    }
  }

  async function handleImportConfiguration() {
    if (props.donationLevel > 1) {
      try {
        const directoryAccessGranted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if (!readGranted || !writeGranted) {
          showSnackbar('File Access Permission Denied');
        } else {
          configPicker({
            allowMultiSelection: false,
            type: [mime.lookup('json')],
          }).then((pickedConfiguration) => {
            RNFS.readFile(pickedConfiguration[0].uri, 'utf8')
              .then((storageDB) => {
                importStorageData(JSON.parse(storageDB),
                  () => {
                    showSnackbar('Failed to Import Configuration File');
                  },
                  () => {
                    showSnackbar('Successfully Imported Configuration File');
                  });
              })
              .catch(() => {
                showSnackbar('Failed to Read Configuration File');
              });
          }).catch((error) => {
            if (isPickCancelled(error)) {
              showSnackbar('Configuration Import Cancelled');
            } else {
              console.error(error);
            }
          });
        }
      } catch (error) {
        console.warn(error);
      }
    } else {
      setLockedModalTitle('Import Configuration');
      setLockedModalTier(2);
      setLockedModalVisible(true);
    }
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
          onPress={handleExportConfiguration}
          left={(props) => <List.Icon {...props} style={{ padding: 5 }} icon="export" />}
        />
        <List.Item
          title="Import Configuration"
          description="Import Saved Settings"
          onPress={handleImportConfiguration}
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
