import React from 'react';
import { List, Checkbox } from 'react-native-paper';

const DiscoveredComputer = (props) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <List.Item
      title={props.title}
      description={props.description}
      onPress={() => { checked ? setChecked(false) : setChecked(true); }}
      left={(props) => (
        <Checkbox
          {...props}
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      )}
    />
  );
};

export default DiscoveredComputer;
