import React, { ReactComponentElement } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import Styles from '../../../Styles/Styles';
import { notEmpty } from '../../../helpers';

type Props = {
  props: {
    onPress: () => void,
    bottomMargin?: boolean,
    label: string,
    icon: false | ReactComponentElement<any>,
  },
};

export default function SideButton({ props }: Props) {
  return (
    <TouchableOpacity
      style={{
        ...Styles.bgYellow,
        ...Styles.py2,
        ...Styles.px4,
        ...Styles.rounded,
        ...Styles.flexRow,
        ...Styles.justifyBetween,
        ...(props.bottomMargin ? Styles.mb2 : ''),
      }}
      onPress={() => props.onPress()}
    >
      <Text style={{
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
        ...Styles.mr2,
      }}
      >
        {props.label}
      </Text>
      {notEmpty(props.icon) && props.icon}
    </TouchableOpacity>
  );
}
