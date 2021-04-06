import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { CityModel, FieldRecordsModel, FieldTypeModel } from 'src/app/models/field.model';
import { cities } from 'src/app/constants/cities';
import { fieldTypes } from 'src/app/constants/field-types';
import { PaginatorModel } from 'src/app/models/paginator.model';
import { FilterModel } from 'src/app/models/filter.model';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {
  // Filter Inputs
  @Input() filterActivated!: boolean;
  @Input() userFilterInput!: FilterModel;

  // Paginator Input
  @Input() paginator!: PaginatorModel;

  // Fields Inputs
  @Input() selectedFieldType!: string;
  @Input() fields: Array<FieldRecordsModel> = [];
  @Input() isLoading!: boolean;
  // TODO display no result component if true
  @Input() noResult!: boolean;

  // Select city Inputs
  @Input() selectedCity!: string;
  cities: Array<CityModel> = cities;
  fieldTypes: Array<FieldTypeModel> = fieldTypes;

  // Paginator Output
  @Output() paginatorEvent = new EventEmitter<any>();
  @Output() selectCityEvent = new EventEmitter<any>();
  @Output() checkFieldType = new EventEmitter<any>();
  @Output() stateComponent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  pageEvent(event: PageEvent): void {
    this.paginatorEvent.emit(event);
  }

  handleChangeCity(value: string): void {
    this.selectCityEvent.emit(value);
  }

  handleCheckbox(value: any): void {
    this.checkFieldType.emit(value.value);
  }

  handleChangeStateComponent(): void {
    this.stateComponent.emit();
  }
}
