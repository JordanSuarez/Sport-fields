import {Component, OnInit} from '@angular/core';

import { FieldRecordsModel } from 'src/app/models/field.model';
import { LocationModel } from 'src/app/models/location.model';
import { LocationService } from 'src/app/location.service';
import { FieldService } from 'src/app/field.service';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {

  constructor(private locationService: LocationService, private fieldService: FieldService) {}

  fields: Array<FieldRecordsModel> = [];
  fieldsLocation: Array<LocationModel> = [];

  ngOnInit(): void {
     this.fieldService.getFieldList(10, 0, 'Lyon').subscribe(fields => {
       this.fields = fields.records;
       fields.records.map((field: FieldRecordsModel) => {
           this.locationService
             .get(field.fields.coordonnees[0], field.fields.coordonnees[1])
             .subscribe(({features}) => {
               const fieldLocation: LocationModel = {
                 ...features[0].properties,
                 id: field.recordid,
               };
               this.fieldsLocation.push(fieldLocation);
             })
           ;
         }
       );
     });

  }
}
