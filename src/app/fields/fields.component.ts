import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { FieldRecordsModel } from 'src/app/models/field.model';
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
  @Input() fields: Array<FieldRecordsModel> = [];
  @Input() isLoading!: boolean;
  // TODO display no result component if true
  @Input() noResult!: boolean;

  // Select city Inputs
  @Input() selectedCity!: string;

  // Paginator Output
  @Output() paginatorEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  pageEvent(event: PageEvent): void {
    this.paginatorEvent.emit(event);
  }
}
