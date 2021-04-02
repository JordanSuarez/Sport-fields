import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import localeFr from '@angular/common/locales/fr';
import { AgmCoreModule } from '@agm/core';

import { MaterialModule } from 'src/app/modules/material-modules';

import { BasketBallFieldsComponent } from './basket-ball-fields/basket-ball-fields.component';
import { AthleticsTracksComponent } from './athletics-tracks/athletics-tracks.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { SoccerFieldsComponent } from './soccer-fields/soccer-fields.component';
import { PaginationComponent } from './pagination/pagination.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SelectComponent } from './select/select.component';
import { FieldsComponent } from './fields/fields.component';
import { FilterComponent } from './filter/filter.component';
import { environment } from 'src/environments/environment';
import { FieldComponent } from './field/field.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { AppComponent } from './app.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    FieldsComponent,
    HomeComponent,
    GoogleMapComponent,
    FieldComponent,
    SpinnerComponent,
    CardComponent,
    PaginationComponent,
    BasketBallFieldsComponent,
    SoccerFieldsComponent,
    AthleticsTracksComponent,
    FilterComponent,
    SelectComponent,
    BottomSheetComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
