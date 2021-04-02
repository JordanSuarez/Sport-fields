import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

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

  // Close Dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
}
