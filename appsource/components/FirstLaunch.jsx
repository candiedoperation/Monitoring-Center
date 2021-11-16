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
import { Button, Title, Avatar } from 'react-native-paper';
import { Flex, ScrollView } from 'native-base';

const FirstLaunch = (props) => (
  <ScrollView contentContainerStyle={{ height: '100%' }}>
    <Flex height="90%" alignItems="center" justifyContent="center">
      <Avatar.Icon size={128} backgroundColor="transparent" color="#bc245d" icon="devices" />
      <Title style={{ marginBottom: 10 }}>It's Empty in Here…</Title>
      <Flex>
        <Button style={{ margin: 5 }} icon="plus" mode="contained" onPress={props.requestAddComputerModal}>Add a Computer</Button>
        <Button style={{ margin: 5 }} mode="outlined" onPress={() => props.navigation.navigate('Help')}>Need Help ?</Button>
      </Flex>
    </Flex>
  </ScrollView>
);

export default FirstLaunch;
