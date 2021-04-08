import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CityModel, FieldRecordsModel, FieldTypeModel } from 'src/app/models/field.model';
import { fieldTypes, cities } from 'src/assets/data/field';
import { PaginatorModel } from 'src/app/models/paginator.model';
import { FilterModel } from 'src/app/models/filter.model';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent {
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

  // Output
  @Output() paginatorEvent = new EventEmitter<any>();
  @Output() selectCityEvent = new EventEmitter<any>();
  @Output() selectedFieldTypeEvent = new EventEmitter<any>();
  @Output() clearEvent = new EventEmitter<any>();
  @Output() noResultEvent = new EventEmitter<any>();

  // HTML Inputs
  template = {
    title: 'Liste des équipements',
    selectedCityLabel: 'Sélectionner une ville',
    addressLabel: 'Adresse sélectionné',
    selectedFieldType: {
      label: 'Filtrer par type d\'équipement',
      option: 'Aucun',
    },
  };

  constructor() {}

  handleEvent(event: EventEmitter<any>, eventValue: any = null): void {
    if (eventValue) {
      return event.emit(eventValue);
    }
    return event.emit();
  }
}
