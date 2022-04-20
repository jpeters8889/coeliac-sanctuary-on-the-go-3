import React from 'react';
import { View, Platform, Text } from 'react-native';
import Styles from '../../Styles/Styles';
import { UserReview } from '../../types';

type Props = {
  props: {
    adminReview: UserReview,
  },
};

export default function PlaceAdminReview({ props }: Props) {
  return (
    <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
      <Text style={{
        ...Styles.textLg,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        Our Review
      </Text>
    </View>
  );
}
