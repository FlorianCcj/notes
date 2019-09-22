// named import
import { people, droids } from './js-import-export';
// import default
import data from './js-import-export';

console.log("people: ", people);
// ["Luke", "Leia", "Han"]

console.log("droids: ", droids);
// { "C-3PO": "protocol droid", "R2-D2": "astromech droid" }

console.log("data keys: ", Object.keys(data));
// ["people", "droids"]