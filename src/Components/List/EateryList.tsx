import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { YELLOW } from '../../constants';
import Style from '../../Styles/Styles';
import { Eatery } from '../../types';
import { formatAddress, placeIcon } from '../../helpers';

export default function EateryList(item: Eatery, index: number, navigation: StackNavigationProp<any>) {
  const viewDetails = (id: number) => {
    navigation.navigate('details', {
      id,
    });
  };

  return (
    <View style={{
      ...Style.p2,
      ...Style.flexRow,
      ...(index % 2 === 0 ? Style.bgGreyLight : ''),
    }}
    >
      <View style={Style.w80}>
        <Text style={{ ...Style.fontSemibold, ...Style.textLg, ...Style.mb2 }}>
          {item.name}
        </Text>

        <Text style={Style.mb4}>{item.info}</Text>

        <Text>{formatAddress(item.address)}</Text>
      </View>
      <View style={{ ...Style.w20, ...Style.itemsEnd, ...Style.hFull }}>
        <View style={{ ...Style.mb2, ...Style.flex1 }}>
          {placeIcon(item.type.type)}
        </View>
        { item.ratings.length ? (
          <View style={{ ...Style.mb2, ...Style.itemsEnd }}>
            <View style={Style.flexRow}>
              <Text style={Style.mr1}>
                {item.ratings.length}
              </Text>
              <FontAwesome name="star" size={15} color={YELLOW} />
            </View>
            <Text>(4 Ratings)</Text>
          </View>
        ) : null }
        <TouchableOpacity onPress={() => viewDetails(item.id)}>
          <View style={{
            ...Style.bgYellow, ...Style.p2, ...Style.rounded, ...Style.itemsEnd,
          }}
          >
            <Text>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
