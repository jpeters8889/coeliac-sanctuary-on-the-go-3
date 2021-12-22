import React from 'react';
import { Modal, Text, View } from 'react-native';
import Global from '../Styles/Global';
import { ModalProps } from '../types';
import Accordion from '../Components/UI/Accordion';

type Props = {
  props: ModalProps & {
    //
  }
};

export default function FilterSelectModal({ props }: Props) {
  const closeModal = () => {
    props.onClose();
  };

  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => closeModal()}
      transparent
    >
      <View style={{
        ...Global.flex1,
        ...Global.bgModal,
        ...Global.wFull,
        ...Global.hFull,
        ...Global.itemsEnd,
        ...Global.justifyEnd,
      }}
      >
        <View style={{
          ...Global.h90,
          ...Global.wFull,
          ...Global.bgWhite,
          ...Global.pb6,
          ...Global.roundedTopLg,
        }}
        >
          <Accordion props={{
            title: 'Hello',
          }}
          >
            <Text>Foo</Text>
            <Text>Bar</Text>
          </Accordion>
        </View>
      </View>
    </Modal>
  );
}
