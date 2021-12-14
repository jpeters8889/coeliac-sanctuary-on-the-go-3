import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { YELLOW } from '../../constants';
import Global from '../../Styles/Global';
import { Eatery } from '../../types';
import { formatAddress, placeIcon } from '../../helpers';

export default function EateryList({ item, index }: { item: Eatery, index: number }) {
  return (
    <View style={{
      ...Global.p2,
      ...Global.flexRow,
      ...(index % 2 === 0 ? Global.bgGreyLight : ''),
    }}
    >
      <View style={Global.w80}>
        <Text style={{ ...Global.fontSemibold, ...Global.textLg, ...Global.mb2 }}>
          {item.name}
        </Text>

        <Text style={Global.mb4}>{item.info}</Text>

        <Text>{formatAddress(item.address)}</Text>
      </View>
      <View style={{ ...Global.w20, ...Global.itemsEnd, ...Global.hFull }}>
        <View style={{ ...Global.mb2, ...Global.flex1 }}>
          {placeIcon(item.type.type)}
        </View>
        { item.ratings.length ? (
          <View style={{ ...Global.mb2, ...Global.itemsEnd }}>
            <View style={Global.flexRow}>
              <Text style={Global.mr1}>
                {item.ratings.length}
              </Text>
              <FontAwesome name="star" size={15} color={YELLOW} />
            </View>
            <Text>(4 Ratings)</Text>
          </View>
        ) : null }
        <TouchableOpacity>
          <View style={{
            ...Global.bgYellow, ...Global.p2, ...Global.rounded, ...Global.itemsEnd,
          }}
          >
            <Text>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
