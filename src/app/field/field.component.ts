import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FieldService} from '../field.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  field: {} | undefined;
  coordinates: any[] | undefined;

  constructor(private fieldService: FieldService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const fieldId = this.route.snapshot.paramMap.get('fieldId');
    const field = this.fieldService.getFieldById(fieldId);
    this.field = field;
    this.coordinates = field.geometry.coordinates[0][0];
  }
}
