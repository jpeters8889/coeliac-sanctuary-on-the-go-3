import { SuggestEateryResponse, SuggestEditField } from '../../../types';

export default (eatery: SuggestEateryResponse): SuggestEditField[] => [
  {
    id: 'address',
    label: 'Address',
    shouldDisplay: !eatery.is_nationwide,
    getter: () => eatery.address.split('<br />').join('\n'),
    component: {
      component: 'textarea',
      value: () => eatery.address.split('<br />').join('\n'),
      props: {
        rows: 6,
      },
    },
    updated: false,
  },
  {
    id: 'website',
    label: 'Website',
    shouldDisplay: true,
    getter: () => eatery.website,
    component: {
      component: 'input',
      value: () => eatery.website,
      componentProps: {
        keyboardType: 'url',
        textContentType: 'URL',
      },
    },
    truncate: true,
    updated: false,
  },
  {
    id: 'gf_menu_link',
    label: 'Gluten Free Menu Link',
    shouldDisplay: true,
    getter: () => eatery.gf_menu_link,
    component: {
      component: 'input',
      value: () => eatery.gf_menu_link,
      componentProps: {
        keyboardType: 'url',
        textContentType: 'URL',
      },
    },
    truncate: true,
    updated: false,
  },
  {
    id: 'phone',
    label: 'Phone Number',
    shouldDisplay: !eatery.is_nationwide,
    getter: () => eatery.phone,
    component: {
      component: 'input',
      value: () => eatery.phone,
      componentProps: {
        keyboardType: 'phone-pad',
        textContentType: 'telephoneNumber',
      },
    },
    updated: false,
  },
  {
    id: 'venue_type',
    label: 'Venue Type',
    shouldDisplay: true,
    getter: () => eatery.venue_type.label,
    component: {
      component: 'select',
      value: () => eatery.venue_type.values.map((option) => option.value).indexOf(eatery.venue_type.id as number),
      props: {
        options: eatery.venue_type.values,
      },
    },
    updated: false,
  },
  {
    id: 'cuisine',
    label: 'Cuisine',
    shouldDisplay: eatery.type_id === 1,
    getter: () => eatery.cuisine.label,
    component: {
      component: 'select',
      value: () => eatery.cuisine.values.map((option) => option.value).indexOf(eatery.cuisine.id as number),
      props: {
        options: eatery.cuisine.values,
      },
    },
    updated: false,
  },
  {
    id: 'opening_times',
    label: 'Opening Times',
    shouldDisplay: eatery.type_id !== 3 && !eatery.is_nationwide,
    getter: () => {
      if (!eatery.opening_times) {
        return null;
      }

      if (!eatery.opening_times.today) {
        return 'Currently closed';
      }

      return eatery.opening_times.today.join(' - ');
    },
    component: {
      component: 'opening-times',
      props: {
        currentOpeningTimes: eatery.opening_times,
      },
    },
    updated: false,
  },
  {
    id: 'features',
    label: 'Features',
    shouldDisplay: true,
    getter: () => eatery.features.selected.map((feature) => feature.label).join(', '),
    component: {
      component: 'features',
      props: {
        currentFeatures: eatery.features.values,
      },
    },
    updated: false,
  },
  {
    id: 'info',
    label: 'Additional Information',
    shouldDisplay: true,
    getter: () => 'Is there anything else we should know about this location?',
    truncate: false,
    component: {
      component: 'textarea',
      value: () => '',
    },
    updated: false,
  },
];
