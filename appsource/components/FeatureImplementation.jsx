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

import React, { useEffect } from 'react';
import { Title, List, Checkbox, Snackbar, Dialog, Portal, TextInput, Button, Provider, RadioButton, Text, Subheading, ActivityIndicator } from 'react-native-paper';
import { Box, Flex, ScrollView } from 'native-base';
import axios from 'axios';
import { monitoringTheme } from '../themes/bubblegum';
import { alignSelf } from 'styled-system';

const FeatureImplementation = React.forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [availableFeatures, setAvailableFeatures] = React.useState([]);
    const [connectionData, setConnectionData] = React.useState({});    
    const [doneButtonDisabled, setDoneButtonDisabled] = React.useState(true);
    const [renderUUID, requestRender] = React.useState(0);

    React.useImperativeHandle(ref, () => ({
        requestModalVisibility(internalConnectionData) {
            console.error(internalConnectionData);
            setConnectionData(internalConnectionData);
            setVisible(true);
        }
    }));

    function initializationParams () {
        console.warn(connectionData.address)
        axios.get(connectionData.address, {
            headers: { "connection-uid": connectionData.connectionUid },
            withCredentials: true,
            crossDomain: true            
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
            alert ("Failed to Fetch Available Features");
            setVisible(false);
        });
    }

    function destructionParams () {
        
    }

    useEffect(visible == true ? initializationParams : destructionParams, [visible]);

    return (
        <Provider theme={monitoringTheme}>
            <Portal>
                <Dialog visible={visible} onDismiss={() => { setVisible(false); }} contentContainerStyle={modalStyle}>
                    <Dialog.Title>Available Features</Dialog.Title>
                    <Dialog.Content style={{ maxHeight: "75%" }}>
                        <ScrollView>
                            <List.AccordionGroup minHeight="full">

                            </List.AccordionGroup>
                        </ScrollView>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => { setVisible(false) }}>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    );
});

const modalStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 15
};

export default FeatureImplementation;