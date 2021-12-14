import { View } from 'react-native';
import React from 'react';
import Global from '../../Styles/Global';

export default function ItemSeparator() {
  return <View style={{ ...Global.borderBottom, ...Global.borderGreyOff }} />;
}
