import {Component, Input, OnInit} from '@angular/core';

import { FieldRecordsModel } from 'src/app/models/field.model';
import { FieldService } from 'src/app/services/field/field.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() field!: FieldRecordsModel;

  handicapAccess!: boolean;

  constructor(private fieldService: FieldService) {
  }

  ngOnInit(): void {
    this.handicapAccess = this.field.fields.equacceshandimaire === 'Oui';
  }

  handleFieldProvider(field: FieldRecordsModel): void {
    this.fieldService.setSelectedField(field);
  }
}
