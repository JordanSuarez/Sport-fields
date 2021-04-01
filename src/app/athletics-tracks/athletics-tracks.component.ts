import { Component, OnInit } from '@angular/core';

import { FieldService } from 'src/app/field.service';
import { ATHLETICS, LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-athletics-tracks',
  templateUrl: './athletics-tracks.component.html',
  styleUrls: ['./athletics-tracks.component.scss']
})
export class AthleticsTracksComponent implements OnInit {

  localStorageKey = ATHLETICS;
  type = 1004;

  constructor(private fieldService: FieldService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.clearItems(this.localStorageKey);
  }

  getFields = (...arg: any): any => {
    // @ts-ignore
    return this.fieldService.getFieldsByType(...arg, this.type);
  }
}
