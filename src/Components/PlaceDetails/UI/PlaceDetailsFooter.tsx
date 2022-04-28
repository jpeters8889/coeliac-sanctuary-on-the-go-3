import React from 'react';
import { View, Platform, Text } from 'react-native';
import dayjs from 'dayjs';
import Styles from '../../../Styles/Styles';
import { Eatery } from '../../../types';

type Props = {
  props: {
    eatery: Eatery,
    setShowReportProblemModal: (show: boolean) => any,
  },
};

export default function PlaceDetailsFooter({ props }: Props) {
  return (
    <View style={Styles.p2}>
      <Text style={Styles.italic}>
        This location was added to our database on
        {' '}
        {dayjs(props.eatery.created_at).format('DD/MM/YYYY')}
      </Text>
      <Text
        style={{
          ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
          ...Styles.pt2,
          ...Styles.mb8,
        }}
        onPress={() => props.setShowReportProblemModal(true)}
      >
        Report a problem with this location.
      </Text>
    </View>
  );
}
