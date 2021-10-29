import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

export const AddComputer = forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);

  useImperativeHandle(ref, () => ({
    requestModalVisibility (modalState) {
      setVisible (modalState);
    }
  }));

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={() => { setVisible(false); }} contentContainerStyle={props.style}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </Provider>
  );
});

export default AddComputer;