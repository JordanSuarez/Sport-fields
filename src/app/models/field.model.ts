import {LocationModel} from './location.model';

export interface FieldsModel {
  nhits: number;
  records: Array<FieldRecordsModel>;
}

export interface FieldRecordsModel {
  fields: FieldDataModel;
  recordid: string;
  location: LocationModel;
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
