import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

import { FieldService } from 'src/app/field.service';
import { FieldRecordsModel } from 'src/app/models/field.model';
import { LocationService } from 'src/app/location.service';
import { LocationModel } from 'src/app/models/location.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy {
  // GoogleMap Input
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

  // Field Input
  field!: FieldRecordsModel;
  fieldLocation!: LocationModel;
  isLoading = true;
  similarFields!: Array<FieldRecordsModel>;
  subscription!: Subscription;
  date!: string;
  localID: string;

  constructor(
    private fieldService: FieldService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    @Inject( LOCALE_ID ) localID: string
  ) {
    this.localID = localID;
  }

  ngOnInit(): void {
    this.subscription = this.fieldService.currentField.subscribe(field => {
      if (!field) {
        return this.fetchFieldById();
      }
      this.handleDisplayField(field);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleClick(city: string, fieldType: string): void {
    this.fieldService.getFieldsByType(11, city, fieldType).subscribe(({records}) => {
      this.similarFields = records.filter((field) => {
        return field.recordid !== this.field.recordid;
      });
    });
  }

  fetchFieldById(): void {
    const fieldId = this.route.snapshot.paramMap.get('fieldId');
    this.fieldService.getFieldById(fieldId).subscribe(field => {
      this.handleDisplayField(field.records[0]);
    });
  }

  handleDisplayField(field: FieldRecordsModel): void {
    this.locationService.getFieldLocation(field.fields.coordonnees[0], field.fields.coordonnees[1])
      .subscribe(({features}) => {
        if (field.fields.equdatecreation) {
          this.date = formatDate(field.fields.equdatecreation, 'mediumDate', this.localID);
        }
        this.fieldLocation = features[0].properties;
        this.field = field;
        this.isLoading = false;
      });
  }
}
