// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
production: false,
user: {
    email: 'admin@123.com',
    password: 'admin'
},
firebase: {
    apiKey: "AIzaSyClD2RdTlauOnMDZB6V2PapeC8Lxh0xJuo",
    authDomain: "time-logger-3addd.firebaseapp.com",
    databaseURL: "https://time-logger-3addd.firebaseio.com",
    projectId: "time-logger-3addd",
    storageBucket: "time-logger-3addd.appspot.com",
    messagingSenderId: "1084301389908",
    appId: "1:1084301389908:web:6704d2f1ebce2431213dc1"
  }
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
