import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { FieldsModel, FieldRecordsModel} from 'src/app/models/field.model';
import { FilterModel } from 'src/app/models/filter.model';
import { environment } from 'src/environments/environment';
import {PaginatorModel} from '../../models/paginator.model';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  // Field
  fieldSubject!: FieldRecordsModel;
  private field = new BehaviorSubject(this.fieldSubject);
  currentField = this.field.asObservable();

  // Filtered field
  fieldLocationSubject!: FilterModel;
  private fieldLocation = new BehaviorSubject(this.fieldLocationSubject);
  filteredField = this.fieldLocation.asObservable();

  private fieldType = (type: string) => type.length > 0 ? `&refine.equipementtypelib=${type}` : '';

  constructor(private http: HttpClient) {}

  // Fetch data from APIs
  fetchFields(paginator: PaginatorModel, city: string, fieldType: string): Observable<FieldsModel> {
    const rows = paginator.pageSize;
    const start = paginator.pageIndex * 10;
    return this.http.get<FieldsModel>(
      `${environment.openDataSoft}&q=&rows=${rows}&start=${start}&refine.comlib=${city}${this.fieldType(fieldType)}`
    );
  }

  fetchFieldsByType(rows: number, start: number, city: string, type: string): Observable<FieldsModel> {
    return this.http.get<FieldsModel>(
      `${environment.openDataSoft}&q=&rows=${rows}&start=${start}&refine.comlib=${city}&refine.equipementtypecode=${type}`
    );
  }

  fetchFieldById(id: string | null): Observable<FieldsModel> {
    return this.http.get<FieldsModel>(`${environment.openDataSoft}&refine.recordid=${id}`);
  }

  fetchFieldsByGeoFilter(paginator: PaginatorModel, filteredField: FilterModel, fieldType: string): Observable<FieldsModel> {
    const rows = paginator.pageSize;
    const start = paginator.pageIndex * 10;
    const longitude = filteredField.location.geometry.coordinates[1];
    const latitude = filteredField.location.geometry.coordinates[0];
    return this.http.get<FieldsModel>(`${environment.openDataSoft}&q=&rows=${rows}&start=${start}&geofilter.distance=${longitude}%2C+${latitude}%2C+${filteredField.distance}${this.fieldType(fieldType)}`);
  }

  // Share data between components
  setSelectedField(field: FieldRecordsModel): void {
    return this.field.next(field);
  }

  setFilteredField(filteredField: FilterModel): void {
    return this.fieldLocation.next(filteredField);
  }
}
