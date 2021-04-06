import { LocationPropertiesModel } from './location.model';

export interface FieldsModel {
  nhits: number;
  records: Array<FieldRecordsModel>;
}

export interface FieldRecordsModel {
  fields: FieldDataModel;
  recordid: string;
  location: LocationPropertiesModel;
}

export interface FieldDataModel {
  cominsee: string;
  comlib: string;
  coordonnees: Array<number>;
  equnom: string;
  insnom: string;
  naturelibelle: string;
  naturesollib: string;
  equipementtypecode: string;
  equacceshandimaire: string;
  equdatecreation: string;
}

export interface CityModel {
  name: string;
}

export interface FieldTypeModel {
  name: string;
}


