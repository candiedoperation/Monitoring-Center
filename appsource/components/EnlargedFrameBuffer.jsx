import axios from "axios";
import React from "react";
import { Buffer } from "buffer";
import ImageView from "react-native-image-viewing";
import { Portal } from "react-native-paper";
import { computerDisplayTheme } from "../themes/bubblegum";
import FastImage from "react-native-fast-image";

const EnlargedFrameBuffer = React.forwardRef((props, ref) => {
    var bufferInterval;
    const [visible, setVisible] = React.useState(false);
    const [frameBuffer, setFrameBuffer] = React.useState("");

    React.useImperativeHandle(ref, () => ({
        requestFullScreenDisplay(APIKey, connectionAddress) {
            if (frameBuffer == "") {
                bufferInterval = setInterval(
                    () => {
                        bufferImages(APIKey, connectionAddress)
                    },
                    1000);
            }

            setVisible(true);
        }
    }));

    function bufferImages(APIKey, connectionAddress) {

    }

    function handleSelfClosure() {
        setVisible(false);
        clearInterval(bufferInterval);
        setFrameBuffer("");
    }

    return (
        <Portal>
            <FastImage
                source={{ uri: frameBuffer }}
            />
        </Portal>
    );
});

export default EnlargedFrameBuffer;