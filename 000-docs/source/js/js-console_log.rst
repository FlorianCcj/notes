JS - console.log
################

Don t use console.log anymore
*****************************

:source: https://medium.com/productops/preventing-accessibility-regressions-in-angular-fd29bef6d55e

as in this angular project, create an object which will use console log but only in development not in prod

Example:

.. code-block:: typescript

    import { environment } from '../environments/environment';

    export class Logger {

      static log(msg: string | object): void {
        if (!environment.production) {
          console.log(msg);
        }
      }

      static error(msg: string): void {
        if (!environment.production) {
          console.error(msg);
        }
      }
    }

Don t underestimate console oject
*********************************

:source: https://medium.com/free-code-camp/how-to-use-the-javascript-console-going-beyond-console-log-5128af9d573b

* console.log
* console.table
* console.group
* console.warn
* console.error
* console.log + color
* console.trace: make a stack trace
* console.time: permit to time a code part

.. code-block:: js

    console.log('yeah, usual')
    console.log({ foo, bar })
    // ouf that s better
    console.table({ foo, bar })

    console.group('User Details');
    console.log('name: John Doe');
    console.log('job: Software Developer');// Nested Group
    console.group('Address');
    console.log('Street: 123 Townsend Street');
    console.log('City: San Francisco');
    console.log('State: CA');
    console.groupEnd();console.groupEnd();

    console.log('%c Auth ', 
            'color: white; background-color: #2274A5', 
            'Login page rendered');
    console.log('%c GraphQL ', 
                'color: white; background-color: #95B46A', 
                'Get user details');
    console.log('%c Error ', 
                'color: white; background-color: #D33F49', 
                'Error getting user details');

    console.time("For loop");
    while (i < 1000000) {
    i++;
    }
    console.timeEnd("For loop");

Sources
*******

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.09.22 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
