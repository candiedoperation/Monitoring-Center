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

import axios from "axios";
import React from "react";
import { Buffer } from "buffer";
import { ActivityIndicator, Button, Dialog, Portal, Provider } from "react-native-paper";
import { PinchGestureHandler } from "react-native-gesture-handler";
import { computerDisplayTheme, frameBufferTheme, monitoringTheme } from "../themes/bubblegum";
import FastImage from "react-native-fast-image";
import { ScrollView, Flex } from "native-base";
import { Dimensions, ImageBackground } from "react-native";

const EnlargedFrameBuffer = React.forwardRef((props, ref) => {
    const [bufferInterval, setBufferInterval] = React.useState();
    const [visible, setVisible] = React.useState(false);
    const [frameBufferURL, setFrameBufferURL] = React.useState("");
    const [frameBufferBackground, setFrameBufferBackground] = React.useState(computerDisplayTheme.frameBufferIndeterminate);
    const [frameBufferDimensions, setFrameBufferDimensions] = React.useState({ width: "100%", height: 10 });
    const [frameBufferOrientation, setFrameBufferOrientation] = React.useState(false); //true for portrait and false for landscape
    const [renderUUID, requestRender] = React.useState(0);
    const getRandomId = () => parseInt(Math.random() * 100, 10);

    React.useImperativeHandle(ref, () => ({
        requestFullScreenDisplay(APIKey, connectionAddress) {
            if (frameBufferURL == "") {
                setBufferInterval(setInterval(
                    () => {
                        bufferImages(APIKey, connectionAddress)
                    },
                    1500));
            }

            setVisible(true);
        }
    }));

    function bufferImages(APIKey, connectionAddress) {
        if ((new Date().getTime() / 1000) >= APIKey.validUntil) {
            //API Key Expired
            handleSelfClosure();
        } else {
            axios.get(connectionAddress, {
                headers: { "connection-uid": APIKey.connectionUid, Accept: "image/jpeg" },
                responseType: 'arraybuffer',
                withCredentials: true,
                crossDomain: true
            }).then((response) => {
                console.log(`Refreshing Frame Buffer @213049: ${new Date().getTime()}`)
                setFrameBufferURL({
                    uri: `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`
                });
            }).catch((error) => {
                console.log(error);
                handleSelfClosure();
            });
        }
    }

    function handleSelfClosure() {
        setVisible(false);
        clearInterval(bufferInterval);
        setFrameBufferURL("");
        setFrameBufferBackground("");
    }

    function calculateFrameBufferDimensions(frameBufferDimensions) {
        /*
         * Initally Planned to make aspect ratio fit based on orientation but,
         * later decided to add scrollbars to prevent implementation of pinch to zoom 
         */

        setFrameBufferDimensions((frameBufferOrientation == true) ? {
            width: Dimensions.get('window').width,
            height: (frameBufferDimensions.nativeEvent.height / frameBufferDimensions.nativeEvent.width) * Dimensions.get('window').width
        } : {
            height: Dimensions.get('window').height,
            width: (frameBufferDimensions.nativeEvent.width / frameBufferDimensions.nativeEvent.height) * Dimensions.get('window').height
        });
    }

    return (
        <Provider theme={frameBufferTheme}>
            <Portal>
                <Dialog style={{ height: "100%", marginTop: 0, marginLeft: 0, marginRight: 0 }} visible={visible} onDismiss={handleSelfClosure}>
                    <ScrollView alignSelf="center">
                        <ScrollView horizontal={true}>
                            <ImageBackground
                                resizeMode="contain"
                                style={{ alignSelf: "center", width: frameBufferDimensions.width, height: frameBufferDimensions.height }}
                                source={frameBufferURL == "" ? computerDisplayTheme.frameBufferIndeterminate : frameBufferBackground}
                            >
                                <FastImage
                                    onLoad={calculateFrameBufferDimensions}
                                    onLoadEnd={() => { setFrameBufferBackground(frameBufferURL) }}
                                    style={{ alignSelf: "center", width: frameBufferDimensions.width, height: frameBufferDimensions.height }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={frameBufferURL == "" ? computerDisplayTheme.frameBufferIndeterminate : frameBufferURL}
                                />
                            </ImageBackground>
                        </ScrollView>
                    </ScrollView>
                    <Button icon="close" theme={frameBufferTheme} style={{ position: 'absolute', opacity: 0.6, margin: 5 }} onPress={handleSelfClosure} mode="contained">Close</Button>
                    <ActivityIndicator color="#ffffff" animating={(frameBufferURL == "") ? true : false} style={{ position: 'absolute', alignSelf: 'center', marginTop: 30 }}></ActivityIndicator>                        
                </Dialog>
            </Portal>
        </Provider>
    );
});

export default EnlargedFrameBuffer;