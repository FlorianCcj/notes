Angular - async await
#####################

Def
***

When an async function is called, it returns a Promise. When the async function returns a value, the Promise will be resolved with the returned value. When the async function throws an exception or some value, the Promise will be rejected with the thrown value.

An async function can contain an await expression, that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the async function's execution and returns the resolved value.

Exemple 1
*********

.. code-block:: js

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  getValueWithPromise() {
    this.resolveAfter2Seconds(20).then(value => {
      console.log(`promise result: ${value}`);
    });
    console.log('I will not wait until promise is resolved');
  }

.. code-block:: js

  async getValueWithAsync() {
    const value = <number>await this.resolveAfter2Seconds(20);
    console.log(`async result: ${value}`);
  }

* Line 1 — Function is prefixed with “async” keyword. It is mandatory if your function has “await” keyword.
* Line 2 — We are not calling “.then()” promise. Instead we are prefixing function call with “await” keyword. This keyword shall not allow next code block to execute. console.log() at line 3 will get printed only when promise is resolved on line 2 like a synchronous function call.
* Since we are using Typescript, we need to type cast promise return value to specific type, hence <number> on line 2.

Exemple 2
*********

.. code-block:: ts

  addWithPromise() {
    this.resolveAfter2Seconds(20).then(data1 => {
      let result1 = <number>data1;
      this.resolveAfter2Seconds(30).then(data2 => {
        let result2 = <number>data2;
        this.additionPromiseResult = result1 + result2;
        console.log(`promise result: ${this.additionPromiseResult}`);
      });
    });
  }

.. code-block:: ts

  async addWithAsync() {
    const result1 = <number>await this.resolveAfter2Seconds(20);
    const result2 = <number>await this.resolveAfter2Seconds(30);
    this.additionAsyncResult = result1 + result2;
    console.log(`async result: ${this.additionAsyncResult}`);
  }

HttpClient
**********

.. code-block:: ts

  getDataUsingSubscribe() {
    this.httpClient.get<Employee>(this.url).subscribe(data => {
      this.subscribeResult = data;
      console.log('Subscribe executed.')
    });
    console.log('I will not wait until subscribe is executed..');
  }

.. code-block:: ts

  getDataUsingPromise() {
    this.httpClient.get<Employee>(this.url).toPromise().then(data => {
      this.promiseResult = data;
      console.log('Promise resolved.')
    });
    console.log('I will not wait until promise is resolved..');
  }

.. code-block:: ts

  async getAsyncData() {
    this.asyncResult = await this.httpClient.get<Employee>(this.url).toPromise();
    console.log('No issues, I will wait until promise is resolved..');
  }

Conditionnal
************

.. code-block:: ts

  getConditionalDataUsingPromise() {
    this.httpClient.get<Employee>(this.url).toPromise().then(data => {
      console.log('First Promise resolved.')
      if (data.id > 5) {
        let anotherUrl = 'http://dummy.restapiexample.com/api/v1/employee/23';
        this.httpClient.get<Employee>(anotherUrl).toPromise().then(data => {
          this.conditionalPromiseResult = data;
          console.log('Second Promise resolved.')
        });
      }
    });
  }

.. code-block:: ts

  async getConditionalDataUsingAsync() {
    let data = await this.httpClient.get<Employee>(this.url).toPromise();
    if (data.id > 5) {
      let anotherUrl = 'http://dummy.restapiexample.com/api/v1/employee/23';
      this.conditionalAsyncResult = await this.httpClient.get<Employee>(anotherUrl).toPromise();
    }
    console.log('No issues, I will wait until promise is resolved..');
  }

Sources
*******

* https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2020.01.22 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
