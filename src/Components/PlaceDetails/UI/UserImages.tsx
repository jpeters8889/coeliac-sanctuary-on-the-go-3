import React from 'react';
import { View, Platform, Text } from 'react-native';
import Styles from '../../../Styles/Styles';
import { ReviewImage } from '../../../types';
import EateryImages from './EateryImages';

type Props = {
  props: {
    name: string;
    images: ReviewImage[]
  },
};

export default function UserImages({ props }: Props) {
  return (
    <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
      <Text style={{
        ...Styles.textLg,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        Visitor Photos
      </Text>

      <View style={Styles.mt4}>
        <Text>
          Here are some photos taken by visitors to
          {' '}
          {props.name}
        </Text>

        <EateryImages props={{ images: props.images, limit: 4 }} />
      </View>
    </View>
  );
}
