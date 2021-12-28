import {
  LayoutAnimation, Text, TouchableOpacity, View,
} from 'react-native';
import React, { ReactElement, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { YELLOW } from '../../constants';
import Style from '../../Styles/Styles';

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
          ...Style.flexRow,
          ...Style.itemsCenter,
          ...Style.justifyBetween,
          ...Style.wFull,
          ...Style.px2,
          ...Style.py4,
          ...(props?.bottomBorder ? {
            ...Style.borderBottom,
            ...Style.borderGreyOff,
          } : {
            //
          }),
        }}
        onPress={() => toggleExpand()}
      >
        <Text style={{ ...Style.textXl, ...Style.fontSemibold }}>{props.title}</Text>

        <AntDesign
          name={expanded ? 'caretup' : 'caretdown'}
          size={24}
          color={YELLOW}
        />
      </TouchableOpacity>
      <View style={{ ...Style.bgGreyLight }}>
        {expanded && (<View>{children}</View>)}
      </View>

    </View>
  );
}
