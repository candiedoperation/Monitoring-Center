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
        <Appbar.Action onPress={props.deleteKey} icon="delete" />
      </View>
    )}
  />
);

export default AuthKeyAccordion;
