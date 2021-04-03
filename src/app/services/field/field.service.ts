import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { FieldsModel, FieldRecordsModel} from 'src/app/models/field.model';
import { LocationCoordinatesModel, LocationModel } from 'src/app/models/location.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor(private http: HttpClient) {}

  // Field
  fieldSubject!: FieldRecordsModel;
  private field = new BehaviorSubject(this.fieldSubject);
  currentField = this.field.asObservable();

  // Filtered field
  fieldLocationSubject!: LocationModel;
  private fieldLocation = new BehaviorSubject(this.fieldLocationSubject);
  filteredField = this.fieldLocation.asObservable();

  // Fetch data from APIs
  fetchFields(rows: number, start: number, city: string): Observable<FieldsModel> {
    return this.http.get<FieldsModel>(
      `${environment.openDataSoft}&q=&rows=${rows}&start=${start}&refine.comlib=${city}`
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

  fetchFieldsByGeoFilter(rows: number, start: number, {coordinates}: LocationCoordinatesModel): Observable<FieldsModel> {
    // TODO set distance from filter component
    // Distance meter
    const distance = 1000;
    const longitude = coordinates[1];
    const latitude = coordinates[0];
    return this.http.get<FieldsModel>(`${environment.openDataSoft}&q=&rows=${rows}&start=${start}&geofilter.distance=${longitude}%2C+${latitude}%2C+${distance}`);
  }

  // Share data between components
  setSelectedField(field: FieldRecordsModel): void {
    return this.field.next(field);
  }
  setFilteredField(fieldLocation: LocationModel): void {
    return this.fieldLocation.next(fieldLocation);
  }
}
