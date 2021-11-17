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
import { View, ScrollView } from 'native-base';
import {
  List, Portal, Dialog, Button, Paragraph, Snackbar,
} from 'react-native-paper';
import { getVersion } from 'react-native-device-info';
import { deleteStorageKey, fetchMiscKey } from '../controllers/StorageController';
import AuthKeyManager from '../components/AuthKeyManager';

const SettingsScreen = (props) => {
  const [patreonDesc, setPatreonDesc] = React.useState('App is Not Connected to Patreon');
  const [isPatreonConnected, setPatreonConnected] = React.useState(false);
  const [patreonSignOutVisible, setPatreonSignOutVisible] = React.useState(false);
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
          onPress={() => { }}
          left={(props) => <List.Icon {...props} style={{ padding: 5 }} icon="export" />}
        />
        <List.Item
          title="Import Configuration"
          description="Import Saved Settings"
          onPress={() => { }}
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
