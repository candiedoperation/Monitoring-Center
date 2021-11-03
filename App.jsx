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
import { Provider as PaperProvider } from 'react-native-paper';
import ApplicationInterface from './appsource/screens/ApplicationInterface';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { navigationTheme, monitoringTheme } from './appsource/themes/bubblegum';

export default function App() {
  return (
    <NativeBaseProvider>
      <PaperProvider theme={monitoringTheme}>
        <ApplicationInterface navigationtheme={navigationTheme}></ApplicationInterface>
      </PaperProvider>

      <StatusBar style="inverted" backgroundColor="#bc245d" translucent={false}></StatusBar>
    </NativeBaseProvider>
  );
}