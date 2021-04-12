import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FieldDataModel } from 'src/app/models/field.model';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { LocationPropertiesModel } from 'src/app/models/location.model';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  // Field Inputs
  @Input() field!: FieldDataModel;
  @Input() fieldLocation!: LocationPropertiesModel;

  // Maps Inputs
  @Input() draggableCursor!: string;
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

  latitude!: number;
  longitude!: number;
  zoom = 18;
  minZoom = 10;
  mapTypeId = 'roadmap';
  title = 'toto';

  // Info window
  isOpen = true;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.fieldLocation);
    this.getCoordinates();
  }

  getCoordinates(): void {
    this.latitude = this.field.coordonnees[0];
    this.longitude = this.field.coordonnees[1];
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: 'Veuillez confirmer',
      content: 'Vous allez être redirigé vers le service Google Maps',
      handleAccept: () => this.redirectToGoogleMap(this.fieldLocation.label),
    };

    this.dialog.open(DialogComponent, dialogConfig);
  }

  redirectToGoogleMap(address: string): Window | null {
    return window.open(`http://maps.google.com?q=${address}`);
  }
}
