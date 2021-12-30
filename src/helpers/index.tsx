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

const notEmpty = (check: any): Boolean => {
  if (check instanceof Array) {
    return check.length > 0;
  }

  if (check instanceof Object) {
    return check !== {};
  }

  if (check instanceof String) {
    return check !== '';
  }

  if (check instanceof Boolean) {
    return check;
  }

  if (check === null) {
    return false;
  }

  return !!check;
};

export { formatAddress, placeIcon, notEmpty };
