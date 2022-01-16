import {
  Linking, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import Styles from '../../Styles/Styles';
import ConstrainedImage from '../UI/ConstrainedImage';
import { WebsiteDataset } from '../../types';

export default function WebsiteItem({ item }: { item: WebsiteDataset }) {
  return (
    <TouchableOpacity style={Styles.mt2} onPress={() => Linking.openURL(item.link)}>
      <ConstrainedImage image={item.image} />

      <View style={Styles.px2}>
        <Text style={{
          ...Styles.textXl,
          ...Styles.fontSemibold,
          ...Styles.py2,
          ...Styles.textCenter,
        }}
        >
          {item.title}
        </Text>

        <Text>{item.description}</Text>

        <Text style={{ ...Styles.my2, ...Styles.italic }}>
          Published on
          {' '}
          {dayjs(item.createdAt).format('DD/MM/YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
