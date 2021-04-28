import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { FieldService } from 'src/app/services/field/field.service';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';
import { HOME_FIELDS } from 'src/app/constants/session-storage';
import { FieldRecordsModel, FieldsModel, HomeModel } from 'src/app/models/field.model';
import { LocationService } from 'src/app/services/location/location.service';
import { cities } from 'src/assets/data/field';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sessionStorageKey = HOME_FIELDS ;

  // Filter Input
  filterSubscription!: Subscription;

  // Fields Inputs
  noResult = false;
  isLoading = true;

  homeModel: HomeModel = {
    fields: [],
    paginator: {
      length: 0,
      pageSize: 10,
      pageIndex: 0,
    },
    selectedFieldType: '',
    selectedCity: cities[0].name,
    filterActivated: false,
  } as unknown as HomeModel;

  constructor(
    private locationService: LocationService,
    private fieldService: FieldService,
    private sessionStorageService: SessionStorageService,
  ) {}

  ngOnInit(): void {
    this.resetFieldsContentBeforeFetchingData();
    this.fetchFilteredFieldsList();
  }

  ngOnDestroy(): void {
    if (this.filterSubscription !== null) {
      this.filterSubscription.unsubscribe();
    }
  }

  fetchFilteredFieldsList(): void {
    this.filterSubscription = this.fieldService.filteredField.subscribe({
        next: (fieldLocation) => {
          if (fieldLocation) {
            if (fieldLocation !== this.homeModel.userFilterInput) {
              this.sessionStorageService.removeItem(HOME_FIELDS);
            }
            this.homeModel = {
              ...this.homeModel,
              userFilterInput: fieldLocation,
              selectedFieldType: '',
              filterActivated: true
            };
            this.resetPaginator();
          }
          return this.getFieldsDataFromSessionStorage();
        },
      });
  }

  getFieldsDataFromSessionStorage(): void {
    if (this.sessionStorageService.getItem(HOME_FIELDS) !== null) {
      this.homeModel = this.sessionStorageService.getItem(HOME_FIELDS);
      this.isLoading = false;
      return;
    }
    this.fetchFieldsList();
  }

  fetchFieldsList(): void {
    this.resetFieldsContentBeforeFetchingData();
    (this.homeModel.filterActivated ?
      this.fieldService.fetchFieldsByGeoFilter(this.homeModel.paginator, this.homeModel.userFilterInput, this.homeModel.selectedFieldType)
      :
      this.fieldService.fetchFields(this.homeModel.paginator, this.homeModel.selectedCity, this.homeModel.selectedFieldType))
        .subscribe({
          next: (fields: FieldsModel) => {
            if (fields.nhits === 0) {
              this.isLoading = false;
              return this.noResult = true;
            }
            this.homeModel.paginator.length = fields.nhits;
            this.noResult = false;
            return fields.records.map(field => this.fetchFieldsLocation(field));
          },
          error: () => this.noResult = true,
        });
  }

  fetchFieldsLocation(field: FieldRecordsModel): void {
    this.locationService
      .getFieldLocation(field.fields.coordonnees[0], field.fields.coordonnees[1])
      .subscribe({
        next: ({features}) => {
          this.homeModel.fields = [...this.homeModel.fields, {...field, location: features[0] ? features[0].properties : {}}];
          this.setFieldsDataToSessionStorage();
          this.isLoading = false;
        },
      });
  }

  setFieldsDataToSessionStorage(): void {
    this.sessionStorageService.setItem(this.sessionStorageKey, this.homeModel);
  }

  resetFieldsContentBeforeFetchingData(): void {
    this.isLoading = true;
    this.homeModel.fields = [];
  }

  resetPaginator(): void {
    this.homeModel.paginator = {
      length: 0,
      pageSize: 10,
      pageIndex: 0,
    };
  }

  handleClearState(): void {
    this.sessionStorageService.removeItem(HOME_FIELDS);
    location.reload();
  }

  handleChangePage(event: PageEvent): void {
    this.homeModel.paginator.pageIndex = event.pageIndex;
    this.fetchFieldsList();
  }

  handleChangeUserInputValue(value: string, context: string): void {
    // @ts-ignore
    this.homeModel[context] = value ? value : '';
    this.resetPaginator();
    this.fetchFieldsList();
  }
}
