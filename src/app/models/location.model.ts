export interface LocationModel {
  geometry: LocationCoordinatesModel;
  properties: LocationPropertiesModel;
}

export interface LocationCoordinatesModel {
  coordinates: Array<number>;
}

export interface LocationPropertiesModel {
  city: string;
  postcode: string;
  label: string;
  id: string;
}

export interface AddressModel {
  streetNumber: number;
  streetName: string;
  postCode: number;
  city: string;
}
