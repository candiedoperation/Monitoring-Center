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
import { Appbar, Headline, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const AppBar = (props) => {
    const [refreshAllowed, setRefreshAllowed] = React.useState(true);

    function handleRefreshRequest() {
        props.onUserRefreshRequest();
        setRefreshAllowed(false);
        setTimeout(() => {
            setRefreshAllowed(true);
        }, 5000);
    }

    return (
        <Appbar style={styles.appbar}>
            <Appbar.Action icon="menu" onPress={() => { props.navigation.toggleDrawer(); }} />
            <Appbar.Content title={props.route.name} />
            <Appbar.Action style={{ display: props.route.name == 'Computers' ? 'flex' : 'none' }} icon="plus" onPress={props.onUserAddServiceRequest} />
            <Appbar.Action disabled={!refreshAllowed} style={{ display: props.route.name == 'Computers' ? 'flex' : 'none' }} icon="refresh" onPress={handleRefreshRequest} />
            <Appbar.Action style={{ display: props.route.name == 'Computers' ? 'flex' : 'none' }} icon="cog-outline" onPress={props.onUserSettingsRequest} />
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