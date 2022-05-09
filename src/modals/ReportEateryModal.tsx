import React, { useState } from 'react';
import {
  Alert, Keyboard,
  Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import Styles from '../Styles/Styles';
import { ModalProps } from '../types';
import ModalContainer from '../Components/UI/ModalContainer';
import { ApiService } from '../libs/ApiService';
import AnalyticsService from '../libs/AnalyticsService';

type Props = {
  props: ModalProps & {
    id: number,
    title: string,
  }
};

export default function ReportEateryModal({ props }: Props) {
  AnalyticsService.logScreen('report_eatery_modal', {
    eatery_id: props.id,
  }).then(() => {});

  const [details, setDetails]: [string, any] = useState('');

  const closeModal = () => {
    AnalyticsService.logEvent({ type: 'closed_modal' }).then(() => {});

    props.onClose();
  };

  const submit = () => {
    AnalyticsService.logEvent({ type: 'submit_report_eatery_attempt' }).then(() => {});

    if (details === '') {
      AnalyticsService.logEvent({ type: 'submit_eatery_validation_error' }).then(() => {});

      Alert.alert('Please let us know why you\'re reporting this location!');
      return;
    }

    ApiService.reportPlace(props.id, details).then(() => {
      Alert.alert('Thank you for your report, we\'ll check it out!');
    }).catch((e) => {
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.p2}>
          <Text>
            Is there a problem with
            {' '}
            {props.title}
            ? has it now closed? Does it no longer offer gluten free options?
            Does it not follow correct procedures? Let us know using the form below
            and we'll check it out!
          </Text>

          <View style={{ ...Styles.mt4, flexGrow: 0 }}>
            <TextInput
              multiline
              value={details}
              style={{
                ...Styles.p2,
                ...Styles.border,
                ...Styles.borderBlue,
                ...Styles.bgBlueLightFaded,
                ...Styles.roundedSm,
                textAlignVertical: 'top',
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
      </TouchableWithoutFeedback>
    </ModalContainer>
  );
}
