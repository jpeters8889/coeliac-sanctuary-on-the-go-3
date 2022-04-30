import { SuggestEateryResponse, SuggestEditField } from '../../../types';

export default (eatery: SuggestEateryResponse): SuggestEditField[] => [
  {
    id: 'address',
    label: 'Address',
    shouldDisplay: !eatery.is_nationwide,
    getter: () => eatery.address.split('<br />').join('\n'),
    isFormField: true,
    formField: {
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
    isFormField: true,
    formField: {
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
    isFormField: true,
    formField: {
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
    isFormField: true,
    formField: {
      component: 'form-input',
      value: () => eatery.phone,
    },
    updated: false,
  },
  {
    id: 'venue_type',
    label: 'Venue Type',
    shouldDisplay: true,
    getter: () => eatery.venue_type.label,
    isFormField: true,
    formField: {
      component: 'form-select',
      value: () => eatery.venue_type.id,
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
    isFormField: true,
    formField: {
      component: 'form-select',
      value: () => eatery.cuisine.id,
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
    isFormField: false,
    component: {
      name: 'eatery-opening-times',
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
    isFormField: false,
    component: {
      name: 'eatery-features',
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
    isFormField: true,
    formField: {
      component: 'form-textarea',
      value: () => '',
    },
    updated: false,
  },
];
