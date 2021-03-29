import {Component, OnInit} from '@angular/core';
import * as sportFields from 'src/assets/data/sportFields.json';
import { LocationModel } from '../models/location.model';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './sport-fields.component.html',
  styleUrls: ['./sport-fields.component.scss']
})
export class SportFieldsComponent implements OnInit {
  constructor(private locationService: LocationService) {}
  // TODO add paginate to not display all sport fields at the same time
  sportField: any = [sportFields.default[0], sportFields.default[1]];
  fieldsLocation: Array<LocationModel> = [];

  ngOnInit(): void {
    this.sportField.map((field: any) => {
        const coordinates = field.geometry.coordinates[0][0];
        this.locationService
          .get(coordinates[0], coordinates[1])
          .subscribe(({features}) => {
            const fieldLocation = {
              city: features[0].properties.city,
              postcode: features[0].properties.postcode,
              label: features[0].properties.label,
              id: field.properties.identifiant,
            };
            this.fieldsLocation.push(fieldLocation);
          })
        ;
      }
    );
  }
}
