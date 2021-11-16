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

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const initializeStorageKey = (keyIdentifier, callback) => {
  console.log('INF LOOP WARN: Request to Initialize Storage Key');
  AsyncStorage.setItem(keyIdentifier, JSON.stringify({}), callback);
};

function addComputer(computerAddress, computerAuth, callback) {
  AsyncStorage.getItem('@computers', (error, response) => {
    if (response == null) {
      initializeStorageKey('@computers', () => { addComputer(computerAddress, computerAuth); });
    } else {
      AsyncStorage.getItem('@computers', (error, existingComputers) => {
        existingComputers = JSON.parse(existingComputers);
        existingComputers[uuid.v4()] = { computerAddress, computerAuth };
        AsyncStorage.setItem('@computers', JSON.stringify(existingComputers), callback);
      });
    }
  });
}

function exportStorageData(resolve) {
  AsyncStorage.getAllKeys(async (error, storageKeys) => {
    AsyncStorage.multiGet(storageKeys, (error, storageData) => {
      resolve(JSON.stringify(storageData));
    });
  });
}

function importStorageData(storageData, reject, resolve) {
  AsyncStorage.multiSet(storageData, (error) => {
    if (!error) {
      resolve();
    } else {
      console.log(error);
      reject(error);
    }
  });
}

function fetchComputers(resolve) {
  AsyncStorage.getItem('@computers', (error, computersList) => {
    if (computersList == null) {
      initializeStorageKey('@computers', () => { });
      resolve({});
    } else {
      console.log(JSON.parse(computersList));
      resolve(JSON.parse(computersList));
    }
  });
}

function fetchComputer(computerUUID, resolve) {
  AsyncStorage.getItem('@computers', (error, computersList) => {
    computersList = JSON.parse(computersList); // FETCH ACK was used to log used
    resolve(computersList[computerUUID]);
  });
}

function fetchMiscKey(keyName, resolve) {
  AsyncStorage.getItem(keyName, (error, keyData) => {
    keyData = JSON.parse(keyData);
    resolve(keyData);
  });
}

function setMiscKey(keyName, keyData, resolve) {
  AsyncStorage.setItem(keyName, JSON.stringify(keyData), resolve);
}

function deleteComputer(computerUUID, resolve) {
  AsyncStorage.getItem('@computers', (error, computersList) => {
    computersList = JSON.parse(computersList);
    delete computersList[computerUUID];
    computersList = JSON.stringify(computersList);

    AsyncStorage.setItem('@computers', computersList, (error) => {
      if (!error) {
        resolve();
      }
    });
  });
}

function setPrivateKey(keyName, keyData, resolve, reject) {
  AsyncStorage.setItem('@privatekey', JSON.stringify({
    keyName,
    keyData,
  }), (error) => {
    if (!error) {
      resolve();
    } else {
      reject(error);
    }
  });
}

function getPrivateKey(resolve, reject) {
  AsyncStorage.getItem('@privatekey', (error, keyData) => {
    if (error || keyData == null || keyData.trim() == '') {
      reject(error);
    } else {
      resolve(JSON.parse(keyData));
    }
  });
}

// deleteStorageKey IS ONLY FOR DEBUGGING PURPOSES
function deleteStorageKey(keyIdentifier, resolve, reject) {
  AsyncStorage.removeItem(keyIdentifier, (error) => {
    if (!error && resolve) {
      resolve();
    } else {
      reject(error);
    }
  });
}

export {
  addComputer,
  fetchComputers,
  fetchComputer,
  exportStorageData,
  importStorageData,
  deleteStorageKey,
  deleteComputer,
  getPrivateKey,
  setPrivateKey,
  fetchMiscKey,
  setMiscKey,
  initializeStorageKey,
};
