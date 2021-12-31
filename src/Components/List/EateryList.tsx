import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { YELLOW } from '../../constants';
import Styles from '../../Styles/Styles';
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
      ...Styles.p2,
      ...Styles.flexRow,
      ...(index % 2 === 0 ? Styles.bgGreyLight : ''),
    }}
    >
      <View style={Styles.w80}>
        <Text style={{ ...Styles.fontSemibold, ...Styles.textLg, ...Styles.mb2 }}>
          {item.name}
        </Text>

        <Text style={Styles.mb4}>{item.info}</Text>

        <Text>{formatAddress(item.address)}</Text>
      </View>
      <View style={{ ...Styles.w20, ...Styles.itemsEnd, ...Styles.hFull }}>
        <View style={{ ...Styles.mb2, ...Styles.flex1 }}>
          {placeIcon(item.type.type)}
        </View>
        { item.ratings.length ? (
          <View style={{ ...Styles.mb2, ...Styles.itemsEnd }}>
            <View style={Styles.flexRow}>
              <Text style={Styles.mr1}>
                {item.ratings.length}
              </Text>
              <FontAwesome name="star" size={15} color={YELLOW} />
            </View>
            <Text>(4 Ratings)</Text>
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
    </View>
  );
}
