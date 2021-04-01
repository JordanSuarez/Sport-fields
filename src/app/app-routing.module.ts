import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FieldComponent} from './field/field.component';
import {HomeComponent} from './home/home.component';

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
    component: HomeComponent
  },
  {
    path: 'soccer-fields',
    component: HomeComponent
  },
  {
    path: 'athletics-tracks',
    component: HomeComponent
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
