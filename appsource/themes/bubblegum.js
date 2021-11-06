import { DefaultTheme as NavigatorDefaultTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

const displayInderminateImage = require('./indeterminateDisplay.png');

const monitoringTheme = {
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
        ...PaperDefaultTheme.colors,
        primary: "#bc245d",
        accent: "#8a715e"
    }
}

const frameBufferTheme = {
    ...monitoringTheme, 
    colors: {
        backdrop: "#000000"        
    }
}

const navigationTheme = {
    ...NavigatorDefaultTheme,
    colors: {
        ...NavigatorDefaultTheme.colors,
        primary: "#bc245d"
    }
}

const computerDisplayTheme = {
    displayInderminate: require('./indeterminateDisplay.png')
}

export { monitoringTheme, navigationTheme, computerDisplayTheme, frameBufferTheme };