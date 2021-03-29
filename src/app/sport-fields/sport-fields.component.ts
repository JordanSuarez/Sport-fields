import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as sportFields from '../../assets/data/sportFields.json';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './sport-fields.component.html',
  styleUrls: ['./sport-fields.component.scss']
})
export class SportFieldsComponent implements OnInit {
sportField: any = sportFields;

  constructor(private breakpointObserver: BreakpointObserver) {}
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      console.log(this.sportField);
      console.log(environment.googleMapsKey);
      return this.sportField.default;
    })
  );
  /** Based on the screen size, switch from standard to one column per row */
  ngOnInit(): void {

  }
}
