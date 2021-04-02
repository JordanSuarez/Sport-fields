import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AddressModel } from 'src/app/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor( private http: HttpClient) {}

  getFieldLocation(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`${environment.reverseGeoUrl}lon=${longitude}&lat=${latitude}`);
  }

  getCoordinates(address: AddressModel): Observable<any> {
    const stringAddress = `${address.streetNumber} ${address.streetName} ${address.postCode} ${address.city}`;
    return this.http.get(`${environment.searchGeoUrl}q=${stringAddress}`);
  }
}
