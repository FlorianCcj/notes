js-method-need-to-know.rst
##########################

Array
*****

find
====

..code-block:: js

    const numbers = [1, 2, 3, 4, 10];
    numbers.find( x => x === 4 ); // returns 4
    numbers.find( x => x > 5 ); // returns 10

    const itemPresent = numbers.find( x => x === 4 );
    return itemPresent ? true : false;

..code-block:: js

    const people = [ 
    { name: 'test1', id: 1 , email: 'test1@test.com'},
    { name: 'test2', id: 2 , email: 'test2@test.com' },
    { name: 'test3', id: 3 , email: 'test3@test.com'},
    { name: 'test4', id: 4 , email: 'test3@test.com'}
    ];

    const person2 = people.find( person => person.id === 2 ); 
    console.log(person2); // { name: "test2", id: 2, email: "test2@test.com"}

findIndex()
===========

..code-block:: js

    const numbers = [1, 2, 3, 4, 10];
    numbers.findIndex( x => x === 4 ); // returns 3
    numbers.find( x => x === 15);     // returns -1

filter()
========

..code-block:: js

    const numbers = [1, 2, 3, 4, 10];
    const evenNumbers = numbers.filter( x => x % 2 === 0 ); 
    console.log(evenNumbers); // returns [2, 4, 10]

..code-block:: js

    const items = [ 
    { name: 'item1', id: 1 , price: 200 },
    { name: 'test2', id: 2 , price: 300 },
    { name: 'test3', id: 3 , price: 400 },
    { name: 'test4', id: 4 , price: 500 }
    ];

    const filteredItems = items.filter( item => item.price > 300 ); 
    console.log(filteredItems); 

    /* Output
    [
    {
        "name": "test3",
        "id": 3,
        "price": 400
    },
    {
        "name": "test4",
        "id": 4,
        "price": 500
    }
    ] 
    */

includes()
==========

..code-block:: js

    const cars = ['BMW', 'Toyota', 'Tesla', 'Audi'];
    console.log(cars.includes('Toyota'));  // true
    console.log(cars.includes('mercedes')); // false

Spread operator
===============

..code-block:: js

    const cars = ['BMW', 'Toyota', 'Tesla', 'Audi'];
    let newCarsArray = [...cars]; 
    console.log(newCarsArray); 

    // ['BMW', 'Toyota', 'Tesla', 'Audi']

    const array1 = [1,2,3]; 
    const array2 = [4,5];
    const array3 = [...arr1,...arr2];
    console.log(array3); 
    // [ 1, 2, 3, 4, 5 ]

Strings
*******

startsWith()
============

..code-block:: js

    const str = 'Hello world, welcome to the javascript.';
    console.log(str.startsWith('Hello')); // true
    console.log(str.startsWith('Help'));  // false

endWith()
=========

..code-block:: js

    const str = 'Hello world, welcome to the javascript.';
    console.log(str.endsWith('javascript.')); // true
    console.log(str.endsWith('hello'));       // false

includes()
==========

..code-block:: js

    var str = "Hello world, welcome to the universe.";
    console.log(str.includes("world")); // true
    console.log(str.includes("test"));  // false

Object
******

Creating and copying objects
============================

..code-block:: js

    const dest1 = { a: 1};
    const source = { b: 2, c: 3};
    Object.assign(dest1,source);
    console.log(dest); // {a: 1, b: 2, c: 3}



    const dest2 = { aa: 1};
    const source1 = { bb: 2, cc: 3};
    const source2 = { dd: 4, ee: 5};
    Object.assign(dest2, source1,source2);
    console.log(dest2);  // {aa: 1, bb: 2, cc: 3, dd: 4, ee: 5}

..code-block:: js

    const original = { a: 1};
    const copyObject = Object.assign({},original);
    console.log(copyObject); // { a: 1};

..code-block:: js

    const original = { a: 1};
    const copyObject = {...original}
    console.log(copyObject); // { a: 1};

..code-block:: js

    let source = 
    { 
    a: 1,
    b: { 
        c: 2,
    },
    };
    let destObj = JSON.parse(JSON.stringify(obj));

..code-block:: js
..code-block:: js
..code-block:: js
..code-block:: js
..code-block:: js
..code-block:: js
..code-block:: js
..code-block:: js
..code-block:: js
..code-block:: js

Sources
*******

* https://medium.com/better-programming/most-useful-javascript-methods-355139f96d7

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.11.17 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
