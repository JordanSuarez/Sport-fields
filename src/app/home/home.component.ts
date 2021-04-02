import { Component, OnInit } from '@angular/core';

import { FieldService } from 'src/app/field.service';
import { HOME_FIELDS, LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  localStorageKey = HOME_FIELDS;

  constructor(private fieldService: FieldService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.clearItems(this.localStorageKey);
  }

  getFields = (...arg: any): any => {
    // @ts-ignore
    return this.fieldService.getFields(...arg);
  }
}
