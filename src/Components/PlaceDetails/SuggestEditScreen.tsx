import {
  ActivityIndicator,
  KeyboardAvoidingView, ScrollView, Text, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import TitleBar from './UI/TitleBar';
import Styles from '../../Styles/Styles';
import { SuggestEateryResponse, SuggestEditField } from '../../types';
import SuggestEditFields from './SuggestEdits/SuggestEditFields';
import { ApiService } from '../../libs/ApiService';
import { BLUE_LIGHT } from '../../constants';
import SuggestEditItem from './SuggestEdits/SuggestEditItem';
import { notEmpty } from '../../helpers';

type Props = {
  route: RouteProp<{
    params: {
      eateryId: number,
      eateryName: string,
    }
  }>
  navigation: StackNavigationProp<any>
};

export default function SuggestEditScreen(props: Props) {
  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const [eatery, setEatery]: [SuggestEateryResponse, any] = useState({} as SuggestEateryResponse);
  const [fields, setFields]: [SuggestEditField[], any] = useState([]);
  const [currentlyEditing, setCurrentlyEditing]: [string | undefined, any] = useState();

  const editField = (field: SuggestEditField): void => setCurrentlyEditing(field.id);

  const cancelEdit = (): void => setCurrentlyEditing();

  useEffect(() => {
    if (Object.keys(eatery).length === 0) {
      return;
    }

    setFields(SuggestEditFields(eatery));
  }, [eatery]);

  useEffect(() => {
    if (Object.keys(eatery).length > 0) {
      return;
    }

    ApiService.getSuggestEditFields(props.route.params.eateryId).then((response) => {
      setEatery(response.data.data);

      setIsLoading(false);
    });
  }, []);

  const submitFieldUpdate = (fieldIndex: number, value: string | number | object | null): void => {
    console.log(value);

    if (!value || !notEmpty(value)) {
      alert('Please complete the form before submitting!');

      return;
    }

    const field = fields[fieldIndex];

    ApiService.submitPlaceSuggestion(props.route.params.eateryId, field.id, value).then(() => {
      setFields((currentFields: SuggestEditField[]) => {
        currentFields[fieldIndex].updated = true;

        return [...currentFields];
      });

      cancelEdit();

      alert('Thanks for suggesting an improvement to this location!');
    }).catch(() => {
      alert('Sorry, we were unable to save your suggested edit, please try again...');
    });
  };

  return (
    <ScrollView style={Styles.bgWhite}>
      <KeyboardAvoidingView behavior="position">

        <TitleBar props={{
          isLoading: false,
          navigation: props.navigation,
          placeName: 'Suggest Edits',
        }}
        />

        {isLoading && <ActivityIndicator size="large" style={Styles.mb4} color={BLUE_LIGHT} />}

        {!isLoading && (
        <View style={{ ...Styles.p2, ...Styles.mt10 }}>
            {fields.map((field, index) => (
              <View
                style={{
                  ...Styles.borderBottom,
                  ...Styles.borderBlue,
                  ...Styles.px2,
                }}
                key={field.id}
              >
                <SuggestEditItem
                  field={field}
                  index={index}
                  isEditing={currentlyEditing === field.id}
                  triggerEdit={editField}
                  cancelEdit={cancelEdit}
                  submitFieldUpdate={submitFieldUpdate}
                />
              </View>
            ))}
        </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
