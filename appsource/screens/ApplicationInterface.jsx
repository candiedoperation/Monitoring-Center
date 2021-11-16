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
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppBar from '../components/AppBar';
import MainScreen from './MainScreen';
import SettingsScreen from './SettingsScreen';
import AboutScreen from './AboutScreen';
import HelpScreen from './HelpScreen';

const Drawer = createDrawerNavigator();

const ApplicationInterface = (props) => {
  const MainScreenReference = React.useRef();

  return (
    <NavigationContainer theme={props.navigationtheme}>
      <Drawer.Navigator
        initialRouteName="Computers"
        screenOptions={{
          header: (props) => (
            <AppBar
              {...props}
              donationLevel={props.donationLevel}
              onUserAddServiceRequest={() => {
                MainScreenReference.current.requestShowAutoAddComputerDialog();
              }}
              onUserRefreshRequest={() => {
                MainScreenReference.current.requestDataRefresh();
              }}
              onUserSettingsRequest={() => {
                MainScreenReference.current.requestShowSettingsDialog(true);
              }}
            />
          ),
        }}
      >
        <Drawer.Screen name="Computers" children={(props_internal) => (<MainScreen {...props_internal} donationLevel={props.donationLevel} donationModalRequest={props.donationModalRequest} ref={MainScreenReference} />)} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Help" component={HelpScreen} />
        <Drawer.Screen name="About Application" children={(props_internal) => (<AboutScreen {...props_internal} donationModalRequest={props.donationModalRequest} />)} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationInterface;
