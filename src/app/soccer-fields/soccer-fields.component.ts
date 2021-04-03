import { Component, OnInit } from '@angular/core';

import { FieldService } from 'src/app/services/field/field.service';
import { SOCCER_FIELDS, LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-soccer-fields',
  templateUrl: './soccer-fields.component.html',
  styleUrls: ['./soccer-fields.component.scss']
})
export class SoccerFieldsComponent implements OnInit {

  localStorageKey = SOCCER_FIELDS;
  type = 2802;

  constructor(private fieldService: FieldService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.clearItems(this.localStorageKey);
  }

  getFields = (...arg: any): any => {
    // @ts-ignore
    return this.fieldService.fetchFieldsByType(...arg, this.type);
  }

}
