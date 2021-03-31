import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import {FieldDataModel, FieldModel, FieldRecordsModel} from './models/field.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor(private http: HttpClient) {}

  fieldSubject!: FieldRecordsModel;
  private field = new BehaviorSubject(this.fieldSubject);
  currentField = this.field.asObservable();

  getFields(rows: number, start: number, city: string): Observable<FieldModel> {
    return this.http.get<FieldModel>(`${environment.openDataSoft}&q=&rows=${rows}&start=${start}&refine.comlib=${city}`);
  }

  getChoosenField(field: FieldRecordsModel): void {
    return this.field.next(field);
  }

  getFieldsByType(rows: number, city: string, type: string): Observable<FieldModel> {
    return this.http.get<FieldModel>(`${environment.openDataSoft}&q=&rows=${rows}&refine.comlib=${city}&refine.equipementtypecode=${type}`);
  }
}
