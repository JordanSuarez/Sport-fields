import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { FieldService } from 'src/app/services/field/field.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
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
  localStorageKey!: string;

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
  filterPaginator: PaginatorModel = {
    length: 0,
    pageSize: 10,
    pageIndex: 0,
  };

  // Fields Inputs
  getFields!: (...arg: any) => Observable<FieldsModel>;
  fields: Array<FieldRecordsModel> = [];
  isLoading = true;
  noResult!: boolean;

  // Select city Inputs
  selectedCity = 'Chalon-sur-Saône';

  constructor(
    private locationService: LocationService,
    private fieldService: FieldService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.resetFieldsContentBeforeFetchingData();
    this.fetchFilteredFieldsList();
    console.log(this.filterActivated)
  }

  fetchFilteredFieldsList(): void {
    this.filterSubscription = this.fieldService.filteredField.subscribe({
      next: (fieldLocation) => {
        if (fieldLocation) {
          if (fieldLocation !== this.userFilterInput) {
            this.localStorageService.removeItem('filterFields');
          }
          this.userFilterInput = fieldLocation;
          this.address = fieldLocation.address;
          this.filterActivated = true;
          this.localStorageKey = 'filterFields';
          this.localStorageService.removeItem('homeFields');
          return this.getFieldsDataFromLocalStorage();
        }
        if (this.localStorageService.getItem('filterFields')) {
          this.userFilterInput = this.localStorageService.getItem('filterFields').userFilterInput;
        }
        this.localStorageKey = 'homeFields';
        return this.getFieldsDataFromLocalStorage();
      },
      error: () => {},
      complete: () => {},
    });
  }

  handleChangeStateComponent(): void {
    this.localStorageService.removeItem('filterFields');
    this.filterActivated = false;
    this.fetchFieldsList();
  }

  getFieldsDataFromLocalStorage(): void {
    if (this.filterActivated && this.localStorageService.getItem('filterFields') !== null) {
      this.fields = this.localStorageService.getItem('filterFields').fields;
      this.filterPaginator = this.localStorageService.getItem('filterFields').paginator;
      this.address = this.localStorageService.getItem('filterFields').address;
      this.userFilterInput = this.localStorageService.getItem('filterFields').userFilterInput;
      this.filterActivated = true;
      this.isLoading = false;
      return;
    } else if (!this.filterActivated && this.localStorageService.getItem('homeFields') !== null) {
        this.fields = this.localStorageService.getItem(this.localStorageKey).fields;
        this.paginator = this.localStorageService.getItem(this.localStorageKey).paginator;
        this.isLoading = false;
        return;
    }
    this.filterActivated ? this.fetchFieldsByGeoFilter() : this.fetchFieldsList();
  }

  handleChangePage(event: PageEvent): void {
    if (this.filterActivated) {
      console.log(this.filterActivated)
      this.filterPaginator.pageIndex = event.pageIndex;
      return this.fetchFieldsByGeoFilter();
    }
    this.paginator.pageIndex = event.pageIndex;
    return this.fetchFieldsList();
  }

  fetchFieldsList(): void {
    this.resetFieldsContentBeforeFetchingData();
    this.fieldService.fetchFields(this.paginator.pageSize, this.paginator.pageIndex * 10, this.selectedCity)
        .subscribe({
          next: (fields) => {
            console.log(fields);
            if (fields.nhits === 0) {
              this.isLoading = false;
              return this.noResult = true;
            }
            this.paginator.length = fields.nhits;
            return  this.fetchFieldsLocation(fields);
          },
          error: () => {},
          complete: () => {},
        });
  }

  fetchFieldsByGeoFilter(): void {
    this.resetFieldsContentBeforeFetchingData();
    this.fieldService.fetchFieldsByGeoFilter(this.filterPaginator.pageSize, this.filterPaginator.pageIndex * 10, this.userFilterInput)
        .subscribe({
          next: (fields) => {
            if (fields.nhits === 0) {
              this.isLoading = false;
              return this.noResult = true;
            }
            this.filterPaginator.length = fields.nhits;
            return this.fetchFieldsLocation(fields);
          },
          error: () => {},
          complete: () => {},
        });
  }

   fetchFieldsLocation(fields: FieldsModel): void {
      fields.records.map((field: FieldRecordsModel) => {
        this.locationService
          .getFieldLocation(field.fields.coordonnees[0], field.fields.coordonnees[1])
          .subscribe({
            next: ({features}) => {
              this.fields = [...this.fields, {...field, location: features[0] ? features[0].properties : {}}];
              this.setFieldsDataToLocalStorage();

            },
            error: () => {},
            complete: () => this.isLoading = false,
          });
      }
    );
  }

  setFieldsDataToLocalStorage(): void {
    this.localStorageService.setItem(
      this.localStorageKey,
      {
        fields: this.fields,
        paginator: this.filterActivated ? this.filterPaginator : this.paginator,
        address: this.address ? this.address : '',
        userFilterInput: this.userFilterInput ? this.userFilterInput : null
      }
    );
  }

  resetFieldsContentBeforeFetchingData(): void {
    this.isLoading = true;
    this.fields = [];
  }

  // handleChangeCity(): void {
  //   this.fetchFieldsList();
  // }


  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
