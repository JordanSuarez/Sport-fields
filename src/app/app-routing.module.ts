import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FieldComponent } from './field/field.component';
import { HomeComponent } from './home/home.component';
import { BasketBallFieldsComponent } from './basket-ball-fields/basket-ball-fields.component';
import { SoccerFieldsComponent } from './soccer-fields/soccer-fields.component';
import {AthleticsTracksComponent} from "./athletics-tracks/athletics-tracks.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'fields',
    children: [
      { path: ':fieldId', component: FieldComponent },
    ]
  },
  {
    path: 'basketball-fields',
    component: BasketBallFieldsComponent
  },
  {
    path: 'soccer-fields',
    component: SoccerFieldsComponent
  },
  {
    path: 'athletics-tracks',
    component: AthleticsTracksComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
