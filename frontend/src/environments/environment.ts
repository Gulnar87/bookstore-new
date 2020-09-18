// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'https://book-shop-app.firebaseio.com/books.json' , 
  books: 'http://localhost:8080/webresources/book-list/',
  apiUrlShop: 'https://book-shop-app.firebaseio.com/shoppingList.json',
    firebase: {
    apiKey: "AIzaSyCFILt9K45eKL8_gA37lo1C0L3c7oTI8c8",
    authDomain: "book-shop-app.firebaseapp.com",
    databaseURL: "https://book-shop-app.firebaseio.com",
    projectId: "book-shop-app",
    storageBucket: "book-shop-app.appspot.com",
    messagingSenderId: "503557666005"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
