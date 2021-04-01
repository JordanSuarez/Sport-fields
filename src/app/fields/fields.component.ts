import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import {FieldRecordsModel, FieldsModel} from 'src/app/models/field.model';
import { LocationService } from 'src/app/location.service';
import { FieldService } from 'src/app/field.service';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {
  // Paginator Inputs
  length!: number;
  pageSize = 10;
  startPage = 0;

  // Fields Inputs
  fields: Array<FieldRecordsModel> = [];
  isLoading = true;

  constructor(private locationService: LocationService, private fieldService: FieldService) {}

  ngOnInit(): void {
     this.fetchFieldsList();
  }

  handleChangePage(event: PageEvent): void {
    this.startPage = event.pageIndex;
    this.isLoading = true;
    this.fields = [];
    this.fetchFieldsList();
  }

  fetchFieldsList(): void {
    this.fieldService.getFields(this.pageSize, this.startPage, 'Lyon').subscribe(fields => {
      this.length = fields.nhits;
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
            this.isLoading = false;
          })
        ;
      }
    );
  }
}
