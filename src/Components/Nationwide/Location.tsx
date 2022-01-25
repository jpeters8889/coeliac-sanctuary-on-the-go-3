import { Platform, Text, View } from 'react-native';
import React from 'react';
import Styles from '../../Styles/Styles';
import { Eatery } from '../../types';
import { placeIcon } from '../../helpers';

export default function Location(item: Eatery, index: number) {
  const placeInfo = () => {
    if (item.type.type === 'att') {
      // @ts-ignore
      return item.restaurants[0].info;
    }

    return item.info;
  };

  return (
    <View style={{
      ...Styles.p2,
      ...Styles.flexRow,
      ...(index % 2 === 0 ? '' : Styles.bgGreyLight),
    }}
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
      </View>
    </View>
  );
}
