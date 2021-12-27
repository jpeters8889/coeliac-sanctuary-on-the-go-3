import React, { useCallback, useState } from 'react';
import {
  ScrollView, Switch, Text, View,
} from 'react-native';
import Global from '../Styles/Global';
import { ModalProps, VenueTypeFilterGroup } from '../types';
import Accordion from '../Components/UI/Accordion';
import ModalContainer from '../Components/UI/ModalContainer';
import { FilterService } from '../libs/FilterService';
import {
  BLUE, BLUE_LIGHT, YELLOW, YELLOW_FADED,
} from '../constants';

type Props = {
  props: {
    visible?: boolean
    filterService: FilterService,
    onClose: (filters: FilterService) => void;
  }
};

export default function FilterSelectModal({ props }: Props) {
  const [filters, setFilters]: [VenueTypeFilterGroup[], any] = useState(
    props.filterService.getVenueTypes(),
  );
  const [, updateState]: [any, any] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const closeModal = () => {
    props.onClose(props.filterService);
  };

  const selectGroup = (groupId: number) => {
    props.filterService.toggleGroup(groupId);

    setFilters(props.filterService.getVenueTypes());
    forceUpdate();
  };

  const selectFilter = (groupId: number, filterId: number) => {
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
                ...Global.flexRow,
                ...Global.justifyBetween,
                ...Global.itemsCenter,
                ...Global.p2,
                ...Global.borderBottom,
                ...Global.borderGreyOff,
              }}
              >
                <Text style={Global.fontSemibold}>Select All</Text>
                <Switch
                  style={Global.scale80}
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
                    ...Global.flexRow,
                    ...Global.justifyBetween,
                    ...Global.itemsCenter,
                    ...Global.p2,
                    ...Global.borderBottom,
                    ...Global.borderGreyOff,
                  }}
                >
                  <Text>{filter.label}</Text>

                  <Switch
                    style={Global.scale80}
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
