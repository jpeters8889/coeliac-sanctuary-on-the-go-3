import { View } from 'react-native';
import React from 'react';
import Style from '../../Styles/Styles';

export default function ItemSeparator() {
  return <View style={{ ...Style.borderBottom, ...Style.borderGreyOff }} />;
}
