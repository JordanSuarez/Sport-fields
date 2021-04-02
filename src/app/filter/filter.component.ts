import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { LocationModel } from 'src/app/models/location.model';
import { LocationService } from 'src/app/location.service';
import { FieldService } from 'src/app/field.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  isOpen!: boolean;
  noResult!: boolean;
  manyResults!: boolean;
  addressList: Array<LocationModel> = [];
  submitting!: boolean;
  selectButtonActivated!: boolean;

  // Form control
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

  // Form values
  formValues = this.formBuilder.group({
    streetNumber: this.streetNumberCtrl,
    streetName: this.streetNameCtrl,
    postCode: this.postCodeCtrl,
    city: this.cityCtrl,
  });

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private fieldService: FieldService,
    private bottomSheetRef: MatBottomSheetRef<FilterComponent>
  ) {}

  handleSubmit(): void {
    console.log(this.formValues);
    this.submitting = true;
    this.locationService
      .getCoordinates(this.formValues.value)
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
            // Todo call api with coordinates
          }
        },
        error: () => this.noResult = true,
        complete: () => {
          this.submitting = false;
          this.isOpen = false;
        },
      });
  }

  // Close bottomSheet
  handleCloseBottomSheet(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  test({value}: any): void {
    console.log(value);
    // Todo call api with coordinates
  }
}
