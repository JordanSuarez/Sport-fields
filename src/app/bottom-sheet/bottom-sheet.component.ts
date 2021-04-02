import {Component, EventEmitter, Output} from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { FilterComponent } from 'src/app/filter/filter.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {

  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(FilterComponent);
  }
}

