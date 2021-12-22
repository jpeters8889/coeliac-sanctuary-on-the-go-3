import { Text, TouchableOpacity, View } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { YELLOW } from '../../constants';
import Global from '../../Styles/Global';

type Props = {
  props: {
    title: String,
  },
  children: Element[] | ReactElement[],
};

export default function Accordion({ props, children }: Props) {
  const [expanded, setExpanded]: [boolean, any] = useState(false);

  const toggleExpand = () => {
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
        }}
        onPress={() => toggleExpand()}
      >
        <Text>{props.title}</Text>

        <AntDesign
          name={expanded ? 'caretup' : 'caretdown'}
          size={24}
          color={YELLOW}
        />
      </TouchableOpacity>
      <View>
        {expanded && (<View>{children}</View>)}
      </View>

    </View>
  );
}
