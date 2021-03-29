import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() coordinates: any[] | undefined;
  @Input() fieldName: any | undefined;
  latitude: any;
  longitude: any;
  googleMapType = 'roadmap';
  zoom = 18;

  constructor() { }
  // TODO change googleMapType with select

  ngOnInit(): void {
    console.log(this.fieldName);
    // @ts-ignore
    this.latitude = this.coordinates[1];
    // @ts-ignore
    this.longitude = this.coordinates[0];
  }
}
