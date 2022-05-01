import {
  View, Text, Platform, Switch,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SuggestEditFeaturesField } from '../../../types';
import Styles from '../../../Styles/Styles';
import {
  BLUE, BLUE_DIM, BLUE_LIGHT, BLUE_LIGHT_FADED,
} from '../../../constants';

type Props = {
  field: SuggestEditFeaturesField
  setValue: (value: any) => void,
};

export default function EditFeature({ field, setValue }: Props) {
  const [features, setFeatures]: [{ id: number, label: string, selected: boolean }[], any] = useState(
    field.props.currentFeatures,
  );

  const toggleFeature = (index: number): void => {
    setFeatures((currentFeatures: { id: number, label: string, selected: boolean }[]) => {
      currentFeatures[index].selected = !currentFeatures[index].selected;

      return [...currentFeatures];
    });
  };

  useEffect(() => {
    const valueToEmit: { key: number, label: string, selected: boolean }[] = features.map((feature) => ({
      key: feature.id,
      label: feature.label,
      selected: feature.selected,
    }));

    setValue(valueToEmit);
  }, [features]);

  return (
    <View>
      {features.map((feature, index) => (
        <View key={feature.id} style={{ ...Styles.flexRow, ...Styles.justifyBetween }}>
          <Text>{feature.label}</Text>

          <Switch
            style={Platform.OS === 'ios' ? Styles.scale80 : Styles.scale120}
            trackColor={{ false: BLUE_LIGHT_FADED, true: BLUE_LIGHT }}
            thumbColor={feature.selected ? BLUE : BLUE_DIM}
            onValueChange={() => toggleFeature(index)}
            value={feature.selected}
          />
        </View>
      ))}
    </View>
  );
}
