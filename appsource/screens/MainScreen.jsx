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

/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-native-paper';
import AddComputer from '../components/AddComputer';
import ConfiguredLaunch from '../components/ConfiguredLaunch';
import FirstLaunch from '../components/FirstLaunch';
import { fetchComputers, setPrivateKey } from '../controllers/StorageController';
import { monitoringProTheme, monitoringTheme } from '../themes/bubblegum';
import EnlargedFrameBuffer from '../components/EnlargedFrameBuffer';
import FeatureImplementation from '../components/FeatureImplementation';
import FeatureGenericModal from '../components/FeatureGenericModal';
import AutoDiscoveryRequest from '../components/AutoDiscoveryRequest';
import AutoDiscoveryModal from '../components/AutoDiscoveryModal';
import DonationLaunch from '../components/DonationLaunch';

const MainScreen = React.forwardRef((props, ref) => {
  const AddComputerModalReference = React.useRef();
  const AutoAddModalReference = React.useRef();
  const AutoAddComputerModalReference = React.useRef();
  const EnlargedFrameBufferReference = React.useRef();
  const FeatureImplementationReference = React.useRef();
  const FeatureGenericModalReference = React.useRef();
  const [isListEmpty, setListEmpty] = React.useState(true); // fetchComputers
  const [renderUUID, requestReRender] = React.useState(0);
  const getRandomId = () => parseInt(Math.random() * 100, 10);

  React.useImperativeHandle(ref, () => ({
    requestShowAutoAddComputerDialog() {
      // eslint-disable-next-line no-use-before-define
      handleAutoAddModalRequest();
    },
    requestDataRefresh() {
      // eslint-disable-next-line no-use-before-define
      requestMainScreenRefresh();
    },
  }));

  function handleAddModalRequest() {
    AddComputerModalReference.current.requestModalVisibility(true);
  }

  function handleAutoAddModalRequest() {
    AutoAddComputerModalReference.current.requestModalVisibility(true);
  }

  function handleAutoStartModalRequest() {
    AutoAddModalReference.current.requestModalVisibility(true);
  }

  function handleFullScreenRequest(APIKey, connectionAddress) {
    EnlargedFrameBufferReference.current.requestFullScreenDisplay(APIKey, connectionAddress);
  }

  function handleActionsRequest(connectionData) {
    FeatureImplementationReference.current.requestModalVisibility(connectionData);
  }

  function requestMainScreenRefresh() {
    // eslint-disable-next-line no-console
    console.log('Main Screen ReRender Requested');
    requestReRender(getRandomId());
  }

  function handleGenericModalToggle(featureID, featureData, internalConnectionData) {
    FeatureGenericModalReference.current.requestModalVisibility(
      featureID,
      featureData,
      internalConnectionData,
    );
  }

  setPrivateKey('monitoringcenter', '<PRIVATE-KEY>', () => { }, () => { });

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.warn('Checking State and Replacing');
    fetchComputers((computerList) => {
      if (Object.keys(computerList).length !== 0) {
        setListEmpty(false);
      } else {
        setListEmpty(true);
      }
    });
  }, [renderUUID]);

  return (
    <Provider theme={props.donationLevel > 1 ? monitoringProTheme : monitoringTheme}>
      {
        // eslint-disable-next-line no-nested-ternary
        (isListEmpty === true)
          ? (
            <FirstLaunch
              donationLevel={props.donationLevel}
              navigation={props.navigation}
              requestAddComputerModal={handleAutoAddModalRequest}
              renderUUID={renderUUID}
              primaryColor={
                props.donationLevel > 1
                  ? monitoringProTheme.colors.primary
                  : monitoringTheme.colors.primary
              }
              style={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
                display: (isListEmpty === true ? 'flex' : 'none'),
              }}
            />
          ) : (props.donationLevel > 1)
            ? (
              <DonationLaunch
                donationLevel={props.donationLevel}
                enlargeDisplay={handleFullScreenRequest}
                actionsRequest={handleActionsRequest}
                renderUUID={renderUUID}
                style={{
                  flexGrow: 1,
                  minHeight: '100%',
                  display: (isListEmpty === false ? 'flex' : 'none'),
                }}
              />
            )
            : (
              <ConfiguredLaunch
                donationLevel={props.donationLevel}
                donationModalRequest={props.donationModalRequest}
                enlargeDisplay={handleFullScreenRequest}
                actionsRequest={handleActionsRequest}
                renderUUID={renderUUID}
                style={{
                  flexGrow: 1,
                  minHeight: '100%',
                  display: (isListEmpty === false ? 'flex' : 'none'),
                }}
              />
            )
      }

      <AutoDiscoveryRequest
        donationLevel={props.donationLevel}
        autoAdd={handleAutoStartModalRequest}
        manualAdd={handleAddModalRequest}
        theme={props.donationLevel > 1 ? monitoringProTheme : monitoringTheme}
        ref={AutoAddComputerModalReference}
      />
      <AddComputer
        donationLevel={props.donationLevel}
        navigation={props.navigation}
        theme={props.donationLevel > 1 ? monitoringProTheme : monitoringTheme}
        requestRefresh={requestMainScreenRefresh}
        ref={AddComputerModalReference}
      />
      <AutoDiscoveryModal
        donationLevel={props.donationLevel}
        theme={props.donationLevel > 1 ? monitoringProTheme : monitoringTheme}
        ref={AutoAddModalReference}
      />
      <FeatureImplementation
        donationLevel={props.donationLevel}
        theme={props.donationLevel > 1 ? monitoringProTheme : monitoringTheme}
        genericModalToggle={handleGenericModalToggle}
        requestRefresh={requestMainScreenRefresh}
        ref={FeatureImplementationReference}
      />
      <FeatureGenericModal
        donationLevel={props.donationLevel}
        theme={props.donationLevel > 1 ? monitoringProTheme : monitoringTheme}
        ref={FeatureGenericModalReference}
      />
      <EnlargedFrameBuffer
        theme={props.donationLevel > 1 ? monitoringProTheme : monitoringTheme}
        ref={EnlargedFrameBufferReference}
      />
    </Provider>
  );
});

export default MainScreen;
