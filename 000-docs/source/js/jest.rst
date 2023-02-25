Jest
####

* https://jestjs.io/docs/en/getting-started.html
* npm install --save-dev jest

.. code-block:: json

  {
    "scripts": {
      "test": "jest"
    }
  }

* use babel :code:`yarn add --dev babel-jest @babel/core @babel/preset-env`

.. code-block::  js

  // babel.config.js
  module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  };
