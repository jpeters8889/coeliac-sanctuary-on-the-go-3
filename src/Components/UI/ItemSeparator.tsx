import { View } from 'react-native';
import React from 'react';
import Styles from '../../Styles/Styles';

export default function ItemSeparator() {
  return <View style={{ ...Styles.borderBottom, ...Styles.borderGreyOff }} />;
}
