import { Component, OnInit } from '@angular/core';

import { FieldService } from 'src/app/field.service';
import { BASKETBALL_FIELDS, LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-basket-ball-fields',
  templateUrl: './basket-ball-fields.component.html',
  styleUrls: ['./basket-ball-fields.component.scss']
})
export class BasketBallFieldsComponent implements OnInit {

  localStorageKey = BASKETBALL_FIELDS;
  type = 2901;

  constructor(private fieldService: FieldService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.clearItems(this.localStorageKey);
  }

  getFields = (...arg: any): any => {
    // @ts-ignore
    return this.fieldService.getFieldsByType(...arg, this.type);
  }
}
