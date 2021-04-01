import { Component, Input, OnInit } from '@angular/core';

import {FieldDataModel} from 'src/app/models/field.model';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() field!: FieldDataModel;
  @Input() zoomControl = true;
  @Input() disableDoubleClickZoom = false;
  @Input() scrollwheel = true;
  @Input() disableDefaultUI = false;
  @Input() keyboardShortcuts = true;
  @Input() streetViewControl = true;
  @Input() openInfoWindow = true;
  @Input() showDefaultInfoWindow = true;
  @Input() mapDraggable = true;
  @Input() clickable = true;
  @Input() clickableIcons = true;
  @Input() mapTypeControl = true;
  @Input() draggableCursor!: string;

  latitude!: number;
  longitude!: number;
  zoom = 18;
  minZoom = 10;
  mapTypeId = 'roadmap';
  title = 'toto';

  constructor() {}
  // TODO change googleMapType with select

  ngOnInit(): void {
    this.latitude = this.field.coordonnees[0];
    this.longitude = this.field.coordonnees[1];
  }
}
