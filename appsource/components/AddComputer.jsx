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
  Checkbox, Snackbar, Dialog, Portal, TextInput, Button, Provider, RadioButton, Text, Subheading,
} from 'react-native-paper';
import { Box, Flex, ScrollView } from 'native-base';
import axios from 'axios';
import Ping from 'react-native-ping';
import { addComputer } from '../controllers/StorageController';

const AddComputer = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [spinnerVisible, setSpinnerVisible] = React.useState(false);
  const [IPAddressText, setIPAddressText] = React.useState('');
  const [ProxyAddressText, setProxyAddressText] = React.useState('');
  const [connectionError01, setConnectionError01] = React.useState(false);
  const [connectionError02, setConnectionError02] = React.useState(false);
  const [doneButtonDisabled, setDoneButtonDisabled] = React.useState(true);
  const [primaryInfoDisabled, setPrimaryInfoDisabled] = React.useState(false);
  const [secondaryInfoEnabled, setSecondaryInfoEnabled] = React.useState(false);
  const [selectedRadioButton, changeSelectedRadioButton] = React.useState('');
  const [authLogonAvailable, setAuthLogonAvailable] = React.useState(false);
  const [authKeysAvailable, setAuthKeysAvailable] = React.useState(false);
  const [authLDAPAvailable, setAuthLDAPAvailable] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');
  const [usingProxy, setUsingProxy] = React.useState(false);
  const [usingHTTPS, setUsingHTTPS] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    requestModalVisibility(modalState) {
      setVisible(modalState);
    },
  }));

  const handleIPAddressKeyin = (IPAddressText) => {
    // setIPAddressText(IPAddressText.nativeEvent.text);
    setIPAddressText(IPAddressText);
  };

  const handleProxyAddressKeyin = (ProxyAddressText) => {
    // setIPAddressText(IPAddressText.nativeEvent.text);
    setProxyAddressText(ProxyAddressText);
  };

  const getRequestURL = () => {
    const serverIP = ((ProxyAddressText != undefined && ProxyAddressText.trim() != '') ? ProxyAddressText.split(':')[0] : IPAddressText.split(':')[0]);
    const serverPort = ((ProxyAddressText != undefined && ProxyAddressText.trim() != '') ? ProxyAddressText.split(':')[1] : IPAddressText.split(':')[1]);
    const serverAddress = (serverIP == IPAddressText.split(':')[0] ? 'localhost' : IPAddressText.split(':')[0]);
    const addressPort = ((IPAddressText.split(':')[1] != undefined && IPAddressText.split(':')[1] != '') ? `:${IPAddressText.split(':')[1]}` : ':11100');
    const protocol = (usingHTTPS == true ? 'https' : 'http');
    const requestURL = `${protocol}://${serverIP}:${(serverPort != undefined && serverPort.trim() != '') ? serverPort : '11080'}/api/v1/authentication/${serverAddress}${addressPort}`;

    console.log(`Requesting: ${requestURL}`);
    return requestURL;
  };

  const getAuthenticationMethods = () => {
    axios.get(getRequestURL(), { crossDomain: true })
      .then((response) => {
        setConnectionError01(false);
        setPrimaryInfoDisabled(true);
        setSpinnerVisible(false);

        response.data.methods.forEach((authMethod) => {
          setSecondaryInfoEnabled(true);

          switch (authMethod) {
            case '0c69b301-81b4-42d6-8fae-128cdd113314':
              setAuthKeysAvailable(true);
              changeSelectedRadioButton('0c69b301-81b4-42d6-8fae-128cdd113314');
              setDoneButtonDisabled(false);
              break;

            case '63611f7c-b457-42c7-832e-67d0f9281085':
              setAuthLogonAvailable(true);
              changeSelectedRadioButton('63611f7c-b457-42c7-832e-67d0f9281085');
              break;

            case '6f0a491e-c1c6-4338-8244-f823b0bf8670':
              setAuthLDAPAvailable(true);
              changeSelectedRadioButton('6f0a491e-c1c6-4338-8244-f823b0bf8670');
              break;

            default:
              setSnackBarText('No Authentication Methods Found!');
              setSnackBarVisible(true);
              break;
          }
        });
      })

      .catch((error) => {
        if (axios.isCancel(error)) {
          setSnackBarText('User cancelled the Request!');
          setSnackBarVisible(true);
        } else {
          setSnackBarText('Veyon Server failed to Respond!');
          setSnackBarVisible(true);
        }

        setPrimaryInfoDisabled(false);
        setConnectionError01(true);
        setSpinnerVisible(false);
      });
  };

  const computerAdditionCompleted = () => {
    props.requestRefresh();
    setVisible(false);
    setIPAddressText('');
    setProxyAddressText('');
    setConnectionError01(false);
    setPrimaryInfoDisabled(false);
    setSpinnerVisible(false);
  };

  const completeComputerAddition = () => {
    addComputer(getRequestURL(), selectedRadioButton, computerAdditionCompleted);
  };

  const connectionFailed = (error) => {
    console.log(error);
    setSnackBarText('Unable to Find Server!');
    setSnackBarVisible(true);
    setConnectionError01(true);
    setPrimaryInfoDisabled(false);
    setSpinnerVisible(false);
  };

  const validateIPAddress = async () => {
    setPrimaryInfoDisabled(true);

    try {
      setSpinnerVisible(true);
      setPrimaryInfoDisabled(true);
      await Ping.start(IPAddressText.split(':')[0], { timeout: 1500 }); // Wait for a Second and Check Validity
      if (ProxyAddressText.trim() != '') { await Ping.start(ProxyAddressText.split(':')[0], { timeout: 1500 }); }

      getAuthenticationMethods();
    } catch (error) {
      setPrimaryInfoDisabled(false);
      connectionFailed(error);
    }
  };

  return (
    <Provider theme={props.theme}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => { setVisible(false); }} contentContainerStyle={modalStyle}>
          <Dialog.Title>Add a Computer</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView paddingBottom={5}>
              <TextInput error={connectionError01} value={IPAddressText} disabled={primaryInfoDisabled} onChangeText={handleIPAddressKeyin} mode="outlined" label="Computer Domain or IP Address" />
              <Flex marginTop={3} direction="row" alignItems="center">
                <Checkbox disabled={primaryInfoDisabled} status={usingProxy ? 'checked' : 'unchecked'} onPress={() => { setUsingProxy(!usingProxy); }} />
                <Text style={{ flexGrow: 1 }}>Veyon Proxy Server</Text>
                <Checkbox disabled={primaryInfoDisabled} status={usingHTTPS ? 'checked' : 'unchecked'} onPress={() => { setUsingHTTPS(!usingHTTPS); }} />
                <Text style={{ flexGrow: 1 }}>Use HTTPS</Text>
              </Flex>
              <Box display={usingProxy ? 'flex' : 'none'} mt={3}>
                <Flex>
                  <Subheading>Veyon Proxy Server</Subheading>
                  <TextInput error={connectionError02} value={ProxyAddressText} disabled={primaryInfoDisabled} onChangeText={handleProxyAddressKeyin} mode="outlined" label="Proxy Server Domain or IP Address" />
                </Flex>
              </Box>
              <Button disabled={primaryInfoDisabled} loading={spinnerVisible} style={{ marginTop: 10 }} mode="contained" onPress={validateIPAddress}>Connect</Button>
              <Box display={secondaryInfoEnabled ? 'flex' : 'none'} mt={5}>
                <Flex direction="column">
                  <Subheading>Authentication Method</Subheading>
                  <RadioButton.Group onValueChange={(newValue) => changeSelectedRadioButton(newValue)} value={selectedRadioButton}>
                    <Flex direction="row" alignItems="center">
                      <RadioButton disabled={!authLogonAvailable} value="63611f7c-b457-42c7-832e-67d0f9281085" />
                      <Text>Logon Authentication</Text>
                    </Flex>
                    <Flex direction="row" alignItems="center">
                      <RadioButton disabled={!authKeysAvailable} value="0c69b301-81b4-42d6-8fae-128cdd113314" />
                      <Text>Key File Authentication</Text>
                    </Flex>
                    <Flex direction="row" alignItems="center">
                      <RadioButton disabled={!authLDAPAvailable} value="6f0a491e-c1c6-4338-8244-f823b0bf8670" />
                      <Text>LDAP Authentication</Text>
                    </Flex>
                  </RadioButton.Group>
                </Flex>
              </Box>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={computerAdditionCompleted}>Cancel</Button>
            <Button disabled={doneButtonDisabled} onPress={completeComputerAddition}>Add Computer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => { setSnackBarVisible(false); }}
          action={{
            label: 'Need Help ?',
            onPress: () => {
              props.navigation.navigate('Help');
            },
          }}
        >
          {snackBarText}
        </Snackbar>
      </Portal>
    </Provider>
  );
});

const modalStyle = {
  backgroundColor: 'white',
  padding: 20,
  margin: 15,
};

export default AddComputer;
