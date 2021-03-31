import {Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { FieldService } from 'src/app/field.service';
import { FieldDataModel, FieldRecordsModel } from 'src/app/models/field.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy {
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

  field!: FieldRecordsModel;
  isLoading = false;
  similarFields!: Array<FieldDataModel>;
  subscription!: Subscription;


  constructor(private fieldService: FieldService) { }

  ngOnInit(): Subscription {
    return this.subscription = this.fieldService.currentField.subscribe(field => this.field = field);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleClick(city: string, fieldType: string): void {
    this.fieldService.getFieldsByType(10, city, fieldType).subscribe(({records}) => {
      this.similarFields = records.map(({fields}) => fields);
    });
  }
}
