import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { FieldService } from 'src/app/services/field/field.service';
import { HOME_FIELDS, LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FilterModel } from 'src/app/models/filter.model';
import { FieldRecordsModel, FieldsModel } from 'src/app/models/field.model';
import { PaginatorModel } from 'src/app/models/paginator.model';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  localStorageKey = HOME_FIELDS ;

  // Filter Input
  filterActivated = false;
  userFilterInput!: FilterModel;
  address!: string;
  filterSubscription!: Subscription;

  // Paginator Input
  paginator: PaginatorModel = {
    length: 0,
    pageSize: 10,
    pageIndex: 0,
  };

  // Select city Inputs
  selectedCity = 'Chalon-sur-Saône';

  // Fields Inputs
  fields: Array<FieldRecordsModel> = [];
  isLoading = true;
  noResult!: boolean;

  constructor(
    private locationService: LocationService,
    private fieldService: FieldService,
    private localStorageService: LocalStorageService
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
            this.localStorageService.removeItem(HOME_FIELDS);
          }
          this.paginator = {
            length: 0,
            pageSize: 10,
            pageIndex: 0,
          };
          this.userFilterInput = fieldLocation;
          this.address = fieldLocation.address;
          this.filterActivated = true;
          return this.getFieldsDataFromLocalStorage();
        }
        return this.getFieldsDataFromLocalStorage();
      },
    });
  }

  handleChangeStateComponent(): void {
    this.resetFieldsContentBeforeFetchingData();
    this.localStorageService.removeItem(HOME_FIELDS);
    this.filterActivated = false;
    this.paginator = {
      length: 0,
      pageSize: 10,
      pageIndex: 0,
    };
    this.fetchFieldsList();
  }

  getFieldsDataFromLocalStorage(): void {
    if (this.localStorageService.getItem(HOME_FIELDS) !== null) {
      this.fields = this.localStorageService.getItem(HOME_FIELDS).fields;
      this.paginator = this.localStorageService.getItem(HOME_FIELDS).paginator;
      this.address = this.localStorageService.getItem(HOME_FIELDS).address;
      this.filterActivated = this.localStorageService.getItem(HOME_FIELDS).filterActivated;
      this.userFilterInput = this.localStorageService.getItem(HOME_FIELDS).userFilterInput;
      this.isLoading = false;
      return;
    }
    this.fetchFieldsList();
  }

  fetchFieldsList(): void {
    this.resetFieldsContentBeforeFetchingData();
    (this.filterActivated ?
      this.fieldService.fetchFieldsByGeoFilter(this.paginator, this.userFilterInput)
      :
      this.fieldService.fetchFields(this.paginator, this.selectedCity))
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
          this.setFieldsDataToLocalStorage();
          this.isLoading = false;
        },
      });
  }

  setFieldsDataToLocalStorage(): void {
    this.localStorageService.setItem(
      this.localStorageKey,
      {
        fields: this.fields,
        paginator: this.paginator,
        address: this.address ? this.address : '',
        filterActivated: this.filterActivated,
        userFilterInput: this.userFilterInput ? this.userFilterInput : null
      }
    );
  }

  resetFieldsContentBeforeFetchingData(): void {
    this.isLoading = true;
    this.fields = [];
  }

  handleChangePage(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
    return this.fetchFieldsList();
  }

  handleChangeCity(): void {
    this.fetchFieldsList();
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
