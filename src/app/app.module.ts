import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import localeFr from '@angular/common/locales/fr';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { MaterialModule } from 'src/app/modules/material-modules';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
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
import { NoResultComponent } from './no-result/no-result.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DialogComponent } from './dialog/dialog.component';

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
    FilterComponent,
    SelectComponent,
    BottomSheetComponent,
    NoResultComponent,
    DialogComponent,
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
    FormsModule,
    AgmSnazzyInfoWindowModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
