import { Text, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { UserReview } from '../../../types';
import { YELLOW } from '../../../constants';
import Styles from '../../../Styles/Styles';

dayjs.extend(advancedFormat);

export default function ReviewTitle({ item }: { item: UserReview }) {
  const stars = [];

  for (let x = 0; x < parseInt(item.rating, 10); x++) {
    stars.push(x.toString());
  }

  return (
    <View style={{
      ...Styles.flexRow,
      ...Styles.itemsCenter,
      ...Styles.justifyBetween,
      ...Styles.bgBlue,
      ...Styles.p2,
      ...Styles.roundedTop,
    }}
    >
      <View style={{ ...Styles.flexRow }}>
        {stars.map((index) => <FontAwesome name="star" size={22} color={YELLOW} key={index} style={Styles.mr1} />)}
      </View>

      {!item.admin_review && <Text>{item.human_date}</Text>}
    </View>
  );
}
