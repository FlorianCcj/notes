Angular - Environment
#####################

How To Read Environment Specific File in Angular
************************************************

Environments
============

.. code-block:: ts

    // project/src/environments/environment.ts
    export const environment = {
    production: false,
    environment: 'Local'
    }


    // project/src/environments/environment.dev.ts
    export const environment = {
        production: false,
        environment: 'Development'
    };

    // project/src/environments/environment.test.ts
    export const environment = {
        production: false,
        environment: 'Test'
    };


    // project/src/environments/environment.prod.ts
    export const environment = {
        production: true,
        environment: 'Production'
    };

Command
=======

.. code-block:: bash

    ng serve --configuration=local   // local environment
    ng serve --configuration=dev   // dev environment
    ng serve --configuration=test   // test environment
    ng serve --configuration=production   // production environment

    // development
    ng build --configuration=dev// test
    ng build --configuration=test// production
    ng build --configuration=production// local
    ng build

angular.json
============

.. code-block:: json

  {
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1,
    "newProjectRoot": "projects",
    "projects": {
      "angular-environment-info": {
        "root": "",
        "sourceRoot": "src",
        "projectType": "application",
        "prefix": "app",
        "schematics": {},
        "architect": {
          "build": {
            "builder": "@angular-devkit/build-angular:browser",
            "options": {},
            "configurations": {
              "production": {
                "fileReplacements": [
                  {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.prod.ts"
                  }
                ],
              },
              "dev": {
                "fileReplacements": [
                  {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.dev.ts"
                  }
                ]
              },
              "test": {
                "fileReplacements": [
                  {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.test.ts"
                  }
                ]
              }
            }
          },
          "serve": {
            "builder": "@angular-devkit/build-angular:dev-server",
            "options": {
              "browserTarget": "angular-environment-info:build"
            },
            "configurations": {
              "production": {
                "browserTarget": "angular-environment-info:build:production"
              },
              "dev": {
                "browserTarget": "angular-environment-info:build:dev"
              },
              "test": {
                "browserTarget": "angular-environment-info:build:test"
              }
            }
          }
        }
      }
    }
  }

In component/service/etc
========================

.. code-block:: ts

    import { environment } from '../../environments/environment';

Sources
*******

* https://medium.com/bb-tutorials-and-thoughts/how-to-read-environment-specific-variables-in-angular-9f2cee0b2b4

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.12.23 | V1.0    | How To Read Environment Specific File in Angular                   |
+------------+---------+--------------------------------------------------------------------+
