import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LocationModel } from 'src/app/models/location.model';
import { LocationService } from 'src/app/location.service';
import { FieldService } from 'src/app/field.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  isOpen!: boolean;
  noResult!: boolean;
  manyResults!: boolean;
  addressList: Array<LocationModel> = [];
  submitting!: boolean;
  streetNameCtrl!: FormControl;
  streetNumberCtrl!: FormControl;
  postCodeCtrl!: FormControl;
  cityCtrl!: FormControl;
  addressForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private locationService: LocationService, private fieldService: FieldService) {}

  ngOnInit(): void {
    this.cityCtrl = this.formBuilder.control('', Validators.required);
    this.streetNameCtrl = this.formBuilder.control('', Validators.required);
    this.streetNameCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(3)]);
    this.streetNumberCtrl = this.formBuilder.control(
      '',
      [
        Validators.required,
        Validators.min(1),
      ]
    );
    this.postCodeCtrl = this.formBuilder.control(
      '',
      [
        Validators.required,
        Validators.pattern('[0-9]{5}'),
      ]
    );
    this.addressForm = this.formBuilder.group({
      streetNumber: this.streetNumberCtrl,
      streetName: this.streetNameCtrl,
      postCode: this.postCodeCtrl,
      city: this.cityCtrl,
    });
  }

  handleSubmit(): void {
    this.submitting = true;
    this.locationService
      .getCoordinates(this.addressForm.value)
      .subscribe({
        next: ({features}) => {
          if (features.length > 1) {
            this.manyResults = true;
            this.addressList = features;
          }
          if (features.length < 1) {
            this.noResult = true;
          }
          console.log(features);
        },
        error: () => this.noResult = true,
        complete: () => {
          this.submitting = false;
          this.isOpen = false;
        },
      });
  }
}
