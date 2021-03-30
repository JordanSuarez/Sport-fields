import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { FieldModel } from './models/field.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor(private http: HttpClient) {}

  getFieldList(rows: number, start: number, city: string): Observable<FieldModel> {
    return this.http.get<FieldModel>(`${environment.openDataSoft}&q=&rows=${rows}&start=${start}&refine.comlib=${city}`);
  }

  getFieldById(id: string | null): Observable<FieldModel> {
    return this.http.get<FieldModel>(`${environment.openDataSoft}&refine.recordid=${id}`);
  }
}
