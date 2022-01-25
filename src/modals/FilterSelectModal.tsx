import React, { useCallback, useState } from 'react';
import {
  Platform,
  ScrollView, Switch, Text, View,
} from 'react-native';
import Styles from '../Styles/Styles';
import { VenueTypeFilterGroup } from '../types';
import Accordion from '../Components/UI/Accordion';
import ModalContainer from '../Components/UI/ModalContainer';
import { FilterService } from '../libs/FilterService';
import {
  BLUE, BLUE_LIGHT, YELLOW, YELLOW_FADED,
} from '../constants';
import AnalyticsService from '../libs/AnalyticsService';

type Props = {
  props: {
    visible?: boolean
    filterService: FilterService,
    onClose: (filters: FilterService) => void;
  }
};

export default function FilterSelectModal({ props }: Props) {
  AnalyticsService.logScreen('filter-select-modal').then(() => {});

  const [filters, setFilters]: [VenueTypeFilterGroup[], any] = useState(
    props.filterService.getVenueTypes(),
  );
  const [, updateState]: [any, any] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const closeModal = () => {
    AnalyticsService.logEvent({ type: 'closed_modal' }).then(() => {});

    props.onClose(props.filterService);
  };

  const selectGroup = (groupId: number) => {
    AnalyticsService.logEvent({
      type: 'toggled_filter_group',
      metaData: {
        groupId,
      },
    }).then(() => {});

    props.filterService.toggleGroup(groupId);

    setFilters(props.filterService.getVenueTypes());
    forceUpdate();
  };

  const selectFilter = (groupId: number, filterId: number) => {
    AnalyticsService.logEvent({
      type: 'toggled_filter',
      metaData: {
        groupId,
        filterId,
      },
    }).then(() => {});

    props.filterService.toggleFilter(groupId, filterId);

    setFilters(props.filterService.getVenueTypes());
    forceUpdate();
  };

  return (
    <ModalContainer props={{
      title: 'Filters',
      fullScreen: true,
      onClose: closeModal,
    }}
    >
      <ScrollView>
        {filters.map((venueType) => (
          <Accordion
            key={venueType.id}
            props={{
              title: venueType.label,
              bottomBorder: true,
            }}
          >
            <>
              <View style={{
                ...Styles.flexRow,
                ...Styles.justifyBetween,
                ...Styles.itemsCenter,
                ...Styles.px2,
                ...Styles.borderBottom,
                ...Styles.borderGreyOff,
                ...(Platform.OS === 'android' ? { ...Styles.py0, ...Styles.pr2 } : Styles.py2),
              }}
              >
                <Text style={Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold}>
                  Select All
                </Text>
                <Switch
                  style={Platform.OS === 'ios' ? Styles.scale80 : Styles.scale120}
                  trackColor={{ false: YELLOW_FADED, true: YELLOW_FADED }}
                  thumbColor={YELLOW}
                  onValueChange={() => selectGroup(venueType.id)}
                  value={props.filterService.isGroupFullySelected(venueType.id)}
                />
              </View>
              {venueType.filters.map((filter) => (
                <View
                  key={`${venueType.id}-${filter.id}`}
                  style={{
                    ...Styles.flexRow,
                    ...Styles.justifyBetween,
                    ...Styles.itemsCenter,
                    ...Styles.px2,
                    ...Styles.borderBottom,
                    ...Styles.borderGreyOff,
                    ...(Platform.OS === 'android' ? { ...Styles.py0, ...Styles.pr2 } : Styles.py2),
                  }}
                >
                  <Text>{filter.label}</Text>

                  <Switch
                    style={Platform.OS === 'ios' ? Styles.scale80 : Styles.scale120}
                    trackColor={{ false: BLUE_LIGHT, true: BLUE_LIGHT }}
                    thumbColor={BLUE}
                    onValueChange={() => selectFilter(venueType.id, filter.id)}
                    value={filter.selected}
                  />
                </View>
              ))}
            </>
          </Accordion>
        ))}
      </ScrollView>
    </ModalContainer>
  );
}
