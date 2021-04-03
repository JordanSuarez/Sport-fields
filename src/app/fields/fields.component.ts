import { Component, Input, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { FieldRecordsModel, FieldsModel } from 'src/app/models/field.model';
import { LocationCoordinatesModel } from 'src/app/models/location.model';
import { PaginatorModel } from 'src/app/models/paginator.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LocationService } from 'src/app/services/location/location.service';
import { FieldService } from 'src/app/services/field/field.service';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnChanges {
  @Input() filterActivated!: boolean;
  @Input() coordinates!: LocationCoordinatesModel;

  // Paginator Input
  paginator: PaginatorModel = {
    length: 0,
    pageSize: 10,
    pageIndex: 0,
  };

  // Fields Inputs
  @Input() getFields!: (...arg: any) => Observable<FieldsModel>;
  fields: Array<FieldRecordsModel> = [];
  isLoading = true;

  // Localstorage Inputs
  @Input() localStorageKey!: string;

  // Select city Inputs
  selectedCity = 'Chalon-sur-Saône';

  constructor(
    private locationService: LocationService,
    private fieldService: FieldService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnChanges(): void {
    this.getFieldsDataFromLocalStorage();
  }

  getFieldsDataFromLocalStorage(): void {
    if (this.localStorageService.getItem(this.localStorageKey) !== null) {
      this.fields = this.localStorageService.getItem(this.localStorageKey).fields;
      this.paginator = this.localStorageService.getItem(this.localStorageKey).paginator;
      this.isLoading = false;
    } else {
      this.fetchFieldsList();
    }
  }

  handleChangePage(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
    this.resetFieldsContentBeforeFetchingData();
    this.fetchFieldsList();
  }

  fetchFieldsList(): void {
    this.getFields(
      this.paginator.pageSize,
      this.paginator.pageIndex * 10,
      this.filterActivated ? this.coordinates : this.selectedCity
    ).subscribe({
      next: (fields) => {
        this.paginator.length = fields.nhits;
        this.fetchFieldsLocation(fields);
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
            error: () => console.log('pass'),
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
        paginator: this.paginator
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
}
