import {
  Platform, Text, TouchableOpacity, View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { YELLOW } from '../../constants';
import Styles from '../../Styles/Styles';
import { Eatery } from '../../types';
import { formatAddress, placeIcon } from '../../helpers';

export default function EateryList(item: Eatery, index: number, navigation: StackNavigationProp<any>) {
  const viewDetails = (id: number, branchId?: number) => {
    navigation.navigate('details', {
      id,
      branchId,
    });
  };

  return (
    <>
      <TouchableOpacity
        style={{
          ...Styles.p2,
          ...Styles.flexRow,
          ...(index % 2 === 0 ? Styles.bgGreyLight : ''),
        }}
        onPress={() => viewDetails(item.id, item.branch?.id)}
      >
        <View style={Styles.w80}>
          <Text style={{
            ...Styles.textLg,
            ...Styles.mb2,
            ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
          }}
          >
            {item.branch && item.branch.name ? `${item.branch.name} (${item.name})` : item.name}
          </Text>

          {item.type.type !== 'att' && (
            <Text style={Styles.mb4}>{item.info}</Text>
          )}

          {item.type.type === 'att' && item.restaurants.length === 1 && (
            <View style={Styles.mb4}>
              <Text style={{
                ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
                ...Styles.mb1,
              }}
              >
                {item.restaurants[0].restaurant_name}
              </Text>

              <Text style={Styles.mb4}>{item.restaurants[0].info}</Text>
            </View>
          )}

          {item.type.type === 'att' && item.restaurants.length > 1 && (
            <Text style={Styles.mb4}>
              There are
              {' '}
              {item.restaurants.length}
              {' '}
              eateries in this attraction that offer gluten free.
            </Text>
          )}

          <Text>{formatAddress(item.branch ? item.branch.address : item.address)}</Text>
        </View>
        <View style={{ ...Styles.w20, ...Styles.itemsEnd, ...Styles.hFull }}>
          <View style={{ ...Styles.mb2, ...Styles.flex1 }}>
            {placeIcon(item.type.type)}
          </View>
          {item.user_reviews.length ? (
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
          ) : null}
          <TouchableOpacity onPress={() => viewDetails(item.id, item.branch?.id)}>
            <View style={{
              ...Styles.bgYellow, ...Styles.p2, ...Styles.rounded, ...Styles.itemsEnd,
            }}
            >
              <Text>Details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {index === 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate('nationwide')}
          style={{
            ...Styles.m2,
            ...Styles.p2,
            ...Styles.bgBlueLight,
            ...Styles.borderBlue,
            ...Styles.rounded,
          }}
        >
          <Text style={{
            ...Styles.textLg,
            ...Styles.textCenter,
            ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
          }}
          >
            Did you know, there might be more places to eat in
            {' '}
            {item.branch ? item.branch.town.town : item.town.town}
            {' '}
            listed in our Nationwide eating out guide!
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}
