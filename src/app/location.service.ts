import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor( private http: HttpClient) {}

  // TODO interface observable
  get(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`${environment.reverseGeoUrl}lon=${longitude}&lat=${latitude}`);
  }
}
