import {
  Platform, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '../../Styles/Styles';
import { Eatery } from '../../types';
import { placeIcon } from '../../helpers';
import { YELLOW } from '../../constants';

export default function Location(item: Eatery, index: number, navigation: StackNavigationProp<any>) {
  const placeInfo = () => {
    if (item.type.type === 'att') {
      // @ts-ignore
      return item.restaurants[0].info;
    }

    return item.info;
  };

  const viewDetails = (id: number) => {
    navigation.navigate('details', {
      id,
    });
  };

  return (
    <TouchableOpacity
      style={{
        ...Styles.p2,
        ...Styles.flexRow,
        ...(index % 2 === 0 ? '' : Styles.bgGreyLight),
      }}
      onPress={() => viewDetails(item.id)}
    >
      <View style={Styles.w80}>
        <Text style={{
          ...Styles.textLg,
          ...Styles.mb2,
          ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
        }}
        >
          {item.name}
        </Text>

        <Text style={Styles.mb4}>{placeInfo()}</Text>

      </View>
      <View style={{ ...Styles.w20, ...Styles.itemsEnd, ...Styles.hFull }}>
        <View style={{ ...Styles.mb2, ...Styles.flex1 }}>
          {placeIcon(item.type.type)}
        </View>

        { item.user_reviews.length ? (
          <View style={{ ...Styles.mb2, ...Styles.itemsEnd }}>
            <View style={Styles.flexRow}>
              <Text style={Styles.mr1}>
                {item.average_rating}
              </Text>
              <FontAwesome name="star" size={15} color={YELLOW} />
            </View>
            <Text>
              (
              {item.user_reviews.length}
              {' '}
              Rating
              {item.user_reviews.length > 1 ? 's' : ''}
              )
            </Text>
          </View>
        ) : null }
        <TouchableOpacity onPress={() => viewDetails(item.id)}>
          <View style={{
            ...Styles.bgYellow, ...Styles.p2, ...Styles.rounded, ...Styles.itemsEnd,
          }}
          >
            <Text>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
