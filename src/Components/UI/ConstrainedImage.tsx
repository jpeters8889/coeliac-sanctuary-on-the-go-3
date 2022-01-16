import { Image, View } from 'react-native';
import React from 'react';
import Styles from '../../Styles/Styles';

type Props = {
  image: string,
};

export default function ConstrainedImage({ image }: Props) {
  return (
    <View style={Styles.flexRow}>
      <Image
        style={{
          ...Styles.wFull,
          aspectRatio: 1.9,
          resizeMode: 'contain',
        }}
        source={{ uri: image }}
      />
    </View>
  );
}
