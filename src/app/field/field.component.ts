import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FieldService } from 'src/app/field.service';
import { FieldDataModel } from 'src/app/models/field.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  field!: FieldDataModel;
  isLoading = true;

  constructor(private fieldService: FieldService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const fieldId = this.route.snapshot.paramMap.get('fieldId');
    this.fieldService.getFieldById(fieldId).subscribe(field => {
      this.field = field.records[0].fields;
      this.isLoading = false;
    });
  }
}
