import React, { useEffect, useState } from 'react';
import {
  Platform, Text, TouchableOpacity, View,
} from 'react-native';
import Styles from '../../Styles/Styles';
import { ApiService } from '../../libs/ApiService';
import { ShopCta } from '../../types';
import ConstrainedImage from './ConstrainedImage';
import { BASE_URL } from '../../constants';
import LinkService from '../../libs/LinkService';

export default function ShopCtaComponent() {
  const [shopCta, setShopCta]: [ShopCta | undefined, any] = useState();

  const loadShopCta = () => {
    ApiService.shopCta().then((response) => {
      setShopCta(response.data);
    });
  };

  useEffect(() => {
    loadShopCta();
  }, []);

  return (
    <View>
      {shopCta !== undefined && (
        <TouchableOpacity
          style={{
            ...Styles.bgBlueFaded,
            ...Styles.p2,
            ...Styles.border,
            ...Styles.borderBlue,
            ...Styles.roundedSm,
          }}
          onPress={() => LinkService.openLink(`${BASE_URL}${shopCta.link}`)}
        >
          <ConstrainedImage image={shopCta.image} />
          <Text style={{
            ...Styles.textCenter,
            ...Styles.textLg,
            ...Styles.mt2,
            ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
          }}
          >
            {shopCta.text}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
