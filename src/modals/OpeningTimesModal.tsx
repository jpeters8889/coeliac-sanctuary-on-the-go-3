import React from 'react';
import { Text, View } from 'react-native';
import { ModalProps, OpeningTimes } from '../types';
import ModalContainer from '../Components/UI/ModalContainer';
import AnalyticsService from '../libs/AnalyticsService';
import { ucFirst } from '../helpers';
import Styles from '../Styles/Styles';

type Props = {
  props: ModalProps & {
    openingTimes: OpeningTimes,
    id: number,
    name: string,
  }
};

export default function OpeningTimesModal({ props }: Props) {
  AnalyticsService.logScreen('opening-times-modal', {
    eatery_id: props.id,
  }).then(() => {});

  const closeModal = () => {
    props.onClose();
  };

  const days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const isOpenOn = (day:string): boolean => !!props.openingTimes[`${day}_start`];

  const formatTime = (time: string): string => {
    const bits = time.split(':');

    return `${bits[0]}:${bits[1]}`;
  };

  const openingTimesFor = (day: string): { open: string, close: string } => ({
    open: formatTime(props.openingTimes[`${day}_start`] as string),
    close: formatTime(props.openingTimes[`${day}_end`] as string),
  });

  const openingTimeToString = (day: string): string => {
    const openingTimes = openingTimesFor(day);

    return `${openingTimes.open} - ${openingTimes.close}`;
  };

  return (
    <ModalContainer props={{
      onClose: closeModal,
      title: `${props.name} Opening Times`,
    }}
    >
      <View style={{ ...Styles.wFull, ...Styles.p2 }}>
        {days.map((day) => (
          <View
            key={day}
            style={{
              ...Styles.flexRow,
              ...Styles.justifyBetween,
              ...(day !== 'sunday' ? Styles.mb2 : ''),
            }}
          >
            <Text style={Styles.mr8}>{ucFirst(day)}</Text>
            <Text>{isOpenOn(day) ? openingTimeToString(day) : 'Closed'}</Text>
          </View>
        ))}
      </View>
    </ModalContainer>
  );
}
