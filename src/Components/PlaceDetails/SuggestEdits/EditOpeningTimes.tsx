import {
  View, Text, Platform, Switch,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  SuggestEditOpeningTime,
  SuggestEditOpeningTimesField,
  SuggestEditResponseOpeningTimeDays,
} from '../../../types';
import Styles from '../../../Styles/Styles';
import {
  BLUE, BLUE_DIM, BLUE_LIGHT, BLUE_LIGHT_FADED,
} from '../../../constants';
import OpeningTimeDropDown from './OpeningTimeDropDown';

type Props = {
  field: SuggestEditOpeningTimesField
  setValue: (value: any) => void,
};

type OpeningTime = {
  key: SuggestEditResponseOpeningTimeDays,
  label: string,
  closed: boolean,
  start: [null, null] | [number, number],
  end: [null, null] | [number, number],
};

type SelectOption = { value: number, label: string };

export default function EditOpeningTimes({ field, setValue }: Props) {
  const [currentOpeningTimes, setCurrentOpeningTimes]: [SuggestEditOpeningTime, any] = useState(field.props.currentOpeningTimes);
  const [openingTimes, setOpeningTimes]: [OpeningTime[], any] = useState([]);

  const days: SuggestEditResponseOpeningTimeDays[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const hours = (): SelectOption[] => Array.from({ length: 24 }).map((value, hour) => ({
    value: hour,
    label: (hour < 10 ? '0' : '') + hour.toString(),
  }));

  const minutes = (): SelectOption[] => [
    { value: 0, label: '00' },
    { value: 15, label: '15' },
    { value: 30, label: '30' },
    { value: 45, label: '45' },
  ];

  const splitTime = (time: null | string): [null, null] | [number, number] => {
    if (!time) {
      return [null, null];
    }

    const split = time.split(':');

    return [parseInt(split[0], 10), parseInt(split[1], 10)];
  };

  const constructDay = (day: SuggestEditResponseOpeningTimeDays, isClosed: null | boolean = null): OpeningTime => {
    const thisDay = currentOpeningTimes ? currentOpeningTimes[day] : null;

    return ({
      key: day,
      label: day.charAt(0).toUpperCase() + day.slice(1),
      closed: isClosed === null ? (thisDay !== null && thisDay[0] === null) : isClosed,
      start: isClosed ? [null, null] : splitTime(thisDay ? thisDay[0] : null),
      end: isClosed ? [null, null] : splitTime(thisDay ? thisDay[1] : null),
    });
  };

  useEffect(() => {
    setOpeningTimes(() => days.map((day) => constructDay(day)));
  }, []);

  useEffect(() => {
    setValue(openingTimes);
  }, [openingTimes]);

  const markAsClosed = (index: number): void => {
    setOpeningTimes((openingTime: OpeningTime[]) => {
      openingTime[index] = constructDay(openingTime[index].key, !openingTime[index].closed);

      return [...openingTime];
    });
  };

  const updateDay = (index: number, openOrClose: 'start' | 'end', timeIndex: 0 | 1, value: number) => {
    setOpeningTimes((openingTime: OpeningTime[]) => {
      openingTime[index][openOrClose][timeIndex] = value;

      return [...openingTimes];
    });
  };

  const updateOpeningHours = (index: number, value: number): void => {
    updateDay(index, 'start', 0, value);
  };

  const updateOpeningMinutes = (index: number, value: number): void => {
    updateDay(index, 'start', 1, value);
  };

  const updateClosingHours = (index: number, value: number): void => {
    updateDay(index, 'end', 0, value);
  };

  const updateClosingMinutes = (index: number, value: number): void => {
    updateDay(index, 'end', 1, value);
  };

  return (
    <View>
      {openingTimes.map((openingTime, index) => (
        <View
          key={openingTime.key}
          style={{
            ...Styles.flexRow,
            ...Styles.justifyBetween,
            ...Styles.itemsCenter,
            ...Styles.borderGreyOff,
            ...Styles.py2,
            ...(openingTime.key !== 'sunday' ? Styles.borderBottom : null),
          }}
        >
          <Text style={{ ...Styles.textLg }}>{openingTime.label}</Text>

          <View style={{ ...Styles.flexRow, ...Styles.justifyBetween }}>
            <View style={{ ...Styles.flexRow, ...Styles.itemsCenter }}>
              <Text style={Styles.mr1}>Closed</Text>
              <Switch
                style={Platform.OS === 'ios' ? Styles.scale80 : Styles.scale120}
                trackColor={{ false: BLUE_LIGHT_FADED, true: BLUE_LIGHT }}
                thumbColor={openingTime.closed ? BLUE : BLUE_DIM}
                onValueChange={() => markAsClosed(index)}
                value={openingTime.closed}
              />
            </View>

            <View style={{ ...Styles.flexRow, ...Styles.itemsCenter }}>
              <View style={{ ...Styles.flexRow, ...Styles.itemsCenter }}>
                <OpeningTimeDropDown
                  data={hours()}
                  value={(
                        openingTime.start[0]
                          ? hours().map((hour) => hour.value).indexOf(openingTime.start[0])
                          : undefined
                    )}
                  disabled={openingTime.closed}
                  onUpdate={(value) => updateOpeningHours(index, value)}
                />

                <OpeningTimeDropDown
                  data={minutes()}
                  value={(
                        openingTime.start[0]
                          ? minutes().map((minute) => minute.value).indexOf(openingTime.start[1])
                          : undefined
                    )}
                  disabled={openingTime.closed}
                  onUpdate={(value) => updateOpeningMinutes(index, value)}
                />
              </View>

              <View style={{
                ...Styles.flexRow,
                ...Styles.itemsCenter,
                ...Styles.mx1,
                height: '100%',
              }}
              >
                <Text>-</Text>
              </View>

              <View style={{ ...Styles.flexRow, ...Styles.itemsCenter }}>
                <OpeningTimeDropDown
                  data={hours()}
                  value={(
                        openingTime.end[0]
                          ? hours().map((hour) => hour.value).indexOf(openingTime.end[0])
                          : undefined
                    )}
                  disabled={openingTime.closed}
                  onUpdate={(value) => updateClosingHours(index, value)}
                />

                <OpeningTimeDropDown
                  data={minutes()}
                  value={(
                        openingTime.end[0]
                          ? minutes().map((minute) => minute.value).indexOf(openingTime.end[1])
                          : undefined
                    )}
                  disabled={openingTime.closed}
                  onUpdate={(value) => updateClosingMinutes(index, value)}
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
