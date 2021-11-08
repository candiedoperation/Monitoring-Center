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
  List, Dialog, Portal, Button, Provider, ActivityIndicator,
} from 'react-native-paper';
import { ScrollView } from 'native-base';
import axios from 'axios';
import { monitoringTheme } from '../themes/bubblegum';
import FeatureAccordition from './FeatureAccordition';

const FeatureImplementation = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [availableFeatures, setAvailableFeatures] = React.useState([]);
  const [connectionData, setConnectionData] = React.useState({});
  const [doneButtonDisabled, setDoneButtonDisabled] = React.useState(true);
  const [renderUUID, requestRender] = React.useState(0);
  const getRandomId = () => parseInt(Math.random() * 100, 10);

  const supportedParentFeatures = [
    '7d98f0-395a-4fff-b968-e49b8d0f748c', // Reboot
    '6f5a27a0-0e2f-496e-afcc-7aae62eede10', // Power Down
    '7310707d-3918-460d-a949-65bd152cb958', // User Login
    '7311d43d-ab53-439e-a03a-8cb25f7ed526', // User LogOff
    '79a5e74d-50bd-4aab-8012-0e70dc08cc72', // User Session Info
    '8a11a75d-b3db-48b6-b9cb-f8422ddd5b0c', // Open Website
    'ccb535a2-1d24-4cc1-a709-8b47d2b2ac79', // Screen Lock
    'd5ee3aac-2a87-4d05-b827-0c20344490bd', // Screenshot
    'da9ca56a-b2ad-4fff-8f8a-929b2927b442', // Start App
    'e4a77879-e544-4fec-bc18-e534f33b934c', // Lock Input Devices
    'e75ae9c8-ac17-4d00-8f0d-019348346208', // Text Message
  ];

  React.useImperativeHandle(ref, () => ({
    requestModalVisibility(internalConnectionData) {
      setConnectionData(internalConnectionData);
      setVisible(true);
    },
  }));

  function initializationParams() {
    axios.get(`${connectionData.topURL}${connectionData.subURL}`, {
      headers: { 'connection-uid': connectionData.connectionUid },
      withCredentials: true,
      crossDomain: true,
    }).then((response) => {
      const formattedDataStore = {};
      response.data.forEach((feature) => {
        if (feature.parentUid === '00000000-0000-0000-0000-000000000000') {
          formattedDataStore[feature.uid] = {
            active: feature.active,
            name: feature.name,
            children: [],
          };
        } else {
          (formattedDataStore[feature.parentUid]).children.push({
            uuid: feature.uid,
            active: feature.active,
            name: feature.name,
          });
        }
      });

      Object.entries(formattedDataStore).forEach(([uuid, data]) => {
        if (supportedParentFeatures.includes(uuid)) {
          availableFeatures.push(
            <FeatureAccordition
              key={uuid}
              featureID={uuid}
              featureData={data}
              genericModalToggle={props.genericModalToggle}
              internalConnectionData={connectionData}
            />,
          );
        }
      });

      setAvailableFeatures(availableFeatures);
      requestRender(getRandomId());
    }).catch((error) => {
      console.log(error);
      alert('Failed to Fetch Available Features');
      setVisible(false);
    });
  }

  function destructionParams() {
    setAvailableFeatures([]);
    requestRender(getRandomId());
  }

  React.useEffect(visible === true ? initializationParams : destructionParams, [visible]);

  return (
    <Provider theme={monitoringTheme}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => { setVisible(false); }} contentContainerStyle={modalStyle}>
          <Dialog.Title>Available Features</Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: '90%', paddingLeft: 0, paddingRight: 0 }}>
            <ActivityIndicator style={{ margin: 30, display: (availableFeatures.length != 0) ? 'none' : 'flex' }} />
            <ScrollView>
              <List.AccordionGroup>{availableFeatures}</List.AccordionGroup>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => { setVisible(false); }}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
});

const modalStyle = {
  backgroundColor: 'white',
  padding: 20,
  margin: 15,
};

export default FeatureImplementation;
