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
import { ScrollView } from 'native-base';
import FastImage from 'react-native-fast-image';
import { Caption, Title } from 'react-native-paper';
import { computerDisplayTheme } from '../themes/bubblegum';

const HelpScreen = (props) => (
  <ScrollView contentContainerStyle={{
    alignItems: 'center', justifyContent: 'center', height: '100%', padding: 20,
  }}
  >
    <FastImage
      style={{ width: 100, height: 100 }}
      source={computerDisplayTheme.underConstruction}
    />
    <Title style={{ textAlign: 'center' }}>This Page is Under Construction</Title>
    <Caption style={{ textAlign: 'center' }}>This Version of Monitoring Center is a Pre Release for Testing</Caption>
  </ScrollView>
);

export default HelpScreen;
