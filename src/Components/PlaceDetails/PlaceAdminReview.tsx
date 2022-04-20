import React from 'react';
import { View, Platform, Text } from 'react-native';
import Styles from '../../Styles/Styles';
import { UserReview } from '../../types';
import EateryReview from './Reviews/EateryReview';

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
        ...Styles.mb2,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        Our Review
      </Text>

      <EateryReview item={props.adminReview} />
    </View>
  );
}
