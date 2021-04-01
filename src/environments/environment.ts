// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleMapsKey: process.env.GOOGLE_MAPS_KEY,
  reverseGeoUrl: 'https://api-adresse.data.gouv.fr/reverse/?',
  openDataSoft: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=res_equipements_2017'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
