import React from 'react';
import { View, Platform, Text } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Styles from '../../../Styles/Styles';
import { formatAddress, notEmpty } from '../../../helpers';
import LinkService from '../../../libs/LinkService';
import { Eatery } from '../../../types';
import SideButton from './SideButton';

type Props = {
  props: {
    eatery: Eatery
    setShowOpeningTimesModal: (show: boolean) => void,
  },
};

export default function EateryInfo({ props }: Props) {
  const openingTimesLabel = (): string => {
    if (props.eatery.opening_times?.is_open_now) {
      return `Open Now, closes at ${props.eatery.opening_times.closes_at}`;
    }

    return 'Currently Closed';
  };

  const phoneLink = (): string => `tel:${props.eatery.phone.replace(/ /g, '')}`;

  const averageExpenseArray = (): number[] => {
    const rtr = [];

    // @ts-ignore
    for (let x = 0; x < parseInt(props.eatery.average_expense.value, 10); x++) {
      rtr.push(x);
    }

    return rtr;
  };

  return (
    <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
      {props.eatery.type.type !== 'att' && (
      <Text style={Styles.mb4}>
        {props.eatery.info}
      </Text>
      )}

      {props.eatery.type.type === 'att' && (
      <View>
        {props.eatery.restaurants.map((restaurant) => (
          <View key={restaurant.id} style={Styles.mb2}>
            <Text style={{
              ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
              ...Styles.textLg,
            }}
            >
              {restaurant.restaurant_name}
            </Text>
            <Text>{restaurant.info}</Text>
          </View>
        ))}
      </View>
      )}

      <View style={{ ...Styles.flexRow, ...Styles.justifyBetween }}>
        <View>
          {notEmpty(props.eatery.average_expense) && (
          <View style={{
            ...(notEmpty(props.eatery.address) ? Styles.mb2 : null),
            ...Styles.flexRow,
          }}
          >
            <Text style={{ ...Styles.textLg, ...(Platform.OS === 'android' ? Styles.fontBold : Styles.fontSemibold) }}>
              {averageExpenseArray().map(() => '£')}
              {' '}
              -
              {props.eatery.average_expense?.label}
            </Text>
          </View>
          )}

          {(notEmpty(props.eatery.address) || notEmpty(props.eatery.branch?.address)) && (
          <Text>
            {formatAddress(props.eatery.branch ? props.eatery.branch.address : props.eatery.address, '\n')}
          </Text>
          )}
        </View>

        <View>
          {notEmpty(props.eatery.phone) && (
          <SideButton props={{
            onPress: () => LinkService.openLink(phoneLink()),
            label: 'Call Now',
            icon: <Ionicons name="call" size={18} color="black" />,
            bottomMargin: true,
          }}
          />
          )}

          {notEmpty(props.eatery.opening_times) && (
          <SideButton props={{
            onPress: () => props.setShowOpeningTimesModal(true),
            label: openingTimesLabel(),
            icon: false,
            bottomMargin: true,
          }}
          />
          )}

          {notEmpty(props.eatery.website) && (
          <SideButton props={{
            onPress: () => LinkService.openLink(props.eatery.website),
            label: 'Visit Website',
            icon: <FontAwesome name="external-link" size={18} color="black" />,
            bottomMargin: true,
          }}
          />
          )}

          {notEmpty(props.eatery.gf_menu_link) && (
          <SideButton props={{
            onPress: () => LinkService.openLink(props.eatery.gf_menu_link),
            label: 'Gluten Free Menu',
            icon: <FontAwesome name="external-link" size={18} color="black" />,
          }}
          />
          )}
        </View>
      </View>
    </View>
  );
}
