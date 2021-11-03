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
import axios from 'axios';
import { Button, Title, Card, Caption } from 'react-native-paper';
import { Flex } from 'native-base';
import { computerDisplayTheme } from '../themes/bubblegum';
import { getPrivateKey } from '../controllers/StorageController';


const ComputerDisplay = (props) => {
    var frameBufferInterval;
    var APIKey = { authData: {}, connectionUid: "", validUntil: 0 };
    const [frameBufferURL, setFrameBufferURL] = React.useState("");
    const [computerTitle, setComputerTitle] = React.useState("Connecting…");

    switch (props.computerAuth) {
        case "0c69b301-81b4-42d6-8fae-128cdd113314":
            getPrivateKey(
                (keyData) => {
                    completeAuthentication({
                        method: props.computerAuth,
                        credentials: {
                            keyname: keyData.keyName,
                            keydata: keyData.keyData
                        }
                    });
                },
                (error) => {
                    setComputerTitle("Authentication Not Setup")
                }
            );
            break;

        case "6f0a491e-c1c6-4338-8244-f823b0bf8670":
            //AUTH LDAP
            break;

        case "63611f7c-b457-42c7-832e-67d0f9281085":
            //AUTH LOGON
            break;

        case "73430b14-ef69-4c75-a145-ba635d1cc676":
            //AUTH SIMPLE
            break;

        default:
            break;
    }

    function completeAuthentication(authenticationData) {
        axios.post(props.computerAddress, authenticationData)
            .then((response) => {
                APIKey.authData = authenticationData;
                APIKey.connectionUid = response.data["connection-uid"];
                APIKey.validUntil = response.data["validUntil"];

                getFrameBuffer();
                frameBufferInterval = setInterval(getFrameBuffer, 3500);
            })
            .catch(function (error) {
                setComputerTitle("Authentication Failed")
            });
    }

    function getFrameBuffer() {
        if ((new Date().getTime() / 1000) >= APIKey.validUntil) {
            clearInterval(frameBufferInterval);
            setFrameBufferURL("");
            setComputerTitle("Connecting…");
            completeAuthentication(APIKey.authData);
        } else {
            axios.get(`${props.computerAddress.split("/")[0]}//${props.computerAddress.split("/")[2]}/api/v1/framebuffer?monitoringCenterTime=${new Date().getTime()}`, {
                headers: { "Connection-Uid": APIKey.connectionUid },
                withCredentials: true,
                crossDomain: true
            }).then((response) => {
                //console.log(response);
            }).catch((error) => {
                console.log(error.toJSON());
                clearInterval(frameBufferInterval);
                setComputerTitle("Server Error")
                setFrameBufferURL("");
            });
        }
    }

    return (
        <Card margin={8} elevation={4}>
            <Card.Cover source={frameBufferURL == "" ? computerDisplayTheme.displayInderminate : frameBufferURL} />
            <Card.Actions>
                <Flex flexShrink={1} flexDirection="column" marginLeft={1}>
                    <Title ellipsizeMode={frameBufferURL == "" ? "tail" : "head"} numberOfLines={1}>{computerTitle == "" ? "Connecting…" : computerTitle}</Title>
                    <Caption numberOfLines={1}>{props.computerAddress.split("/")[2]}</Caption>
                </Flex>
                <Flex style={{ flexGrow: 1, flexDirection: "row-reverse" }}>
                    <Button disabled={frameBufferURL == "" ? true : false} mode="contained">View</Button>
                    <Button disabled={frameBufferURL == "" ? true : false}>Actions</Button>
                </Flex>
            </Card.Actions>
        </Card>
    );
}

export default ComputerDisplay;