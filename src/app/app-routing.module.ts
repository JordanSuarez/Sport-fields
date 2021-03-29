import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SportFieldsComponent} from './sport-fields/sport-fields.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
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
