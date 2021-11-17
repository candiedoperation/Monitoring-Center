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

/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  Portal, Dialog, Button, Text, Caption, ActivityIndicator, TextInput,
} from 'react-native-paper';
import { ScrollView } from 'native-base';
import { RSA } from 'react-native-rsa-native';
import * as RNFS from 'react-native-fs';
import { pick as configPicker, isCancel as isPickCancelled } from 'react-native-document-picker';
import uuid from 'react-native-uuid';
import AuthKeyAccordion from './AuthKeyAccordion';
import { fetchMiscKey, initializeStorageKey, setMiscKey } from '../controllers/StorageController';

const AuthKeyManager = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [authKeyList, setAuthKeyList] = React.useState([]);
  const [isRSAWorking, setRSAWorking] = React.useState(false);
  const [keyNameVisible, setKeyNameVisible] = React.useState(false);
  const [keyEditVisible, setKeyEditVisible] = React.useState(false);
  const [currentEditUUID, setCurrentEditUUID] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isImporting, setImportInProgress] = React.useState(false);

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

  const KeyNameInput = () => {
    const [keyName, setKeyName] = React.useState('');
    const [createEnabled, setCreateEnabled] = React.useState(false);

    React.useEffect(() => {
      if (keyNameVisible === true) {
        setKeyName('');
      }
    }, [keyNameVisible]);

    function handleInputType(newText) {
      // eslint-disable-next-line no-unused-expressions
      newText.trim() !== '' ? setCreateEnabled(true) : setCreateEnabled(false);
      setKeyName(newText);
    }

    return (
      <Portal>
        <Dialog visible={keyNameVisible} onDismiss={() => { setKeyNameVisible(false); }}>
          <Dialog.Content>
            <TextInput mode="outlined" label="Key Name" value={keyName} onChangeText={handleInputType} />
            <Caption style={{ marginTop: 15, textAlign: 'center' }}>
              Key Names in Monitoring Center and Veyon Configurator
              should be same for Successful Authentication
            </Caption>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={{ margin: 3 }}
              onPress={() => { setKeyNameVisible(false); }}
            >
              Cancel
            </Button>

            <Button
              mode="contained"
              disabled={!createEnabled}
              style={{ margin: 3 }}
              onPress={() => {
                if (keyName.trim() !== '') {
                  // eslint-disable-next-line no-use-before-define
                  handleNewKeyPair(keyName);
                  setKeyNameVisible(false);
                }
              }}
            >
              Create Key Pair
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  const KeyNameEditInput = () => {
    const [editKeyName, setEditKeyName] = React.useState('');
    const [editEnabled, setEditEnabled] = React.useState(false);

    function handleInputType(newText) {
      // eslint-disable-next-line no-unused-expressions
      newText.trim() !== '' ? setEditEnabled(true) : setEditEnabled(false);
      setEditKeyName(newText);
    }

    return (
      <Portal>
        <Dialog visible={keyEditVisible} onDismiss={() => { setKeyEditVisible(false); }}>
          <Dialog.Content>
            <TextInput mode="outlined" label="New Key Name" value={editKeyName} onChangeText={handleInputType} />
            <Caption style={{ marginTop: 15, textAlign: 'center' }}>
              Key Names in Monitoring Center and Veyon Configurator
              should be same for Successful Authentication
            </Caption>
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={{ margin: 3 }} onPress={() => { setKeyEditVisible(false); }}>
              Cancel
            </Button>

            <Button
              mode="contained"
              disabled={!editEnabled}
              style={{ margin: 3, flexShrink: 1 }}
              onPress={() => {
                if (editKeyName.trim() !== '') {
                  // eslint-disable-next-line no-use-before-define
                  handleKeyRename(currentEditUUID, editKeyName);
                  setKeyEditVisible(false);
                }
              }}
            >
              Change Key Name
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  function handleNewKeyPair(keyName) {
    setRSAWorking(true);
    RSA
      .generateKeys(4096)
      .then(function initializeKeyController(generatedKeys) {
        fetchMiscKey('@authKeys', (fetchedAuthKeys) => {
          if (fetchedAuthKeys == null) {
            initializeStorageKey('@authKeys', () => {
              initializeKeyController(generatedKeys);
            });
          } else {
            fetchedAuthKeys[uuid.v4()] = {
              keyName, // Shorthand for keyName: keyName
              privateKey: generatedKeys.private,
              publicKey: generatedKeys.public,
              isImported: false,
            };

            setMiscKey('@authKeys', fetchedAuthKeys, () => {
              setRSAWorking(false);
              setVisible(false);
              setVisible(true);
            });
          }
        });
      });
  }

  function handleDeleteKeyPair(keyUUID) {
    fetchMiscKey('@authKeys', (authKeys) => {
      delete authKeys[keyUUID];

      setMiscKey('@authKeys', authKeys, () => {
        setVisible(false);
        setVisible(true);
      });
    });
  }

  function handleKeyRename(keyUUID, keyName) {
    fetchMiscKey('@authKeys', (authKeys) => {
      authKeys[keyUUID].keyName = keyName;
      setMiscKey('@authKeys', authKeys, () => {
        setVisible(false);
        setVisible(true);
      });
    });
  }

  async function handleExportKeyPairAndroid(keyUUID) {
    try {
      // eslint-disable-next-line no-unused-vars
      const directoryAccessGranted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ],
      );

      // eslint-disable-next-line max-len
      const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      // eslint-disable-next-line max-len
      const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if (!readGranted || !writeGranted) {
        props.showSnackbar('Permssion Denied to Write Files.');
      } else {
        fetchMiscKey('@authKeys', (fetchedKeys) => {
          const exportDirectory = `${RNFS.ExternalStorageDirectoryPath}/Documents/Monitoring Center/Authentication Keys`;
          const exportPaths = [
            `${exportDirectory}/${fetchedKeys[keyUUID].keyName}_private_key.pem`,
            `${exportDirectory}/${fetchedKeys[keyUUID].keyName}_public_key.pem`,
          ];

          RNFS.mkdir(exportDirectory); // Does not throw if already exists
          RNFS.writeFile(exportPaths[0], fetchedKeys[keyUUID].privateKey, 'utf8')
            .then(() => {
              if (fetchedKeys[keyUUID].isImported === false) {
                RNFS.writeFile(exportPaths[1], fetchedKeys[keyUUID].publicKey, 'utf8')
                  .then(() => {
                    props.showSnackbar(`Key Pair Exported to ${exportDirectory}`);
                  })
                  .catch((err) => {
                    console.error(err);
                    props.showSnackbar('Public Key Export Failed');
                  });
              } else {
                props.showSnackbar(`Private Key Exported to ${exportDirectory}`);
              }
            })
            .catch((err) => {
              console.error(err);
              props.showSnackbar('Private Key Export Failed');
            });
        });
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async function handleImportPrivateKey() {
    setImportInProgress(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const directoryAccessGranted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ],
      );

      // eslint-disable-next-line max-len
      const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      // eslint-disable-next-line max-len
      const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if (!readGranted || !writeGranted) {
        props.showSnackbar('Permssion Denied to Write Files.');
        setImportInProgress(false);
      } else {
        configPicker({
          allowMultiSelection: false,
          type: Platform.OS === 'ios' ? 'public.item' : '*/*',
        }).then((pickedConfiguration) => {
          RNFS.readFile(pickedConfiguration[0].uri, 'utf8')
            .then(function initializeKeyController(keyFileData) {
              fetchMiscKey('@authKeys', (fetchedAuthKeys) => {
                if (fetchedAuthKeys == null) {
                  setImportInProgress(false);
                  initializeStorageKey('@authKeys', () => {
                    initializeKeyController(keyFileData);
                  });
                } else {
                  if (keyFileData.includes('PRIVATE')) {
                    let strippedKeyName = pickedConfiguration[0].name;
                    if (strippedKeyName.includes('_private_key')) strippedKeyName = strippedKeyName.replace(/_private_key/g, '');
                    if (strippedKeyName.includes('.')) strippedKeyName = strippedKeyName.substring(0, strippedKeyName.indexOf('.'));

                    fetchedAuthKeys[uuid.v4()] = {
                      keyName: strippedKeyName,
                      privateKey: keyFileData,
                      isImported: true,
                    };

                    setMiscKey('@authKeys', fetchedAuthKeys, () => {
                      setImportInProgress(false);
                      setVisible(false);
                      setVisible(true);
                    });
                  } else {
                    props.showSnackbar('Selected File is an Invalid Private Key');
                    setImportInProgress(false);
                  }
                }
              });
            }).catch(() => {
              props.showSnackbar('Failed to Read Private Key File');
              setImportInProgress(false);
            });
        }).catch((error) => {
          setImportInProgress(false);
          if (isPickCancelled(error)) {
            props.showSnackbar('Private Key Import Cancelled');
          } else {
            console.error(error);
          }
        });
      }
    } catch (error) {
      console.warn(error);
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    fetchMiscKey('@authKeys', (authKeys) => {
      if (authKeys != null && visible === true) {
        const internalAuthKeyList = [];
        Object.keys(authKeys).forEach((authKey) => {
          internalAuthKeyList.push(
            <AuthKeyAccordion
              key={authKey}
              deleteKey={() => { handleDeleteKeyPair(authKey); }}
              exportKey={() => { handleExportKeyPairAndroid(authKey); }}
              editKey={() => { setCurrentEditUUID(authKey); setKeyEditVisible(true); }}
              title={authKeys[authKey].keyName}
              description={authKeys[authKey].isImported === false ? 'Monitoring Center Key Pair' : 'Imported Private Key'}
            />,
          );
        });

        setIsLoading(false);
        setAuthKeyList(internalAuthKeyList);
      } else {
        setAuthKeyList([]);
        setTimeout(() => { setIsLoading(false); }, 500);
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
        <Dialog.Title>Authentication Keys</Dialog.Title>
        <Dialog.ScrollArea style={{ maxHeight: '85%', paddingLeft: 0, paddingRight: 0 }}>
          <ScrollView>
            {authKeyList}
            <Text
              style={{
                margin: 15,
                textAlign: 'center',
                display: (authKeyList.length !== 0) ? 'flex' : 'none',
              }}
            >
              In order to make the Keys Work, You need to export the Public Keys
              and Import them in Veyon Configurator in the computers which you want
              to monitor.
            </Text>

            <ActivityIndicator
              animating
              style={{
                margin: 30,
                display: (isLoading === true) ? 'flex' : 'none',
              }}
            />
            <Text
              style={{
                margin: 15,
                textAlign: 'center',
                display: (authKeyList.length === 0 && isLoading === false) ? 'flex' : 'none',
              }}
            >
              There are No Authentication Keys Added. Click the Import button to
              add an existing private key or the New Key button to Create a New Key Pair
              (one Public Key and one Private Key)
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            mode="outlined"
            onPress={handleImportPrivateKey}
            disabled={isImporting}
            loading={isImporting}
            style={{ margin: 3, flexShrink: 1 }}
          >
            Import Private Key
          </Button>
          <Button
            mode="contained"
            onPress={() => { setKeyNameVisible(true); }}
            disabled={isRSAWorking}
            loading={isRSAWorking}
            style={{ margin: 3 }}
          >
            New Key Pair
          </Button>
        </Dialog.Actions>
      </Dialog>

      <KeyNameInput />
      <KeyNameEditInput />
    </Portal>
  );
});

export default AuthKeyManager;
