import { VenueTypeFilter, VenueTypeFilterGroup, VenueTypeResponse } from '../types';
import { ApiService } from './ApiService';

export class FilterService {
  protected venueTypes: VenueTypeFilterGroup[] = [
    {
      label: 'Eateries',
      id: 1,
      filters: [],
    },
    {
      label: 'Attractions',
      id: 2,
      filters: [],
    },
    {
      label: 'Hotels / B&Bs',
      id: 3,
      filters: [],
    },
  ];

  constructor() {
    this.populateVenueTypes();
  }

  protected populateVenueTypes() {
    if (this.venueTypes[0].filters.length > 0) {
      return;
    }

    ApiService.getVenueTypes().then((response) => {
      console.log('here');
      response.data.forEach((venueType: VenueTypeResponse) => {
        const result = this.venueTypes.find((data) => data.id === venueType.type_id);
        const index = this.venueTypes.indexOf(result as VenueTypeFilterGroup);

        if (index < 0) {
          return;
        }

        this.venueTypes[index].filters.push({
          id: venueType.id,
          label: venueType.label,
          selected: true,
        });
      });

      this.venueTypes = this.venueTypes.map((venueType) => {
        venueType.filters.sort((a, b) => ((a.label > b.label) ? 1 : -1));

        return venueType;
      });
    });
  }

  toggleFilter(groupId: number, filterId: number): void {
    const group = this.venueTypes.find((data) => data.id === groupId);
    const groupIndex = this.venueTypes.indexOf(group as VenueTypeFilterGroup);
    const filter = (<VenueTypeFilterGroup>group).filters.find((data) => data.id === filterId);
    const filterIndex = (<VenueTypeFilterGroup>group).filters.indexOf(filter as VenueTypeFilter);

    this.venueTypes[groupIndex].filters[filterIndex].selected = !this.venueTypes[groupIndex].filters[filterIndex].selected;
  }

  isGroupFullySelected(groupId: number): boolean {
    const group = this.venueTypes.find((data) => data.id === groupId);

    return (<VenueTypeFilterGroup>group)
      .filters
      .filter((filter) => !filter.selected)
      .length === 0;
  }

  toggleGroup(groupId: number): void {
    const group = this.venueTypes.find((data) => data.id === groupId);
    const groupIndex = this.venueTypes.indexOf(group as VenueTypeFilterGroup);

    const newValue = !this.isGroupFullySelected(groupId);

    this.venueTypes[groupIndex].filters = this.venueTypes[groupIndex].filters.map((filter) => {
      filter.selected = newValue;

      return filter;
    });
  }

  getVenueTypes(): VenueTypeFilterGroup[] {
    return this.venueTypes;
  }

  selectedFilters() {
    const enabledFilters: number[] = [];

    this.venueTypes.forEach((venueType) => {
      venueType.filters
        .filter((filter) => filter.selected)
        .forEach((filter) => {
          enabledFilters.push(filter.id);
        });
    });

    return enabledFilters.join();
  }
}
