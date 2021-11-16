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

/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'native-base';
import { Text } from 'react-native-paper';
import { fetchMiscKey } from '../controllers/StorageController';

const DonationPerkBanner = (props) => {
  const [donorName, setDonorName] = React.useState('');

  fetchMiscKey('@patreonData', (patreonData) => {
    if (patreonData != null) setDonorName(`👋️ Hello ${JSON.parse(patreonData).firstName}, `);
  });

  return (
    <View style={{ display: (props.visible === true ? 'flex' : 'none') }} padding={15}>
      <Text>
        {donorName}You're Helping make Monitoring Center Better Day-by-Day.
        We Thank You for your Generous Donation.
      </Text>
    </View>
  );
};

export default DonationPerkBanner;
