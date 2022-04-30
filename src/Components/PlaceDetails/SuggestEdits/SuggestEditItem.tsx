import {
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import React, { Component, ReactElement, useState } from 'react';
import { SuggestEditField } from '../../../types';
import Styles from '../../../Styles/Styles';

type Props = {
  field: SuggestEditField
  isEditing: boolean,
  triggerEdit: (field: SuggestEditField) => void,
  cancelEdit: () => void,
};

export default function SuggestEditItem(props: Props) {
  const [value, setValue]: [string | number | null, any] = useState(props.field.getter());

  const {
    field, isEditing, triggerEdit, cancelEdit,
  } = props;

  if (!field.shouldDisplay) {
    return null;
  }

  const editableComponent = (): ReactElement | null => {
    if (!field.formField) {
      return null;
    }

    switch (field.formField.component) {
      case 'textarea':
        return (
          <TextInput
            multiline
            numberOfLines={field.formField?.props && field.formField.props.rows ? field.formField.props.rows : 4}
            value={value as string}
            style={{
              ...Styles.p2,
              ...Styles.border,
              ...Styles.borderGreyOff,
              ...Styles.bgGreyLight,
              ...Styles.mb2,
            }}
            onChangeText={setValue}
          />
        );
      case 'input':
        return (
          <TextInput
            value={value as string}
            style={{
              ...Styles.p2,
              ...Styles.border,
              ...Styles.borderGreyOff,
              ...Styles.bgGreyLight,
              ...Styles.mb2,
            }}
            onChangeText={setValue}
            {...field.formField.componentProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View>
      {field.updated && (<View><Text>Thanks for your suggestion!</Text></View>)}

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
                onPress={cancelEdit}
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
