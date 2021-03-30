import { Component, Input, OnInit } from '@angular/core';

import {FieldDataModel} from 'src/app/models/field.model';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() field!: FieldDataModel;

  latitude!: number;
  longitude!: number;
  zoom = 18;
  googleMapType = 'roadmap';

  constructor() {}
  // TODO change googleMapType with select

  ngOnInit(): void {
    this.latitude = this.field.coordonnees[0];
    this.longitude = this.field.coordonnees[1];
    this.googleMapType = 'roadmap';
  }
}
