import React from 'react';
import { Modal, Text, View } from 'react-native';
import Global from '../Styles/Global';
import { ModalProps } from '../types';
import Accordion from '../Components/UI/Accordion';
import ModalContainer from '../Components/UI/ModalContainer';

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
    <ModalContainer props={{
      title: 'Filters',
      fullScreen: true,
      onClose: closeModal,
    }}
    >
      <Accordion props={{
        title: 'Hello',
        bottomBorder: true,
      }}
      >
        <Text>Foo</Text>
        <Text>Bar</Text>
      </Accordion>
    </ModalContainer>
  );
}
