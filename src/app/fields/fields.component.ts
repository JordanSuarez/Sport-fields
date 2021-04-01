import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { FieldRecordsModel, FieldsModel } from 'src/app/models/field.model';
import { LocationService } from 'src/app/location.service';
import { FieldService } from 'src/app/field.service';
import { FIELDS, LocalStorageService } from 'src/app/local-storage.service';
import { PaginatorModel } from 'src/app/models/paginator.model';

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
  fields: Array<FieldRecordsModel> = [];
  isLoading = true;

  constructor(
    private locationService: LocationService,
    private fieldService: FieldService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.getItem(FIELDS) !== null) {
      this.fields = this.localStorageService.getItem(FIELDS).fields;
      this.paginator = this.localStorageService.getItem(FIELDS).paginator;
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
    this.fieldService.getFields(this.paginator.pageSize, this.paginator.pageIndex, 'Lyon').subscribe(fields => {
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
            this.localStorageService.setItem(
              FIELDS,
              {
                fields: this.fields,
                paginator: {
                  length: this.paginator.length,
                  pageIndex: this.paginator.pageIndex
                }
              }
            );
            this.isLoading = false;
          })
        ;
      }
    );
  }
}
