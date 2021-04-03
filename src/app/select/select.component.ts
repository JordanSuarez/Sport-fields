import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { LocationModel } from 'src/app/models/location.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() addressList!: Array<LocationModel>;
  @Output() handleSubmitSelectedAddress = new EventEmitter<any>();

  selectCtrl = new FormControl('valid', Validators.required);

  constructor() { }

  handleSubmit(): void {
    this.handleSubmitSelectedAddress.emit(this.selectCtrl);
  }
}
