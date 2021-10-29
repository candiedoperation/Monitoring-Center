import 'react-native-gesture-handler';
import React from "react";
import AppBar from "../components/AppBar";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import SettingsScreen from './SettingsScreen';
import AboutScreen from './AboutScreen';

const Drawer = createDrawerNavigator();

const ApplicationInterface = (props) => {
    return (
        <NavigationContainer theme={props.navigationtheme}>
            <Drawer.Navigator initialRouteName="Home" screenOptions={{ header: AppBar }}>
                <Drawer.Screen name="Home" component={MainScreen} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
                <Drawer.Screen name="Help" component={SettingsScreen} />
                <Drawer.Screen name="Licenses" component={AboutScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default ApplicationInterface;