import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { Dialog, Portal, TextInput, Button, Provider, ActivityIndicator, Title } from 'react-native-paper';
import { Flex, ScrollView } from 'native-base';
import axios from 'axios';
import Ping from 'react-native-ping';

export const AddComputer = forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const [IPAddressText, setIPAddressText] = useState('');
    const [connectionError01, setConnectionError01] = useState(false);
    const [doneButtonDisabled, setDoneButtonDisabled] = useState(true);
    const [primaryInfoDisabled, setPrimaryInfoDisabled] = useState(false);

    useImperativeHandle(ref, () => ({
        requestModalVisibility(modalState) {
            setVisible(modalState);
        }
    }));

    const handleIPAddressKeyin = (IPAddressText) => {
        //setIPAddressText(IPAddressText.nativeEvent.text);
        setIPAddressText(IPAddressText);
    }

    const computerAdditionCanceled = () => {
        setVisible(false);
        setIPAddressText("");
        setConnectionError01(false);
        setPrimaryInfoDisabled(false);
    }

    const connectionSucceeded = () => {
        setConnectionError01(false);
        setSpinnerVisible(false);
        setPrimaryInfoDisabled(true);
    }

    const validateIPAddress = async () => {
        try {
            setSpinnerVisible(true);
            await Ping.start(IPAddressText, { timeout: 1500 }); //Wait for a Second and Check Validity
            connectionSucceeded();
        } catch (error) {
            console.log(error);
            alert(`Connection Failed!\n1. Check if the entered Address is correct\n2. Check if the Computer is turned on\n3. Check this device's Network Connectivity and make sure that both are in the same network\n\nFor Further assistance, read the Help Section in the Sidebar.`);
            setConnectionError01(true);
            setSpinnerVisible(false);
        }
    }

    return (
        <Provider>
            <ScrollView>
                <Portal>
                    <Dialog visible={visible} onDismiss={() => { setVisible(false); }} contentContainerStyle={modalStyle}>
                        <Dialog.Title>Add a Computer</Dialog.Title>
                        <Dialog.Content>
                            <TextInput error={connectionError01} value={IPAddressText} disabled={primaryInfoDisabled} onChangeText={handleIPAddressKeyin} mode="outlined" label="Computer Domain or IP Address" />
                            <Button disabled={primaryInfoDisabled} loading={spinnerVisible} style={{ marginTop: 10 }} mode="contained" onPress={validateIPAddress}>Connect</Button>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={computerAdditionCanceled}>Cancel</Button>
                            <Button disabled={doneButtonDisabled} onPress={() => { setVisible(false) }}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </Provider>
    );
});

const modalStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 15
};

export default AddComputer;