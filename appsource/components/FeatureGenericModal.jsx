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
  Dialog, Portal, Button, Provider,
} from 'react-native-paper';
import { monitoringTheme } from '../themes/bubblegum';

const FeatureGenericModal = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');

  React.useImperativeHandle(ref, () => ({
    requestModalVisibility(featureID, featureTitle, internalConnectionData) {
      setModalTitle(featureTitle);
      setVisible(true);
    },
  }));

  return (
    <Provider theme={monitoringTheme}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => { setVisible(false); }} contentContainerStyle={modalStyle}>
          <Dialog.Title>{modalTitle}</Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: '90%', paddingLeft: 0, paddingRight: 0 }} />
          <Dialog.Actions>
            <Button onPress={() => { setVisible(false); }}>Cancel</Button>
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

export default FeatureGenericModal;
