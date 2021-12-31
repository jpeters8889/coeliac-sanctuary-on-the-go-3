import { Text, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Rating } from '../../types';
import { YELLOW } from '../../constants';
import Styles from '../../Styles/Styles';
import { notEmpty } from '../../helpers';

dayjs.extend(advancedFormat);

export default function EateryReview({ item }: { item: Rating }) {
  const stars = [];

  for (let x = 0; x < parseInt(item.rating, 10); x++) {
    stars.push(x.toString());
  }

  return (
    <View style={{ ...Styles.bgBlueLight, ...Styles.rounded }}>
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
          {stars.map((index) => <FontAwesome name="star" size={20} color={YELLOW} key={index} style={Styles.mr1} />)}
        </View>

        <Text style={Styles.mr2}>
          {dayjs(item.created_at).format('MMM Do YYYY')}
        </Text>
      </View>

      <View style={Styles.p2}>
        <Text>{notEmpty(item.body) ? item.body : 'Reviewer left no text with their rating'}</Text>

        {notEmpty(item.name) && <Text style={{ ...Styles.mt2, ...Styles.italic }}>{item.name}</Text>}
      </View>
    </View>
  );
}
