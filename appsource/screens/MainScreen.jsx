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
import { Provider } from 'react-native-paper';
import AddComputer from '../components/AddComputer.jsx';
import ConfiguredLaunch from '../components/ConfiguredLaunch.jsx';
import FirstLaunch from '../components/FirstLaunch.jsx';
import { fetchComputers, setPrivateKey } from '../controllers/StorageController.js';
import { monitoringTheme } from '../themes/bubblegum.js';
import EnlargedFrameBuffer from '../components/EnlargedFrameBuffer.jsx';

const MainScreen = React.forwardRef((props, ref) => {
    const AddComputerModalReference = React.useRef();
    const EnlargedFrameBufferReference = React.useRef();
    const [isListEmpty, setListEmpty] = React.useState(true); //fetchComputers

    React.useImperativeHandle(ref, () => ({
        requestShowAddComputerDialog() {
            handleAddModalRequest();
        }
    }));

    function handleAddModalRequest() {
        AddComputerModalReference.current.requestModalVisibility(true);
    }

    function handleFullScreenRequest (APIKey, connectionAddress) {
        EnlargedFrameBufferReference.current.requestFullScreenDisplay(APIKey, connectionAddress);
    }

    setPrivateKey("atheesh", "<PRIVATE-KEY>", () => { }, () => { });

    fetchComputers((computerList) => {
        if (Object.keys(computerList).length != 0) {
            setListEmpty(false);
        } else {
            setListEmpty(true);
        }
    });

    return (
        <Provider theme={monitoringTheme}>
            <ConfiguredLaunch
                enlargeDisplay={handleFullScreenRequest}
                style={{
                    flexGrow: 1,
                    minHeight: "100%",
                    display: (isListEmpty == false ? "flex" : "none")
                }}
            />

            <FirstLaunch
                navigation={props.navigation}
                requestAddComputerModal={handleAddModalRequest}
                style={{
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: (isListEmpty == true ? "flex" : "none")
                }}
            />

            <AddComputer navigation={props.navigation} ref={AddComputerModalReference}></AddComputer>
            <EnlargedFrameBuffer ref={EnlargedFrameBufferReference} />            
        </Provider>
    );
})

export default MainScreen;