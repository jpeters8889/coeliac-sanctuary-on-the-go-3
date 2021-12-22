import React from 'react';
import {
  Modal, Text, TouchableOpacity, View,
} from 'react-native';
import Global from '../Styles/Global';
import { ModalProps, SearchRange } from '../types';

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
        ...Global.itemsCenter,
        ...Global.justifyCenter,
      }}
      >
        <View style={{
          ...Global.bgWhite,
          ...Global.itemsCenter,
          ...Global.justifyCenter,
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
        </View>
      </View>
    </Modal>
  );
}
