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
import { Flex, ScrollView } from 'native-base';
import { Linking } from 'react-native';
import {
  Button, Card, Text,
} from 'react-native-paper';
import LicenseInformation from '../components/AppLicense';
import prodKeys from '../controllers/ProductionController';

const AboutScreen = (props) => (
  <Flex style={{ padding: 8 }}>
    <Card style={{ maxHeight: '100%' }}>
      <Card.Title title="Monitoring Center" subtitle="Copyright © 2021  Atheesh Thirumalairajan" />
      <Card.Actions style={{ flexDirection: 'row-reverse', marginBottom: 3 }}>
        <Button mode="contained" style={{ marginRight: 10, marginLeft: 10 }} onPress={props.donationModalRequest}>Donate</Button>
        <Button mode="outlined" onPress={() => { Linking.openURL(prodKeys.sourceURL); }}>View Source</Button>
      </Card.Actions>
      <Card.Content>
        <ScrollView height="78%">
          <Text>{LicenseInformation}</Text>
        </ScrollView>
      </Card.Content>
    </Card>
  </Flex>
);

export default AboutScreen;
