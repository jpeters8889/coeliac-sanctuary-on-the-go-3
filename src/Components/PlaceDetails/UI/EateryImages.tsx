import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity, View, Text, Platform,
} from 'react-native';
import Styles from '../../../Styles/Styles';
import { ReviewImage } from '../../../types';
import ScaledImage from '../../UI/ScaledImage';
import ModalContainer from '../../UI/ModalContainer';
import Swipeable from '../../UI/Swipeable';

type Props = {
  props: {
    images: ReviewImage[],
    limit?: number,
  },
};

export default function EateryImages({ props }: Props) {
  const [viewImage, setViewImage]: [number | false, any] = useState(false);
  const [hasMoreImages, setHasMoreImages]: [boolean, any] = useState(false);
  const [showAllImages, setShowAllImages]: [boolean, any] = useState(true);

  const goToNextImage = (): void => {
    if (viewImage !== false) {
      if (viewImage + 1 >= props.images.length) {
        return;
      }

      setViewImage(viewImage + 1);
    }
  };

  const goToPreviousImage = (): void => {
    if (viewImage !== false) {
      if (viewImage === 0) {
        return;
      }

      setViewImage(viewImage - 1);
    }
  };

  useEffect(() => {
    if (props.limit && props.images.length > props.limit - 1) {
      setHasMoreImages(true);
      setShowAllImages(false);
    }
  }, [props]);

  return (
    <>
      <View>
        <View style={{
          ...Styles.flexRow, ...Styles.mt2, ...Styles['-mx1'], flexWrap: 'wrap',
        }}
        >
          {props.images.map((image, index) => {
            if (showAllImages || !props.limit || (props.limit && index < props.limit)) {
              return (
                <TouchableOpacity
                  style={{ width: '20%', ...Styles.m1 }}
                  onPress={() => setViewImage(index)}
                  key={image.id}
                >
                  <ScaledImage image={image.thumb} constrain={1} />
                </TouchableOpacity>
              );
            }
          })}
        </View>

        {!showAllImages && hasMoreImages && (
        <Text
          onPress={() => setShowAllImages(true)}
          style={{
            ...Styles.textLg,
            ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
          }}
        >
          View more images
        </Text>
        )}
      </View>

      {viewImage !== false && (
        <ModalContainer props={{
          onClose: () => setViewImage(false),
          wide: true,
        }}
        >
          <Swipeable
            style={{ ...Styles.border }}
            onSwipeLeft={() => goToNextImage()}
            onSwipeRight={() => goToPreviousImage()}
          >
            <ScaledImage image={props.images[viewImage].path} />
          </Swipeable>
        </ModalContainer>
      )}
    </>
  );
}
