import React from 'react';
import { Appbar, Headline, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const AppBar = (props) => {
    return (
        <Appbar style={styles.appbar}>
            <Appbar.Action icon="menu" onPress={() => { props.navigation.toggleDrawer(); }} />
            <Appbar.Content title={props.route.name} />
        </Appbar>
    );
};

export default AppBar;

const styles = StyleSheet.create({
    appbar: {
        left: 0,
        right: 0,
        top: 0,
    },
});