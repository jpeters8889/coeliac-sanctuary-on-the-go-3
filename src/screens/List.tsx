import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Global from '../Styles/Global';
import { Eatery } from '../types';
import { YELLOW } from '../constants';

const items: Eatery[] = [
  {
    id: 1,
    title: 'Foo',
    description: 'foo bar baz',
    address: '123 Fake Street',
  },
  {
    id: 2,
    title: 'Bar',
    description: 'hello',
    address: '123 Fake Street',
  },
];

const renderItem = ({ item, index }: { item: Eatery, index: number }) => (
  <View style={{
    ...Global.p2,
    ...Global.borderGreyOff,
    ...Global.borderBottom,
    ...Global.flexRow,
    ...(index % 2 !== 0 ? Global.bgGreyLight : ''),
  }}
  >
    <View style={Global.w80}>
      <Text style={{ ...Global.fontSemibold, ...Global.textLg, ...Global.mb2 }}>
        {item.title}
      </Text>

      <Text style={Global.mb4}>{item.description}</Text>

      <Text>{item.address}</Text>
    </View>
    <View style={{ ...Global.w20, ...Global.itemsEnd }}>
      <View style={Global.mb2}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={YELLOW} />
      </View>
      <View style={{ ...Global.mb2, ...Global.itemsEnd }}>
        <View style={Global.flexRow}>
          <Text style={Global.mr1}>4</Text>
          <FontAwesome name="star" size={15} color={YELLOW} />
        </View>
        <Text>(4 Ratings)</Text>
      </View>
      <TouchableOpacity>
        <View style={{ ...Global.bgYellow, ...Global.p2, ...Global.rounded }}>
          <Text>Details</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default function List() {
  return (
    <View style={{ ...Global.bgWhite, ...Global.flex1 }}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
