import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SettingsScreen = (props) => {
    return (
        <View style={style.container}>
            <Text>Settings Screen</Text>
            <Button
                title="Go to MainScreen"
                onPress={() => props.navigation.navigate('MainScreen')}
            />
        </View>
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SettingsScreen;