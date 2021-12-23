import React from 'react';
import {
  Modal, Text, TouchableOpacity, View,
} from 'react-native';
import Global from '../Styles/Global';
import { ModalProps, SearchRange } from '../types';
import ModalContainer from '../Components/UI/ModalContainer';

type Props = {
  props: ModalProps & {
    currentRange: SearchRange;
    setRange: (range: SearchRange) => void;
  }
};

export default function RangeSelectModal({ props }: Props) {
  const closeModal = () => {
    props.onClose();
  };

  const selectRange = async (selectedRange: SearchRange) => {
    await props.setRange(selectedRange);
    closeModal();
  };

  const rangeSelectStyles = {
    ...Global.p4,
    ...Global.px16,
    ...Global.borderBottom,
    ...Global.borderGreyOff,
    ...Global.textLg,
    ...Global.overflowHidden,
    width: 200,
  };

  return (
    <ModalContainer props={{
      onClose: closeModal,
      title: 'Search Range',
    }}
    >
      <TouchableOpacity onPress={() => selectRange(1)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 1 ? Global.bgGreyOff : ''),
        }}
        >
          1 Mile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(2)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 2 ? Global.bgGreyOff : ''),
        }}
        >
          2 Miles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(5)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 5 ? Global.bgGreyOff : ''),
        }}
        >
          5 Miles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(10)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 10 ? Global.bgGreyOff : ''),
        }}
        >
          10 Miles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(20)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 20 ? Global.bgGreyOff : ''),
        }}
        >
          20 Miles
        </Text>
      </TouchableOpacity>
    </ModalContainer>
  );
}
