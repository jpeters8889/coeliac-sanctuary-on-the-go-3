import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from '../../Styles/Styles';

type Props = {
  image: string,
  constrain?: number;
};

export default function ScaledImage({ image, constrain }: Props) {
  const [aspectRatio, setAspectRatio]: [number, any] = useState(1);

  useEffect(() => {
    let isMounted = true;

    if (constrain) {
      setAspectRatio(constrain);
    } else {
      Image.getSize(image, (width, height) => {
        if (isMounted) {
          setAspectRatio(width / height);
        }
      });
    }

    return () => { isMounted = false; };
  });

  return (
    <Image
      style={{
        ...Styles.wFull,
        height: undefined,
        aspectRatio,
        resizeMode: constrain ? 'cover' : 'contain',
      }}
      source={{ uri: image }}
    />
  );
}
