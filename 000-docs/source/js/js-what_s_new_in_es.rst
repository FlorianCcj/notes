JS - What s new in ES
#####################

ES2019
******

* :code:`Array.flat()`, :code:`Infinity` can be an argument
* :code:`Array.flatMap()`
* :code:`Function.toString()`
* :code:`JSON.stringlify` fix
* :code:`String.trimStart()` or :code:`String.trimLeft()`
* :code:`String.trimEnd()` or :code:`String.trimRight()`
* optionnal :code:`catch` argument
* :code:`Symbol.description`

ES2018
******

* spread operator

    * :code:`{...object1}`
    * :code:`[...array1]`
    * :code:`const fn = (a,b,..restOfTheArgs) => {...}`

        * ..code-block:: js

            const sum = (a,b,...otherNums) => {
            return a + b + otherNums.reduce((x,y)=>x+y, 0);
            }

* :code:`for await ... of`
* :code:`SharedArrayBuffer`
* :code:`finally` function for :code:`Promise`

ES2017
******

* :code:`async, await`
* :code:`padStart, padEnd`

ES2016 - ES2017
***************

* :code:`Object.values`
* :code:`Object.entries`

ES2016
******

* :code:`includes`

Sources
*******

* https://medium.com/better-programming/great-new-features-in-es2018-10fd5cc3d91c
* https://medium.com/better-programming/new-features-in-es2019-72f4aa1f03f7

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.12.20 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
