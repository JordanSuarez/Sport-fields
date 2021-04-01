import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { FieldRecordsModel, FieldsModel } from 'src/app/models/field.model';
import { PaginatorModel } from 'src/app/models/paginator.model';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LocationService } from 'src/app/location.service';
import { FieldService } from 'src/app/field.service';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {
  // Paginator Input
  paginator: PaginatorModel = {
    length: 0,
    pageSize: 10,
    pageIndex: 0,
  };

  // Fields Inputs
  @Input() getFields!: (...arg: any) => Observable<any>;
  fields: Array<FieldRecordsModel> = [];
  isLoading = true;

  // Localstorage Inputs
  @Input() localStorageKey!: string;


  constructor(
    private locationService: LocationService,
    private fieldService: FieldService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
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
    this.isLoading = true;
    this.fields = [];
    this.fetchFieldsList();
  }

  fetchFieldsList(): void {
    this.getFields(this.paginator.pageSize, this.paginator.pageIndex * 10, 'Lyon').subscribe(fields => {
      this.paginator.length = fields.nhits;
      this.fetchFieldsLocation(fields);
    });
  }

  fetchFieldsLocation(fields: FieldsModel): void {
    fields.records.map((field: FieldRecordsModel) => {
      this.locationService
          .getFieldLocation(field.fields.coordonnees[0], field.fields.coordonnees[1])
          .subscribe(({features}) => {
            this.fields = [
              ...this.fields,
              {
                ...field,
                location: features[0].properties,
              }
            ];
            this.setFieldsDataToLocalStorage();
            this.isLoading = false;
          })
        ;
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
}
