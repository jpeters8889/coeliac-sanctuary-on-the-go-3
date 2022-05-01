import {
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import React, {
  ReactElement, useEffect, useState,
} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { SuggestEditFeaturesField, SuggestEditField, SuggestEditResponseSelectGroup } from '../../../types';
import Styles from '../../../Styles/Styles';
import EditFeature from './EditFeature';

type Props = {
  index: number,
  field: SuggestEditField
  isEditing: boolean,
  triggerEdit: (field: SuggestEditField) => void,
  cancelEdit: () => void,
  submitFieldUpdate: (fieldIndex: number, value: string | number | object | null) => void,
};

export default function SuggestEditItem(props: Props) {
  const [value, setValue]: [string | number | null, any] = useState(null);

  useEffect(() => {
    if (props.field.component && props.field.component.value) {
      setValue(props.field.component.value());
    }
  }, []);

  const {
    field, isEditing, triggerEdit, cancelEdit,
  } = props;

  if (!field.shouldDisplay) {
    return null;
  }

  const editableComponent = (): ReactElement | null => {
    switch (field.component.component) {
      case 'textarea':
        return (
          <TextInput
            multiline
            numberOfLines={field.component?.props && field.component.props.rows ? field.component.props.rows : 4}
            value={value ? value as string : ''}
            style={{
              ...Styles.p2,
              ...Styles.border,
              ...Styles.borderGreyOff,
              ...Styles.bgGreyLight,
              ...Styles.mb2,
              height: (field.component?.props && field.component.props.rows ? field.component.props.rows : 4) * 15,
            }}
            onChangeText={setValue}
          />
        );
      case 'input':
        return (
          <TextInput
            value={value ? value as string : ''}
            style={{
              ...Styles.p2,
              ...Styles.border,
              ...Styles.borderGreyOff,
              ...Styles.bgGreyLight,
              ...Styles.mb2,
            }}
            onChangeText={setValue}
            {...field.component.componentProps}
          />
        );
      case 'select':
        return (
          <SelectDropdown
            // @ts-ignore
            data={field.component.props.options as SuggestEditResponseSelectGroup[]}
            defaultValueByIndex={value || undefined}
            buttonStyle={{
              ...Styles.border,
              ...Styles.borderGreyOff,
              ...Styles.bgGreyLight,
              ...Styles.wFull,
              ...Styles.p0,
              ...Styles.mb2,
              height: undefined,
            }}
            buttonTextStyle={{
              ...Styles.py2,
              ...Styles.textMd,
            }}
            onSelect={(option: SuggestEditResponseSelectGroup) => setValue(option.value)}
            buttonTextAfterSelection={(option: SuggestEditResponseSelectGroup) => option.label}
            rowTextForSelection={(option: SuggestEditResponseSelectGroup) => option.label}
          />
        );
      case 'features':
        return <EditFeature field={field.component as SuggestEditFeaturesField} setValue={setValue} />;
      default:
        return null;
    }
  };

  return (
    <View>
      {field.updated && (
      <View style={{ ...Styles.wFull, ...Styles.py2 }}>
        <Text style={{ ...Styles.textLg, ...Styles.fontSemibold, ...Styles.textCenter }}>
          Thanks for your suggestion!
        </Text>
      </View>
      )}

      {!field.updated && (
      <View style={{
        ...Styles.flexRow,
        ...Styles.justifyBetween,
        ...Styles.itemsCenter,
        ...Styles.wFull,
      }}
      >
          {isEditing && (
          <View style={{ ...Styles.wFull, ...Styles.py2 }}>
            <Text style={{ ...Styles.fontSemibold, ...Styles.textBlueDark, ...Styles.mb1 }}>{field.label}</Text>

            {editableComponent()}

            <View style={{ ...Styles.flexRow, ...Styles.justifyBetween }}>
              <TouchableOpacity
                style={{
                  ...Styles.bgYellow,
                  ...Styles.p2,
                  ...Styles.rounded,
                }}
                onPress={cancelEdit}
              >
                <Text style={Styles.fontSemibold}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...Styles.bgBlue,
                  ...Styles.p2,
                  ...Styles.rounded,
                }}
                onPress={() => props.submitFieldUpdate(props.index, value)}
              >
                <Text style={Styles.fontSemibold}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
          )}

          {!isEditing && (
          <>
            <View style={{ ...Styles.w80, ...Styles.py2 }}>
              <Text style={{ ...Styles.textXl, ...Styles.mb1 }}>{field.label}</Text>
              <Text
                style={{
                  ...(field.capitalise ? { textTransform: 'capitalize' } : null),
                  ...Styles.textGrey,
                }}
                numberOfLines={field.truncate ? 1 : undefined}
              >
                {field.getter() || 'Not Set'}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  ...Styles.bgYellow,
                  ...Styles.p2,
                  ...Styles.roundedSm,
                }}
                onPress={() => triggerEdit(field)}
              >
                <Text style={{ ...Styles.textBlack, ...Styles.fontSemibold }}>Update</Text>
              </TouchableOpacity>
            </View>
          </>
          )}
      </View>
      )}
    </View>
  );
}
