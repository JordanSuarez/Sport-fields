import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { LocationModel } from 'src/app/models/location.model';
import { FilterModel } from 'src/app/models/filter.model';
import { LocationService } from 'src/app/services/location/location.service';
import { FieldService } from 'src/app/services/field/field.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  // Filter Inputs
  isOpen!: boolean;
  noResult!: boolean;
  manyResults!: boolean;
  submitting!: boolean;
  selectButtonActivated!: boolean;

  // Location Inputs
  location!: LocationModel;
  addressList: Array<LocationModel> = [];

  // Form control Inputs
  cityCtrl = new FormControl('', Validators.required);
  streetNameCtrl = new FormControl('', Validators.required);
  streetNumberCtrl = new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]
  );
  postCodeCtrl = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{5}'),
    ]
  );
  distanceCtrl = new FormControl('valid', Validators.required);

  // Form values Inputs
  formValues = this.formBuilder.group({
    streetNumber: this.streetNumberCtrl,
    streetName: this.streetNameCtrl,
    postCode: this.postCodeCtrl,
    city: this.cityCtrl,
    distance: this.distanceCtrl,
  });

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private fieldService: FieldService,
    private bottomSheetRef: MatBottomSheetRef<FilterComponent>
  ) {}

  handleSubmit(): void {
    this.submitting = true;
    const stringAddress = `${this.formValues.value.streetNumber} ${this.formValues.value.streetName} ${this.formValues.value.postCode} ${this.formValues.value.city}`;
    this.locationService
      .getCoordinates(stringAddress)
      .subscribe({
        next: ({features}) => {
          if (features.length > 1) {
            this.manyResults = true;
            this.addressList = features;
            this.selectButtonActivated = true;
          }
          if (features.length < 1) {
            this.noResult = true;
          }
          if (features.length === 1) {
            this.location = features[0];
            this.handleFieldLocationProvider({location: this.location, distance: this.formValues.value.distance, address: stringAddress});
            this.handleCloseBottomSheet();
          }
        },
        error: () => this.noResult = true,
        complete: () => {
          this.submitting = false;
          this.isOpen = false;
        },
      });
  }

  // Value from select component if user input as more than one response
  handleSubmitSelectedAddress({value}: FormGroup): void {
    this.submitting = true;
    this.locationService
      .getCoordinates(value)
      .subscribe({
        next: ({features}) => {
          this.location = features[0];
          this.handleFieldLocationProvider({location: this.location, distance: this.formValues.value.distance, address: value});
          this.handleCloseBottomSheet();
        },
        error: () => this.noResult = true,
        complete: () => {
          this.submitting = false;
        },
      });
  }

  // Close bottomSheet
  handleCloseBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }

  // Share data between component
  handleFieldLocationProvider(fieldLocation: FilterModel): void {
    this.fieldService.setFilteredField(fieldLocation);
  }
}
