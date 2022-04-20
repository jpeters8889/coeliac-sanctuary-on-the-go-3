import React from 'react';
import {
  View, Platform, Text, TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '../../Styles/Styles';
import { formatAddress, notEmpty } from '../../helpers';
import LinkService from '../../libs/LinkService';
import { Eatery } from '../../types';

type Props = {
  props: {
    eatery: Eatery
  },
};

export default function EateryInfo({ props }: Props) {
  return (
    <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
      {props.eatery.type.type !== 'att' && (
      <Text style={Styles.mb4}>
        {props.eatery.info}
      </Text>
      )}

      {props.eatery.type.type === 'att' && (
      <View>
        {props.eatery.restaurants.map((restaurant) => (
          <View key={restaurant.id} style={Styles.mb2}>
            <Text style={{
              ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
              ...Styles.textLg,
            }}
            >
              {restaurant.restaurant_name}
            </Text>
            <Text>{restaurant.info}</Text>
          </View>
        ))}
      </View>
      )}

      <Text style={Styles.mb4}>
        {formatAddress(props.eatery.address, '\n')}
      </Text>

      {notEmpty(props.eatery.phone) && <Text style={Styles.mb4}>{props.eatery.phone}</Text>}

      {notEmpty(props.eatery.website) && (
      <TouchableOpacity
        style={{
          ...Styles.mb4,
          ...Styles.itemsCenter,
          ...Styles.flexRow,
        }}
        onPress={() => LinkService.openLink(props.eatery.website)}
      >
        <Text style={{
          ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
          ...Styles.mr2,
        }}
        >
          Visit Website
        </Text>
        <FontAwesome name="external-link" size={18} color="black" />
      </TouchableOpacity>
      )}
    </View>
  );
}
