UiUx - LESS
###########

Use with Node.js

:code:`npm install -g less`
:code:`> lessc styles.less styles.css`

Or the browser

:code:`<link rel="stylesheet/less" type="text/css" href="styles.less" />`
:code:`<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>`

Using Less.js
*************

Command Line Usage
==================

:code:`npm install less -g`
:code:`npm i less --save-dev`
:code:`lessc [option option=parameter ...] <source> [destination]`
:code:`lessc bootstrap.less bootstrap.css`
:code:`lessc -s lessc --silent`
:code:`lessc -v`
:code:`lessc -h`

Browser Usage
=============

:code:`<link rel="stylesheet/less" type="text/css" href="styles.less" />`
:code:`<script src="less.js" type="text/javascript"></script>`

Settings
--------

.. code-block:: html

    <script>
        less = {
            env: "development",
            async: false,
            fileAsync: false,
            poll: 1000,
            functions: {},
            dumpLineNumbers: "comments",
            relativeUrls: false,
            rootpath: ":/a.com/"
        };
    </script>
    <script src="less.js"></script>

Watch mode
----------

.. code-block:: html

    <script>less = { env: 'development'};</script>
    <script src="less.js"></script>
    <script>less.watch();</script>

Functions
*********

Logical function
================

If
--

.. code-block:: less

    @some: foo;

    div {
        margin: if((2 > 1), 0, 3px);
        color:  if((iscolor(@some)), darken(@some, 10%), black);
    }

boolean
-------

to store a result

.. code-block:: less

    @bg: black;
    @bg-light: boolean(luma(@bg) > 50%);

    div {
        background: @bg;
        color: if(@bg-light, black, white);
    }

String function
===============

escape
------

like url encode
:code:`escape('a=1')` => :code:`a%3D1`

e
-

Returns: string - the escaped string, without quotes.

List function
=============

length, extract, range, each

Math function
=============

In-Depths
*********

Variable
========

.. code-block:: less

    // Variables
    @link-color:        #428bca; // sea blue
    @link-color-hover:  darken(@link-color, 10%);

    // Usage
    a,
      .link {
      color: @link-color;
    }
    a:hover {
      color: @link-color-hover;
    }
    .widget {
      color: #fff;
      background: @link-color;
    }

    // ----- selector ----

    // Variables
    @my-selector: banner;

    // Usage
    .@{my-selector} {
      font-weight: bold;
      line-height: 40px;
      margin: 0 auto;
    }

    // ----- url -----

    // Variables
    @images: "../img";

    // Usage
    body {
      color: #444;
      background: url("@{images}/white-sand.png");
    }

    // ----- import -----

    // Variables
    @themes: "../../src/themes";

    // Usage
    @import "@{themes}/tidal-wave.less";

    // ----- property as Variable ----

    .widget {
      color: #efefef;
      background-color: $color;
    }

Parent selector
===============

.. code-block:: less

    a {
      color: blue;
      &:hover { // result in a:hover
        color: green;
      }
    }

    .button {
      &-ok {
        background-image: url("ok.png");
      }
      &-cancel {
        background-image: url("cancel.png");
      }

      &-custom {
        background-image: url("custom.png");
      }
    }

.. code-block:: less

    .grand {
      .parent {
        & > & {
          color: red;
        }

        & & {
          color: green;
        }

        && {
          color: blue;
        }

        &, &ish {
          color: cyan;
        }
      }
    }

result in

.. code-block:: css

    .grand .parent > .grand .parent {
      color: red;
    }
    .grand .parent .grand .parent {
      color: green;
    }
    .grand .parent.grand .parent {
      color: blue;
    }
    .grand .parent,
    .grand .parentish {
      color: cyan;
    }

Tools
*****

Sources
*******

* http://lesscss.org/#

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2020.01.08 | V1.0    | write doc                                                          |
+------------+---------+--------------------------------------------------------------------+
