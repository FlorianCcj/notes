JS - Method you need to know
############################

Array
*****

The bitwise NOT operator
========================

the tilde ~ will return true if indexOf returns 0 or higher.

.. code-block:: js

    // before
    const array = [0, 1, 2, 3, 4];
    if (array.indexOf(5) > -1) {
        return 'exists';
    } else {
        return 'does not exist';
    }

    // after
    const array = [0, 1, 2, 3, 4];
    if (~array.indexOf(5)) {
        return 'exists';
    } else {
        return 'does not exist';
    }

find
====

.. code-block:: js

    const numbers = [1, 2, 3, 4, 10];
    numbers.find( x => x === 4 ); // returns 4
    numbers.find( x => x > 5 ); // returns 10

    const itemPresent = numbers.find( x => x === 4 );
    return itemPresent ? true : false;

.. code-block:: js

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

.. code-block:: js

    const numbers = [1, 2, 3, 4, 10];
    numbers.findIndex( x => x === 4 ); // returns 3
    numbers.find( x => x === 15);     // returns -1

filter()
========

.. code-block:: js

    const numbers = [1, 2, 3, 4, 10];
    const evenNumbers = numbers.filter( x => x % 2 === 0 );
    console.log(evenNumbers); // returns [2, 4, 10]

.. code-block:: javascript

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
      }, {
        "name": "test4",
        "id": 4,
        "price": 500

      }

    ]

    */


includes()
==========

.. code-block:: js

    const cars = ['BMW', 'Toyota', 'Tesla', 'Audi'];
    console.log(cars.includes('Toyota'));  // true
    console.log(cars.includes('mercedes')); // false

Last Item: Getting the Last Item in the Array
=============================================

.. code-block:: js

    var array = [1,2,3,4,5,6];
    console.log(array.slice(-1)); // [6]
    console.log(array.slice(-2)); // [5,6]
    console.log(array.slice(-3)); // [4,5,6]

Length: Caching the array.length in the Loop
============================================

.. code-block:: js

    // don t do
    for(var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }

    // nor
    var length = array.length;
    for(var i = 0; i < length; i++) {
        console.log(array[i]);
    }

    // do
    for(var i = 0, length = array.length; i < length; i++) {
        console.log(array[i]);
    }

Merging Arrays
==============

.. code-block:: js

    var array1 = [1,2,3];
    var array2 = [4,5,6];
    console.log(array1.concat(array2)); // [1,2,3,4,5,6];

However, this function is not the most suitable to merge large arrays because it will consume a lot of memory by creating a new array.
In this case, you can use Array.push.apply(arr1, arr2), which instead creates a new array. It will merge the second array into the first one, reducing memory usage

.. code-block:: js

    var array1 = [1,2,3];
    var array2 = [4,5,6];
    console.log(array1.push.apply(array1, array2)); // [1,2,3,4,5,6];

NodeList: Converting NodeList to Arrays
=======================================

.. code-block:: js

    var elements = document.querySelectorAll("p"); // NodeList
    var arrayElements = [].slice.call(elements); // Now the NodeList is an array

    // This is another way of converting NodeList to Array
    var arrayElements = Array.from(elements);

Replace loop
============

To Loop Through All Elements and Get an new modified array
----------------------------------------------------------

.. code-block:: js

    // Don t do

    var names = ["Jack", "Jecci", "Ram", "Tom"];
    var upperCaseNames = [];
    for(let i=0, totalNames = names.length; i< totalNames ; i= i +1) {
        upperCaseNames[i] = names[i].toUpperCase();
    }

    // Do

    var names = ["Jack", "Jecci", "Ram", "Tom"];
    var upperCaseNames = names.map(name => name.toUpperCase());

Loop through all elements and perform an action
-----------------------------------------------

.. code-block:: js

    // don t do

    function print(name) {
        console.log(name);
    }

    var names = ["Jack", "Jecci", "Ram", "Tom"];
    for(let i=0, totalNames = names.length; i< totalNames ; i= i +1) {
        print(names[i])
    }

    // do

    var names = ["Jack", "Jecci", "Ram", "Tom"];
    names.forEach(name=> print(name));

Filtering Array
---------------

.. code-block:: js

    // don t do

    function isOdd(n) {
        return n %2;
    }
    var numbers = [1,2,3,4,5];var odd = [];for(let i=0, total = numbers.length; i< total ; i= i +1) {
        let number = numbers[i];
        if( isOdd(number) ) {
            odd.push(number);
        }
    }

    // do

    var numbers = [1,2,3,4,5, 6, 7]
    var odd = numbers.filter(n => n%2); // single line

Creating an Output With Array Elements
--------------------------------------

.. code-block:: js

    // don t do

    var numbers = [1,2,3,4,5]
    var result = 0;
    for(let i=0, total = numbers.length; i< total ; i= i +1) {
        result = result + numbers[i];
    }

    // do

    var numbers = [1,2,3,4,5,6,7];
    function sum(accumulator, currentValue){
        return accumulator + currentValue;
    }
    var initialVal = 0;
    var result = numbers.reduce(sum, initialVal);

    // or even

    var numbers = [1,2,3,4,5,6,7, 10];
    var result = numbers.reduce((acc, val)=> acc+val, 0);

Checking if an Array Contains a Value
-------------------------------------

.. code-block:: js

    // don t do

    var names = ["ram", "raj", "rahul"];
    for(let i=0, totalNames = names.length; i< totalNames ; i= i +1) {
        if(names[i] === "rahul") {
            console.log("%c found rahul", "color:red");
            return;
        }
    }

    // do

    var names = ["ram", "raj", "rahul"];
    let isRahulPresent = names.some(name => name==="rahul");
    if(isRahulPresent) {
        console.log("%c found rahul", "color:red");
    }

To Check Whether Every Element in an Array Meets a Condition
------------------------------------------------------------

.. code-block:: js

    // don t do

    var num = [1,2,3,4,5, 0];
    for(let i=0, total = numbers.length; i< total ; i= i +1) {
        if(num <= 0) {
            console.log("0 present in array");
        }
    }

    // do

    var num = [1,2,3,4,5, 0];
    var isZeroFree = num.every(e => e > 0);
    if(!isZeroFree) {
        console.log("0 present in array");
    }

Shuffling an Array’s Elements
=============================

.. code-block:: js

    var list = [1,2,3];
    console.log(list.sort(function() { Math.random() - 0.5 })); // [2,1,3]

Spread operator
===============

.. code-block:: js

    const cars = ['BMW', 'Toyota', 'Tesla', 'Audi'];
    let newCarsArray = [...cars];
    console.log(newCarsArray);

    // ['BMW', 'Toyota', 'Tesla', 'Audi']

    const array1 = [1,2,3];
    const array2 = [4,5];
    const array3 = [...arr1,...arr2];
    console.log(array3);
    // [ 1, 2, 3, 4, 5 ]

Truncating Array
================

.. code-block:: js

    var array = [1,2,3,4,5,6];
    console.log(array.length); // 6
    array.length = 3;
    console.log(array.length); // 3
    console.log(array); // [1,2,3]

Boolean
*******

Optionnal chaining and nulling coalescing
=========================================

.. code-block:: js

    let thing = obj?.node?.thing ?? 2
    const tenthItem = arr?.[10]
    const message = obj?.stringFunction()
    functionDoesNotExist?.()

Converting to Boolean Using the !! Operator
===========================================

A simple !!variable, which will automatically convert any kind of data to a boolean and this variable will return false only if it has some of these values: 0, null, "", undefined, or NaN, otherwise, it will return true.

Default Values Using the || Operator
====================================

.. code-block:: js

    function User(name, age) {
        this.name = name || "Oliver Queen";
        this.age = age || 27;
    }

    var user1 = new User();
    console.log(user1.name); // Oliver Queen
    console.log(user1.age); // 27

    var user2 = new User("Barry Allen", 25);
    console.log(user2.name); // Barry Allen
    console.log(user2.age); // 25

Short-Circuit Conditionals
==========================

.. code-block:: js

    // don t do
    if (connected) {
      login();
    }

    // do
    connected && login();

    // or
    user && user.login();

Number
******

Converting to Number Using the + Operator
=========================================

Object
******

Creating and copying objects
============================

.. code-block:: js

    const dest1 = { a: 1};
    const source = { b: 2, c: 3};
    Object.assign(dest1,source);
    console.log(dest); // {a: 1, b: 2, c: 3}

    const dest2 = { aa: 1};
    const source1 = { bb: 2, cc: 3};
    const source2 = { dd: 4, ee: 5};
    Object.assign(dest2, source1,source2);
    console.log(dest2);  // {aa: 1, bb: 2, cc: 3, dd: 4, ee: 5}

.. code-block:: js

    const original = { a: 1};
    const copyObject = Object.assign({},original);
    console.log(copyObject); // { a: 1};

.. code-block:: js

    const original = { a: 1};
    const copyObject = {...original}
    console.log(copyObject); // { a: 1};

.. code-block:: js

    let source =

    {
        a: 1,
        b: {

            c: 2,

        },

    };

    let destObj = JSON.parse(JSON.stringify(obj));

Destructuring
=============

2020.02.19

.. code-block:: JS

    // before
    const names = {
        user1: 'Ann',
        user2: 'Bob',
        user3: 'Julie',
        user4: 'Mike',
    }

    console.log(names.user1);
    console.log(names.user2);
    console.log(names.user3);
    console.log(names.user4);

    // now

    const { user1, user2, user3, 'user4': mike}

    console.log(user1)
    console.log(user2)
    console.log(user3)
    console.log(mike)

    const x = [1, 2, 3]
    const [y, z] = x
    const [a, b, ...rest] = x

Strings
*******

Replace All
===========

.. code-block:: js

    var string = "john john";
    console.log(string.replace(/hn/, "ana")); // "joana john"
    console.log(string.replace(/hn/g, "ana")); // "joana joana"

startsWith()
============

.. code-block:: js

    const str = 'Hello world, welcome to the javascript.';
    console.log(str.startsWith('Hello')); // true
    console.log(str.startsWith('Help'));  // false

endWith()
=========

.. code-block:: js

    const str = 'Hello world, welcome to the javascript.';
    console.log(str.endsWith('javascript.')); // true
    console.log(str.endsWith('hello'));       // false

includes()
==========

.. code-block:: js

    var str = "Hello world, welcome to the universe.";
    console.log(str.includes("world")); // true
    console.log(str.includes("test"));  // false

Sources
*******

* https://medium.com/better-programming/most-useful-javascript-methods-355139f96d7
* https://medium.com/better-programming/11-extremely-useful-javascript-tips-4484429a5655
* https://medium.com/better-programming/you-dont-need-loops-in-javascript-1dc8139eab4b
* https://dev.to/laurieontech/optional-chaining-has-arrived-111l
* https://levelup.gitconnected.com/ultimate-guide-to-tips-tricks-and-javascript-features-you-should-know-27e0a4a6ffdf

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2020.02.20 | V1.1.0  | destructuring                                                      |
+------------+---------+--------------------------------------------------------------------+
| 2020.02.20 | V1.0.2  | Optionnal chaining and nulling coalescing                          |
+------------+---------+--------------------------------------------------------------------+
| 2020.01.19 | V1.0.1  | add how to replace loop                                            |
+------------+---------+--------------------------------------------------------------------+
| 2020.01.19 | V1.0.1  | add tips from 11 Extremely Useful JavaScript Tips                  |
+------------+---------+--------------------------------------------------------------------+
| 2019.11.17 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
