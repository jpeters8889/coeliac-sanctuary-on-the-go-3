import { Text, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Rating } from '../../types';
import { YELLOW } from '../../constants';
import Global from '../../Styles/Styles';

dayjs.extend(advancedFormat);

export default function EateryReview({ item }: { item: Rating }) {
  const stars = [];

  for (let x = 0; x < parseInt(item.rating, 10); x++) {
    stars.push(x.toString());
  }

  return (
    <View style={{ ...Global.bgBlueLight, ...Global.rounded, ...Global.p2 }}>
      <View style={{ ...Global.flexRow, ...Global.mb4 }}>
        {stars.map((index) => <FontAwesome name="star" size={20} color={YELLOW} key={index} />)}
      </View>

      <Text style={Global.mb4}>
        {item.body ? item.body : 'Reviewer left no text with their rating'}
      </Text>

      <View style={Global.flexRow}>
        {item.name ? (
          <Text>
            {item.name}
            ,
            {' '}
          </Text>
        ) : null}

        <Text>{dayjs(item.created_at).format('MMM Do YYYY')}</Text>
      </View>
    </View>
  );
}
