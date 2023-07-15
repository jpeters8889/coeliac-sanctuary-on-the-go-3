import React, { useEffect, useState } from 'react';
import {
  View, Text, ActivityIndicator, Platform,
} from 'react-native';
import { AxiosResponse } from 'axios';
import Styles from '../../Styles/Styles';
import { WHITE } from '../../constants';
import { ApiService } from '../../libs/ApiService';
import { WhereToEatSummary, WhereToEatSummarySection } from '../../types';

export default function HomeSummary() {
  const [loadingSummary, setLoadingSummary]: [boolean, any] = useState(true);
  const [summaryStats, setSummaryStats]: [WhereToEatSummary, any] = useState({} as WhereToEatSummary);

  const sections: WhereToEatSummarySection[] = [
    {
      title: 'Eateries',
      key: 'eateries',
    },
    {
      title: 'Attractions',
      key: 'attractions',
    },
    {
      title: 'Hotels',
      key: 'hotels',
    },
  ];

  const loadSummary = () => {
    ApiService.summary().then((response: AxiosResponse<WhereToEatSummary>) => {
      setSummaryStats((summary: WhereToEatSummary) => ({
        ...summary,
        eateries: response.data.eateries,
        attractions: response.data.attractions,
        hotels: response.data.hotels,
      }));

      setLoadingSummary(false);
    });
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <View style={{
      ...Styles.flexRow,
      ...Styles.justifyBetween,
      ...Styles.my4,
    }}
    >
      {sections.map((section) => (
        <View
          key={section.key}
          style={{
            ...Styles.p1,
            ...Styles.bgBlueLight,
            ...Styles.roundedSm,
            ...Styles.w25,
          }}
        >
          {loadingSummary && <ActivityIndicator size="small" color={WHITE} style={Styles.mb2} />}

          {!loadingSummary && (
          <Text style={{
            ...Styles.textCenter,
            ...(Platform.OS === 'ios' ? Styles.textXl : Styles.text2Xl),
          }}
          >
            {summaryStats[section.key].toLocaleString('en-GB', { minimumFractionDigits: 0 })}
          </Text>
          )}
          <Text style={{
            ...Styles.textCenter,
            ...Styles.textSm,
          }}
          >
            {section.title}
          </Text>
        </View>
      ))}
    </View>
  );
}
