import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { FieldService } from 'src/app/services/field/field.service';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';
import { HOME_FIELDS } from 'src/app/constants/session-storage';
import { FilterModel } from 'src/app/models/filter.model';
import { FieldRecordsModel, FieldsModel } from 'src/app/models/field.model';
import { PaginatorModel } from 'src/app/models/paginator.model';
import { LocationService } from 'src/app/services/location/location.service';
import { cities } from 'src/app/constants/cities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sessionStorageKey = HOME_FIELDS ;

  // Filter Input
  filterActivated = false;
  userFilterInput!: FilterModel;
  filterSubscription!: Subscription;

  // Paginator Input
  paginator: PaginatorModel = {
    length: 0,
    pageSize: 10,
    pageIndex: 0,
  };

  // Fields Inputs
  selectedFieldType = '';
  fields: Array<FieldRecordsModel> = [];
  selectedCity = cities[0].name;
  noResult!: boolean;
  isLoading = true;

  constructor(
    private locationService: LocationService,
    private fieldService: FieldService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.resetFieldsContentBeforeFetchingData();
    this.fetchFilteredFieldsList();
  }

  fetchFilteredFieldsList(): void {
    this.filterSubscription = this.fieldService.filteredField.subscribe({
      next: (fieldLocation) => {
        if (fieldLocation) {
          if (fieldLocation !== this.userFilterInput) {
            this.sessionStorageService.removeItem(HOME_FIELDS);
          }
          this.resetPaginator();
          this.selectedFieldType = '';
          this.userFilterInput = fieldLocation;
          this.filterActivated = true;
          return this.getFieldsDataFromSessionStorage();
        }
        return this.getFieldsDataFromSessionStorage();
      },
    });
  }

  getFieldsDataFromSessionStorage(): void {
    if (this.sessionStorageService.getItem(HOME_FIELDS) !== null) {
      this.fields = this.sessionStorageService.getItem(HOME_FIELDS).fields;
      this.paginator = this.sessionStorageService.getItem(HOME_FIELDS).paginator;
      this.filterActivated = this.sessionStorageService.getItem(HOME_FIELDS).filterActivated;
      this.userFilterInput = this.sessionStorageService.getItem(HOME_FIELDS).userFilterInput;
      this.selectedCity = this.sessionStorageService.getItem(HOME_FIELDS).selectedCity;
      this.selectedFieldType = this.sessionStorageService.getItem(HOME_FIELDS).selectedFieldType;
      this.isLoading = false;
      return;
    }
    this.fetchFieldsList();
  }

  fetchFieldsList(): void {
    this.resetFieldsContentBeforeFetchingData();
    (this.filterActivated ?
      this.fieldService.fetchFieldsByGeoFilter(this.paginator, this.userFilterInput, this.selectedFieldType)
      :
      this.fieldService.fetchFields(this.paginator, this.selectedCity, this.selectedFieldType))
        .subscribe({
          next: (fields: FieldsModel) => {
            if (fields.nhits === 0) {
              this.isLoading = false;
              return this.noResult = true;
            }
            this.paginator.length = fields.nhits;
            return fields.records.map(field => this.fetchFieldsLocation(field));
          },
        });
  }

  fetchFieldsLocation(field: FieldRecordsModel): void {
    this.locationService
      .getFieldLocation(field.fields.coordonnees[0], field.fields.coordonnees[1])
      .subscribe({
        next: ({features}) => {
          this.fields = [...this.fields, {...field, location: features[0] ? features[0].properties : {}}];
          this.setFieldsDataToSessionStorage();
          this.isLoading = false;
        },
      });
  }

  setFieldsDataToSessionStorage(): void {
    this.sessionStorageService.setItem(
      this.sessionStorageKey,
      {
        fields: this.fields,
        paginator: this.paginator,
        selectedCity: this.selectedCity,
        filterActivated: this.filterActivated,
        userFilterInput: this.userFilterInput ? this.userFilterInput : null,
        selectedFieldType: this.selectedFieldType
      }
    );
  }

  resetFieldsContentBeforeFetchingData(): void {
    this.isLoading = true;
    this.fields = [];
  }

  resetPaginator(): void {
    this.paginator = {
      length: 0,
      pageSize: 10,
      pageIndex: 0,
    };
  }

  handleChangeStateComponent(): void {
    this.resetFieldsContentBeforeFetchingData();
    this.selectedFieldType = '';
    this.sessionStorageService.removeItem(HOME_FIELDS);
    this.filterActivated = false;
    this.resetPaginator();
    this.fetchFieldsList();
  }

  handleChangePage(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
    this.fetchFieldsList();
  }

  handleChangeCity(value: string): void {
    this.selectedCity = value;
    this.resetPaginator();
    this.fetchFieldsList();
  }

  handleCheckFieldType(value: string): void {
    this.selectedFieldType = value ? value : '';
    this.resetPaginator();
    this.fetchFieldsList();
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
