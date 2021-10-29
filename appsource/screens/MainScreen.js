import { Center, Flex, NativeBaseProvider, ScrollView } from 'native-base';
import React, { useRef } from 'react';
import { Button, Title, Avatar } from 'react-native-paper';
import AddComputer from '../components/AddComputer';

const MainScreen = (props) => {
    const AddComputerModalReference = useRef();

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }} align="center" justify="center">
                <Avatar.Icon size={128} backgroundColor="transparent" color="#bc245d" icon="devices" />
                <Title style={{ marginBottom: 10 }}>It's Empty in Here…</Title>
                <Flex>
                    <Button style={{ margin: 5 }} icon="plus" mode="contained" onPress={() => AddComputerModalReference.current.requestModalVisibility(true)}>Add a Computer</Button>
                    <Button style={{ margin: 5 }} mode="outlined" onPress={() => props.navigation.navigate('Settings')}>Need Help ?</Button>
                </Flex>
            </ScrollView>
            
            <AddComputer ref={AddComputerModalReference}></AddComputer>
        </NativeBaseProvider>
    );
}

export default MainScreen;