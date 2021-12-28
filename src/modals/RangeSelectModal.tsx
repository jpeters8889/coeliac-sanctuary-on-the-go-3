import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Style from '../Styles/Styles';
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
    ...Style.p4,
    ...Style.px16,
    ...Style.borderBottom,
    ...Style.borderGreyOff,
    ...Style.textLg,
    ...Style.overflowHidden,
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
          ...(props.currentRange === 1 ? Style.bgGreyOff : ''),
        }}
        >
          1 Mile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(2)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 2 ? Style.bgGreyOff : ''),
        }}
        >
          2 Miles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(5)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 5 ? Style.bgGreyOff : ''),
        }}
        >
          5 Miles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(10)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 10 ? Style.bgGreyOff : ''),
        }}
        >
          10 Miles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(20)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 20 ? Style.bgGreyOff : ''),
        }}
        >
          20 Miles
        </Text>
      </TouchableOpacity>
    </ModalContainer>
  );
}
