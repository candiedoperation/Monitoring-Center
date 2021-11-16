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
import { Caption, List, Title } from 'react-native-paper';
import { getVersion } from 'react-native-device-info';

const SettingsScreen = (props) => (
  <ScrollView contentContainerStyle={{ height: "100%" }}>
    <List.Item
      title="Authentication Keys"
      description="Change Private Authentication Key"
      onPress={() => { }}
      left={props => <List.Icon {...props} style={{ padding: 5 }} icon="key" />}
    />
    <List.Item
      title="Preview Refresh Interval"
      description="3 seconds"
      onPress={() => { }}
      left={props => <List.Icon {...props} style={{ padding: 5 }} icon="timer" />}
    />    
    <List.Item
      title="About Application"
      description={`Monitoring Center Version ${getVersion()}`}
      onPress={() => { props.navigation.jumpTo("About Application") }}
      left={props => <List.Icon {...props} style={{ padding: 5 }} icon="information" />}
    />    
  </ScrollView>
);

export default SettingsScreen;
