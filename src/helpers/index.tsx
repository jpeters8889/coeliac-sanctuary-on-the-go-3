import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { YELLOW } from '../constants';
import { EateryType } from '../types';

const formatAddress = (address: string) => address.split('<br />').filter(() => true).join(', ');

const placeIcon = (icon: EateryType) => {
  switch (icon) {
    case 'att':
      return <MaterialIcons name="attractions" size={24} color={YELLOW} />;
    case 'hotel':
      return <FontAwesome name="hotel" size={24} color={YELLOW} />;
    default:
      return <FontAwesome5 name="utensils" size={24} color={YELLOW} />;
  }
};

export { formatAddress, placeIcon };
