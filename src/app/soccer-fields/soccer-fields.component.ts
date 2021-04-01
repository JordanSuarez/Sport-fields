import { Component, OnInit } from '@angular/core';

import { FieldService } from 'src/app/field.service';
import { SOCCER, LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-soccer-fields',
  templateUrl: './soccer-fields.component.html',
  styleUrls: ['./soccer-fields.component.scss']
})
export class SoccerFieldsComponent implements OnInit {

  localStorageKey = SOCCER;
  type = 2802;

  constructor(private fieldService: FieldService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.clearItems(this.localStorageKey);
  }

  getFields = (...arg: any): any => {
    // @ts-ignore
    return this.fieldService.getFieldsByType(...arg, this.type);
  }

}
