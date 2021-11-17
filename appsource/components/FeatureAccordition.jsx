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

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { List } from 'react-native-paper';
import { serviceStatus } from '../themes/bubblegum';

const FeatureAccordition = (props) => {
  const [parentTitle, setParentTitle] = React.useState();
  const [parentDescription, setParentDescription] = React.useState();
  const [featureChildren, setFeatureChildren] = React.useState([]);
  const [featureActiveColor, setFeatureActiveColor] = React.useState('#7e8087');

  const supportedChildFeatures = [];

  React.useEffect(() => {
    switch (props.featureID) {
      case 'ccb535a2-1d24-4cc1-a709-8b47d2b2ac79':
        setParentTitle('Screen Lock');
        break;

      case 'e4a77879-e544-4fec-bc18-e534f33b934c':
        setParentTitle('Lock Input Devices');
        break;

      case '7311d43d-ab53-439e-a03a-8cb25f7ed526':
        setParentTitle('LogOff User');
        break;

      case '6f5a27a0-0e2f-496e-afcc-7aae62eede10':
        setParentTitle('Power Down');
        break;

      case 'da9ca56a-b2ad-4fff-8f8a-929b2927b442':
        setParentTitle('Start Application');
        break;

      case '8a11a75d-b3db-48b6-b9cb-f8422ddd5b0c':
        setParentTitle('Open Website');
        break;

      case 'e75ae9c8-ac17-4d00-8f0d-019348346208':
        setParentTitle('Send Message');
        break;

      default:
        setParentTitle(props.featureData.name);
        break;
    }

    if (props.featureData.children.length != 0) {
      props.featureData.children.forEach((childFeature) => {
        featureChildren.push(
          <List.Item
            key={childFeature.uuid}
            title={childFeature.name}
            onPress={() => {
              props.genericModalToggle(
                childFeature.uuid,
                childFeature,
              );
            }}
          />,
        );
      });
    } else {
      featureChildren.push(
        <List.Item
          key={props.featureID}
          title="Apply for This Computer"
          onPress={() => {
            props.genericModalToggle(
              props.featureID,
              props.featureData,
            );
          }}
        />,
      );
    }

    // eslint-disable-next-line no-unused-expressions
    props.featureData.active === true
      ? setFeatureActiveColor(serviceStatus.serviceActive)
      : setFeatureActiveColor(serviceStatus.serviceDisabled);
  }, []);

  return (
    <List.Accordion id={props.featureID} left={(propsInternal) => <List.Icon {...propsInternal} color={featureActiveColor} icon="circle" />} title={parentTitle} description={parentDescription}>
      {featureChildren}
    </List.Accordion>
  );
};
// All tyeps in this.
// Check uuid in main func and return an internal func as componeent

export default FeatureAccordition;
