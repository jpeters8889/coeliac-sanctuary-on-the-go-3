import { Text, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Rating } from '../../types';
import { YELLOW } from '../../constants';
import Global from '../../Styles/Styles';
import { notEmpty } from '../../helpers';

dayjs.extend(advancedFormat);

export default function EateryReview({ item }: { item: Rating }) {
  const stars = [];

  for (let x = 0; x < parseInt(item.rating, 10); x++) {
    stars.push(x.toString());
  }

  return (
    <View style={{ ...Global.bgBlueLight, ...Global.rounded, ...Global.p2 }}>
      <View style={{ ...Global.flexRow, ...Global.mb4, ...Global.itemsCenter }}>
        <Text style={Global.mr2}>
          {dayjs(item.created_at).format('MMM Do YYYY')}
        </Text>

        {stars.map((index) => <FontAwesome name="star" size={20} color={YELLOW} key={index} />)}
      </View>

      <View style={Global.mb4}>
        <Text>{notEmpty(item.body) ? item.body : 'Reviewer left no text with their rating'}</Text>
      </View>

      {notEmpty(item.name) && <Text>{item.name}</Text>}
    </View>
  );
}
