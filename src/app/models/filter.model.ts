import { LocationModel } from './location.model';

export interface FilterModel {
  location: LocationModel;
  distance: number;
  address: string;
}
