import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleProp, ViewStyle } from 'react-native';
import Styles from '../../../Styles/Styles';

type Props = {
  data: SelectOption[],
  value: number | undefined
  marginRight?: boolean
  disabled: boolean
  onUpdate: (value: number) => void
};

type SelectOption = { value: number, label: string };

export default function OpeningTimeDropDown({
  data, value, marginRight, disabled, onUpdate,
}: Props) {
  const selectStyles = (): StyleProp<ViewStyle> => ({
    ...Styles.border,
    ...Styles.borderGreyOff,
    ...Styles.bgGreyLight,
    ...Styles.p0,
    ...Styles.textSm,
    ...(marginRight ? Styles.mr1 : null),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: undefined,
    overflow: 'visible',
    width: 35,
    position: 'relative',
    height: 28,
  });

  const textStyles = (): StyleProp<ViewStyle> => ({
    ...Styles.py1,
    ...Styles.textMd,
    ...(disabled ? Styles.textGreyOff : Styles.textBlack),
    flex: 0,
    width: 35,
    left: 0,
    top: 0,
    position: 'absolute',
  });

  return (
    <SelectDropdown
      data={data}
      defaultValueByIndex={value}
      buttonStyle={selectStyles()}
      buttonTextStyle={textStyles()}
      rowTextStyle={{ ...Styles.textMd }}
      rowStyle={{ height: 30 }}
      dropdownStyle={{ width: 50 }}
      defaultButtonText="--"
      onSelect={(option: SelectOption) => onUpdate(option.value)}
      buttonTextAfterSelection={(option: SelectOption) => option.label}
      rowTextForSelection={(option: SelectOption) => option.label}
      disableAutoScroll
      disabled={disabled}
    />

  );
}
