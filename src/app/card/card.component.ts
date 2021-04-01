import { Component, Input, OnInit } from '@angular/core';

import { FieldRecordsModel } from 'src/app/models/field.model';
import { FieldService } from 'src/app/field.service';
import { LocationModel } from 'src/app/models/location.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() field!: FieldRecordsModel;
  @Input() fieldsLocation: Array<LocationModel> = [];

  constructor(private fieldService: FieldService) {}

  ngOnInit(): void {}

  handleFieldProvider(field: FieldRecordsModel): void {
    this.fieldService.getSelectedField(field);
  }
}
