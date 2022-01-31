import {
  Linking, Platform, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import Styles from '../../Styles/Styles';
import ConstrainedImage from '../UI/ConstrainedImage';
import { WebsiteDataset } from '../../types';
import LinkService from '../../libs/LinkService';

export default function WebsiteItem({ item }: { item: WebsiteDataset }) {
  return (
    <TouchableOpacity
      style={{
        ...Styles.mt2,
        ...Styles.maxWFull,
      }}
      activeOpacity={1}
      onPress={() => LinkService.openLink(item.link)}
    >
      <ConstrainedImage image={item.image} />

      <View style={Styles.px2}>
        <Text style={{
          ...Styles.textXl,
          ...Styles.py2,
          ...Styles.textCenter,
          ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
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
