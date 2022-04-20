import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from '../../Styles/Styles';

type Props = {
  image: string,
};

export default function ScaledImage({ image }: Props) {
  const [aspectRatio, setAspectRatio]: [number, any] = useState(1);

  useEffect(() => {
    let isMounted = true;

    Image.getSize(image, (width, height) => {
      if (isMounted) {
        setAspectRatio(width / height);
      }
    });

    return () => { isMounted = false; };
  });

  return (
    <Image
      style={{
        ...Styles.wFull,
        height: undefined,
        aspectRatio,
        resizeMode: 'contain',
      }}
      source={{ uri: image }}
    />
  );
}
