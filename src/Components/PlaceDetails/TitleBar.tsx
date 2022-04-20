import React, { ReactElement } from 'react';
import {
  View, Platform, Text, TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Styles from '../../Styles/Styles';

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
      ...Styles.flexRow,
      ...Styles.justifyBetween,
      ...Styles.itemsCenter,
      ...Styles.absolute,
      ...Styles.top0,
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
            ...(Platform.OS === 'android' ? {
              ...Styles.text2Xl,
              ...Styles.fontBold,
            } : { ...Styles.textLg, ...Styles.fontSemibold }),
          }}
        >
          {props.placeName}
        </Text>
      )}

      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
