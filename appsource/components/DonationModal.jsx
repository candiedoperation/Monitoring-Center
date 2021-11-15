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
  Dialog, Portal, Button, Provider,
} from 'react-native-paper';
import { ScrollView, Flex } from 'native-base';
import { startDefaultDiscovery } from '../controllers/AutoDiscoveryController';

const DonationModal = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);

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
    if (visible === true) {
      startDefaultDiscovery(() => {

      });
    }
  }, [visible]);

  return (
    <Provider theme={props.theme}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => { setVisible(false); }}
          contentContainerStyle={modalStyle}
        >
          <Dialog.Title>Donate</Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: '85%' }}>
            <ScrollView />
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => { setVisible(false); }}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
});

export default DonationModal;
