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

/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Flex, ScrollView, View } from 'native-base';
import {
  Portal, Dialog, Button, Text, Caption,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import DonationPerkBanner from './DonationPerkBanner';
import ComputerDisplay from './ComputerDisplay';
import { fetchComputers } from '../controllers/StorageController';
import { computerDisplayTheme } from '../themes/bubblegum';

const ConfiguredLaunch = (props) => {
  const [configuredComputers, setConfiguredComputers] = useState([]);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [renderUUID, requestReRender] = useState(0);
  const getRandomId = () => parseInt(Math.random() * 100, 10);

  React.useEffect(() => {
    fetchComputers((computersList) => {
      console.log('Re-Rendering Elements');
      const configuredComputers = [];

      for (const [uuid, data] of Object.entries(computersList)) {
        console.log(`${uuid}: ${JSON.stringify(data)}`);
        configuredComputers.push(
          <ComputerDisplay
            key={uuid}
            actionsRequest={props.actionsRequest}
            enlargeDisplay={props.enlargeDisplay}
            computerUUID={uuid}
            computerAddress={data.computerAddress}
            computerAuth={data.computerAuth}
          />,
        );
      }

      setConfiguredComputers(configuredComputers);
    });
  }, [renderUUID]);

  React.useState(() => {
    if (props.donationLevel == 0) {
      /* https://github.com/facebook/react-native/issues/12981#issuecomment-652745831 */
      setInterval(() => { setDialogVisible(true); }, 210000);
      setTimeout(() => { setDialogVisible(true); }, 8000);
    }
  }, []);

  return (
    <View>
      <Flex>
        <ScrollView>
          <DonationPerkBanner visible={props.donationLevel > 0} />
          {configuredComputers}
        </ScrollView>
      </Flex>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => { setDialogVisible(false); }}>
          <Dialog.Title>It's a proven fact</Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: '90%' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '90%' }}>
              <FastImage
                style={{ width: 100, height: 100 }}
                source={computerDisplayTheme.donateRequest}
              />
              <Text style={{ textAlign: 'center' }}>
                Generosity makes you a happier person, please consider supporting the development.
              </Text>
              <Caption style={{ textAlign: 'center' }}>
                Your Generous Donation would help me make better and useful apps everyday.
              </Caption>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button style={{ margin: 3 }} onPress={() => { setDialogVisible(false); }}>Close</Button>
            <Button style={{ margin: 3 }} onPress={props.donationRequest} mode="contained">Donate</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ConfiguredLaunch;
