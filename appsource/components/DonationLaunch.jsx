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

/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { Flex, ScrollView } from 'native-base';
import ComputerDisplay from './ComputerDisplay';
import { fetchComputers } from '../controllers/StorageController';
import DonationPerkBanner from './DonationPerkBanner';

const DonationLaunch = (props) => {
  const [configuredComputers, setConfiguredComputers] = React.useState([]);

  React.useEffect(() => {
    fetchComputers((computersList) => {
      console.log('Re-Rendering Elements');
      const configuredComputers = [];

      for (const [uuid, data] of Object.entries(computersList)) {
        console.log(`${uuid}: ${JSON.stringify(data)}`);

        configuredComputers.push(
          <ComputerDisplay
            key={uuid}
            actionsRequest={props.actionsRequest}
            enlargeDisplay={props.enlargeDisplay}
            computerUUID={uuid}
            computerAddress={data.computerAddress}
            computerAuth={data.computerAuth}
          />,
        );
      }

      setConfiguredComputers(configuredComputers);
    });
  }, [props.renderUUID]);

  return (
    <Flex>
      <ScrollView>
        <DonationPerkBanner visible={true} />
        {configuredComputers}
      </ScrollView>
    </Flex>
  );
};

export default DonationLaunch;
