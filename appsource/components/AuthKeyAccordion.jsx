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
import { View } from 'native-base';
import { Appbar, List } from 'react-native-paper';

const AuthKeyAccordion = (props) => (
  <List.Item
    {...props}
    style={{ marginLeft: 3, marginRight: 3 }}
    right={(internal_props) => (
      <View flexDirection="row">
        <Appbar.Action onPress={props.exportKey} icon="export" />
        <Appbar.Action onPress={props.editKey} icon="pencil" />
        <Appbar.Action onPress={props.deleteKey} icon="delete" />
      </View>
    )}
  />
);

export default AuthKeyAccordion;
