import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { DefaultTheme as NavigatorDefaultTheme } from '@react-navigation/native';
import ApplicationInterface from './appsource/screens/ApplicationInterface';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';

const monitoringTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#bc245d",
    accent: "#8a715e"
  }
}

const navigationTheme = {
  ...NavigatorDefaultTheme,
  colors: {
    ...NavigatorDefaultTheme.colors,
    primary: "#bc245d"
  }
}

export default function App() {
  return (
    <NativeBaseProvider>
      <PaperProvider theme={monitoringTheme}>
        <ApplicationInterface navigationtheme={navigationTheme}></ApplicationInterface>
      </PaperProvider>

      <StatusBar style="auto" backgroundColor="#bc245d" translucent={false}></StatusBar>
    </NativeBaseProvider>
  );
}