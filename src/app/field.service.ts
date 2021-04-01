import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { FieldsModel, FieldRecordsModel} from './models/field.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor(private http: HttpClient) {}

  fieldSubject!: FieldRecordsModel;
  private field = new BehaviorSubject(this.fieldSubject);
  currentField = this.field.asObservable();

  getFields(rows: number, start: number, city: string): Observable<FieldsModel> {
    return this.http.get<FieldsModel>(
      `${environment.openDataSoft}&q=&rows=${rows}&start=${start}&refine.comlib=${city}`
    );
  }

  getFieldsByType(rows: number, start: number, city: string, type: string): Observable<FieldsModel> {
    return this.http.get<FieldsModel>(
      `${environment.openDataSoft}&q=&rows=${rows}&start=${start}&refine.comlib=${city}&refine.equipementtypecode=${type}`
    );
  }

  getSelectedField(field: FieldRecordsModel): void {
    return this.field.next(field);
  }

  getFieldById(id: string | null): Observable<FieldsModel> {
    return this.http.get<FieldsModel>(`${environment.openDataSoft}&refine.recordid=${id}`);
  }
}
