import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SuggestEditField } from '../../../types';
import Styles from '../../../Styles/Styles';

type Props = {
  field: SuggestEditField
  isEditing: false,
};

export default function SuggestEditItem({ field, isEditing }: Props) {
  if (!field.shouldDisplay) {
    return null;
  }

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
          <View>
            <Text>Editing</Text>
          </View>
          )}

          {!isEditing && (
          <>
            <View style={{ ...Styles.w80, ...Styles.py2 }}>
              <Text style={{ ...Styles.textXl, ...Styles.mb1 }}>{field.label}</Text>
              <Text
                style={{
                  ...(field.capitalise ? { textTransform: 'capitalize' } : null),
                  lineHeight: 24,
                  ...Styles.textGrey,
                }}
                numberOfLines={field.truncate ? 1 : undefined}
              >
                {field.getter() || 'Not Set'}
              </Text>
            </View>
            <View>
              <TouchableOpacity style={{
                ...Styles.bgYellow,
                ...Styles.p2,
                ...Styles.roundedSm,
              }}
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
