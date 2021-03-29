import { Injectable } from '@angular/core';
import * as sportFields from 'src/assets/data/sportFields.json';


@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor() {}
  sportField: any = sportFields.default;

  getFieldById(id: string | null): any {
    console.log(id);
    return this.sportField.find((field: { properties: { identifiant: string | null; }; }) => field.properties.identifiant === id);
  }
}
