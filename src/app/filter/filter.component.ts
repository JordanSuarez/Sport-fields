import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { LocationModel } from 'src/app/models/location.model';
import { FilterModel } from 'src/app/models/filter.model';
import { LocationService } from 'src/app/services/location/location.service';
import { FieldService } from 'src/app/services/field/field.service';
import { FieldDistanceModel } from 'src/app/models/field.model';
import { fieldsDistance } from 'src/assets/data/field';

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
  distanceCtrl = new FormControl('valid', Validators.required);
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

  // Form values Inputs
  fieldsDistance: Array<FieldDistanceModel> = fieldsDistance;
  formValues = this.formBuilder.group({
    streetNumber: this.streetNumberCtrl,
    streetName: this.streetNameCtrl,
    postCode: this.postCodeCtrl,
    city: this.cityCtrl,
    distance: this.distanceCtrl,
  });

  template = {
    title: 'Entrer une adresse',
    snackBar: {
      label: 'Oops! Aucun résultat trouvé',
    },
    input: {
      required: 'Le champ est requis',
    },
    streetNumber: {
      label: 'Numéro de la voie',
      placeholder: 'Ex. 10',
      error: 'Le numéro de la voie doit être supérieur à 0',
    },
    streetName: {
      label: 'Nom de la voie',
      placeholder: 'Ex. impasse partout',
    },
    postCode: {
      label: 'Code postal',
      placeholder: 'Ex. 75000',
      error: 'Le code postale doit être composé de 5 chiffres',
    },
    city: {
      label: 'Ville',
      placeholder: 'Ex. Paris',
    },
    distance: {
      label: 'Choisir un rayon de recherche',
      placeholder: 'Ex. Paris',
      error: 'Le code postale doit être composé de 5 chiffres',
    },
    button: {
      submit: 'Let\'s Go!',
      back: 'Retour',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private fieldService: FieldService,
    private bottomSheetRef: MatBottomSheetRef<FilterComponent>,
    private router: Router,
  ) {}

  handleSubmit(): void {
    this.submitting = true;
    const fieldAddress = `${this.formValues.value.streetNumber} ${this.formValues.value.streetName} ${this.formValues.value.postCode} ${this.formValues.value.city}`;
    this.locationService
      .getCoordinates(fieldAddress)
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
            this.handleRedirect(features[0], fieldAddress);
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
        next: ({features}) => this.handleRedirect(features[0], value),
        error: () => this.noResult = true,
        complete: () => {
          this.submitting = false;
        },
      });
  }

  handleRedirect(location: LocationModel, address: string): void {
    this.router.navigate(['/home']).then(() => {
      this.location = location;
      this.handleFieldLocationProvider({
        location: this.location,
        distance: this.formValues.value.distance,
        address
      });
      this.handleCloseBottomSheet();
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
