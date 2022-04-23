import React, { ReactElement } from 'react';
import {
  View, Platform, Text, TouchableOpacity,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Styles from '../../../Styles/Styles';
import { BLACK } from '../../../constants';

type Props = {
  props: {
    isLoading: boolean,
    placeName: string,
    navigation: StackNavigationProp<any>
  },
};

export default function TitleBar({ props }: Props) {
  return (
    <View style={{
      ...Styles.bgBlueLight,
      ...Styles.p2,
      ...Styles.pt12,
      ...Styles.flexRow,
      ...Styles.justifyBetween,
      ...Styles.itemsCenter,
      ...Styles.wFull,
      ...(Platform.OS === 'android' ? {
        ...Styles.borderTop,
        ...Styles.borderGrey,
        ...Styles.mt10,
      } : ''),
    }}
    >
      {props.isLoading && <Text style={Styles.textLg}>Loading...</Text>}
      {!props.isLoading && (
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{
            ...Styles.text2Xl,
            ...(Platform.OS === 'android' ? Styles.fontBold : Styles.fontSemibold),
          }}
        >
          {props.placeName}
        </Text>
      )}

      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={BLACK} />
      </TouchableOpacity>
    </View>
  );
}
