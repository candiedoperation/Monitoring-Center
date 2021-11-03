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
import { Checkbox, Snackbar, Dialog, Portal, TextInput, Button, Provider, RadioButton, Text, Subheading } from 'react-native-paper';
import { Box, Flex, ScrollView } from 'native-base';
import axios from 'axios';
import { monitoringTheme } from '../themes/bubblegum';

const FeatureImplementation = React.forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [doneButtonDisabled, setDoneButtonDisabled] = React.useState(true);
    const [snackBarText, setSnackBarText] = React.useState('');

    React.useImperativeHandle(ref, () => ({
        requestModalVisibility() {
            setVisible(true);
        }
    }));

    return (
        <Provider theme={monitoringTheme}>
            <Portal>
                <Dialog visible={visible} onDismiss={() => { setVisible(false); }} contentContainerStyle={modalStyle}>
                    <Dialog.Title>Available Features</Dialog.Title>
                    <Dialog.Content style={{ maxHeight: "75%" }}>
                        <ScrollView>

                        </ScrollView>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={ () => { setVisible(false) } }>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Snackbar
                    visible={snackBarVisible}
                    onDismiss={() => { setSnackBarVisible(false) }}
                    action={{
                        label: 'Need Help ?',
                        onPress: () => {
                            props.navigation.navigate('Help')
                        },
                    }}>
                    {snackBarText}
                </Snackbar>
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