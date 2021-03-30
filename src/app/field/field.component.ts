import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FieldService } from 'src/app/field.service';
import { FieldDataModel, FieldRecordsModel } from 'src/app/models/field.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  isLoading = true;
  field!: FieldDataModel;
  similarFields!: Array<FieldDataModel>;

  // Google map attributes
  zoomControl = false;
  disableDoubleClickZoom = true;
  scrollwheel = false;
  disableDefaultUI = true;
  keyboardShortcuts = false;
  streetViewControl = false;
  openInfoWindow = false;
  showDefaultInfoWindow = false;
  mapDraggable = false;
  clickable = false;
  clickableIcons = false;
  mapTypeControl = false;
  draggableCursor = 'cursor';

  constructor(private fieldService: FieldService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const fieldId = this.route.snapshot.paramMap.get('fieldId');
    this.fieldService.getFieldById(fieldId).subscribe(field => {
      this.field = field.records[0].fields;
      this.isLoading = false;
    });
  }

  handleClick(city: string, fieldType: string): void {
    this.fieldService.getFieldsByType(10, city, fieldType).subscribe(({records}) => {
      this.similarFields = records.map(({fields}) => fields);
    });
  }
}
