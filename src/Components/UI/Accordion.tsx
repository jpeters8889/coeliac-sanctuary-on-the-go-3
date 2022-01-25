import {
  LayoutAnimation, Platform, Text, TouchableOpacity, View,
} from 'react-native';
import React, { ReactElement, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { YELLOW } from '../../constants';
import Styles from '../../Styles/Styles';

type Props = {
  props: {
    title: String,
    bottomBorder?: boolean,
  },
  children: Element | ReactElement | Element[] | ReactElement[],
};

export default function Accordion({ props, children }: Props) {
  const [expanded, setExpanded]: [boolean, any] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          ...Styles.flexRow,
          ...Styles.itemsCenter,
          ...Styles.justifyBetween,
          ...Styles.wFull,
          ...Styles.px2,
          ...Styles.py4,
          ...(props?.bottomBorder ? {
            ...Styles.borderBottom,
            ...Styles.borderGreyOff,
          } : {
            //
          }),
        }}
        onPress={() => toggleExpand()}
      >
        <Text style={{
          ...Styles.textXl,
          ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
        }}
        >
          {props.title}
        </Text>

        <AntDesign
          name={expanded ? 'caretup' : 'caretdown'}
          size={24}
          color={YELLOW}
        />
      </TouchableOpacity>
      <View style={{
        ...Styles.bgGreyLight,
        ...(props?.bottomBorder ? {
          ...Styles.borderBottom,
          ...Styles.borderGreyOff,
        } : {
          //
        }),
      }}
      >
        {expanded && (<View>{children}</View>)}
      </View>

    </View>
  );
}
