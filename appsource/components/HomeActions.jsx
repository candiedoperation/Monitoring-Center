import React from 'react';
import { Portal, FAB } from 'react-native-paper';

const HomeActions = (props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'star',
              label: 'Star',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'email',
              label: 'Email',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed notifications'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
  );
};

export default HomeActions;
