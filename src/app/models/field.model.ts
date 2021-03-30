export interface FieldModel {
  nhits: number;
  records: Array<FieldRecordsModel>;
}

export interface FieldRecordsModel {
  fields: FieldDataModel;
  recordid: string;
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
  equdatemaj: string;
}
