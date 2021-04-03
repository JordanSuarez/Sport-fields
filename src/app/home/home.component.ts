import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import { FieldService } from 'src/app/services/field/field.service';
import { HOME_FIELDS, LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LocationCoordinatesModel } from 'src/app/models/location.model';
import { FieldsModel } from 'src/app/models/field.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  localStorageKey = HOME_FIELDS;

  // Filter Input
  filterActivated!: boolean;
  selectedAddress!: string;
  coordinates!: LocationCoordinatesModel;
  subscription!: Subscription;

  constructor(private fieldService: FieldService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.clearItems(this.localStorageKey);
    this.fetchFilteredFieldsList();
  }

  getFields(...arg: any): Observable<FieldsModel> {
    // @ts-ignore
    return this.fieldService.fetchFields(...arg, );
  }

  getFilteredFields(...arg: any): Observable<FieldsModel> {
      // @ts-ignore
      return this.fieldService.fetchFieldsByGeoFilter(...arg);
  }

  fetchFilteredFieldsList(): void {
    this.subscription = this.fieldService.filteredField.subscribe({
      next: (filteredFields) => {
        if (filteredFields) {
          console.log(filteredFields);
          this.filterActivated = true;
          this.coordinates = filteredFields.geometry;
          this.selectedAddress = filteredFields.properties.label;
        }
      },
      error: () => {},
      complete: () => {},
    });
  }

  handleChangeStateComponent(): void {
    this.filterActivated = false;
  }
}
