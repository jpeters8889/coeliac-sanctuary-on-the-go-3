import {
  LayoutAnimation, Text, TouchableOpacity, View,
} from 'react-native';
import React, { ReactElement, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { YELLOW } from '../../constants';
import Global from '../../Styles/Global';

type Props = {
  props: {
    title: String,
    bottomBorder?: boolean,
  },
  children: Element[] | ReactElement[],
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
          ...Global.flexRow,
          ...Global.itemsCenter,
          ...Global.justifyBetween,
          ...Global.wFull,
          ...Global.p4,
          ...(props?.bottomBorder ? {
            ...Global.borderBottom,
            ...Global.borderGreyOff,
          } : {
            //
          }),
        }}
        onPress={() => toggleExpand()}
      >
        <Text style={Global.textLg}>{props.title}</Text>

        <AntDesign
          name={expanded ? 'caretup' : 'caretdown'}
          size={24}
          color={YELLOW}
        />
      </TouchableOpacity>
      <View style={{ ...Global.bgGreyLight }}>
        {expanded && (<View>{children}</View>)}
      </View>

    </View>
  );
}
