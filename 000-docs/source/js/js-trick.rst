JS - Trick
##########

Auto-reload
***********

.. code-block:: JS

    npm i -g http-server
    cd <static file dir>
    http-server -o
    # then go http://127.0.0.1:8080

Npm - bin
*********

Access to npm bin in npm script :code:`"cypress:open": "$(npm bin)/cypress open"`

Npx
***

:code:`npx browserslist` launch without installing, just for one launch