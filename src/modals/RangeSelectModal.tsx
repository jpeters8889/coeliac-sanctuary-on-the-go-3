import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Styles from '../Styles/Styles';
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
    ...Styles.p4,
    ...Styles.px16,
    ...Styles.borderBottom,
    ...Styles.borderGreyOff,
    ...Styles.textLg,
    ...Styles.overflowHidden,
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
          ...(props.currentRange === 1 ? Styles.bgGreyOff : ''),
        }}
        >
          1 Mile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(2)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 2 ? Styles.bgGreyOff : ''),
        }}
        >
          2 Miles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(5)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 5 ? Styles.bgGreyOff : ''),
        }}
        >
          5 Miles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(10)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 10 ? Styles.bgGreyOff : ''),
        }}
        >
          10 Miles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectRange(20)}>
        <Text style={{
          ...rangeSelectStyles,
          ...(props.currentRange === 20 ? Styles.bgGreyOff : ''),
        }}
        >
          20 Miles
        </Text>
      </TouchableOpacity>
    </ModalContainer>
  );
}
