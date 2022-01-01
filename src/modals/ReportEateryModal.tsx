import React, { useState } from 'react';
import {
  Alert,
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '../Styles/Styles';
import { ModalProps } from '../types';
import ModalContainer from '../Components/UI/ModalContainer';
import { BLACK, BLUE, YELLOW } from '../constants';
import { ApiService } from '../libs/ApiService';

type Props = {
  props: ModalProps & {
    id: number,
    title: string,
  }
};

export default function ReportEateryModal({ props }: Props) {
  const [details, setDetails]: [string, any] = useState('');

  const closeModal = () => {
    props.onClose();
  };

  const submit = () => {
    if (details === '') {
      Alert.alert('Please let us know why you\'re reporting this location!');
      return;
    }

    const report = `${details}\n\nThis report is for place ${props.id} - ${props.title}`;

    ApiService.apiSubmitPlaceRequest(report, 'remove').then(() => {
      Alert.alert('Thank you for your report, we\'ll check it out!');
    }).catch(() => {
      Alert.alert('There was an error submitting your report');
    }).finally(() => {
      closeModal();
    });
  };

  return (
    <ModalContainer props={{
      onClose: closeModal,
      title: 'Report a problem',
    }}
    >
      <View style={Styles.p2}>
        <Text>
          Is there a problem with
          {' '}
          {props.title}
          ? has it now closed? Or does it no longer offer gluten free options?
          Or it doesn't follow correct procedures? Let us know using the form below
          and we'll check it out!
        </Text>

        <View style={Styles.mt4}>
          <TextInput
            multiline
            value={details}
            style={{
              ...Styles.p2,
              ...Styles.border,
              ...Styles.borderBlue,
              ...Styles.bgBlueLightFaded,
              ...Styles.roundedSm,
              height: 100,
            }}
            onChangeText={setDetails}
          />
        </View>

        <View style={{ ...Styles.flexRow, ...Styles.justifyBetween, ...Styles.mt4 }}>
          <TouchableOpacity onPress={() => closeModal()}>
            <View style={{
              ...Styles.p2,
              ...Styles.px4,
              ...Styles.bgBlue,
              ...Styles.rounded,
            }}
            >
              <Text>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => submit()}>
            <View style={{
              ...Styles.p2,
              ...Styles.px4,
              ...Styles.bgYellow,
              ...Styles.roundedSm,
            }}
            >
              <Text>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ModalContainer>
  );
}
