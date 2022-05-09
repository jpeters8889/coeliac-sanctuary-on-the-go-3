import {
  GestureResponderEvent, StyleProp, View, ViewStyle,
} from 'react-native';
import React, { ReactElement, useState } from 'react';

type Props = {
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  style?: StyleProp<ViewStyle> | undefined
  children: Element | ReactElement | Element[] | ReactElement[],
};

export default function Swipeable({
  onSwipeLeft, onSwipeRight, style, children,
}: Props) {
  const [startPosition, setStartPosition]: [number, any] = useState(0);

  const startTouch = (event: GestureResponderEvent): void => {
    setStartPosition(event.nativeEvent.pageX);
  };

  const endTouch = (event: GestureResponderEvent): void => {
    const position = event.nativeEvent.pageX;

    if (onSwipeRight && position > startPosition) {
      onSwipeRight();
    }

    if (onSwipeLeft && position < startPosition) {
      onSwipeLeft();
    }

    setStartPosition(0);
  };

  return (
    <View
      style={style}
      onTouchStart={startTouch}
      onTouchEnd={endTouch}
    >
      {children}
    </View>
  );
}
