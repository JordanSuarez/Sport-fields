import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as sportFields from '../../assets/data/sportFields.json';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './sport-fields.component.html',
  styleUrls: ['./sport-fields.component.scss']
})
export class SportFieldsComponent implements OnInit {
sportField: any = sportFields;
// tslint:disable-next-line:typedef
test(test: any): void {
  console.log(test);
}
  constructor(private breakpointObserver: BreakpointObserver) {}
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      console.log(this.sportField)
      return this.sportField.default;
    })
  );
  /** Based on the screen size, switch from standard to one column per row */
  ngOnInit(): void {

  }
}
