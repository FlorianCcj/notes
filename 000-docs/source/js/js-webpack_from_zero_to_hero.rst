JS - Webpack from Zero to Hero
##############################

Webpack si a module bundler (some other like Parcel or Rollup)
Transform everything in UMD (Universal Module Definition)

It is not a task manager like Gulp or Grunt but you can use npm script to manage what wepack can t

Chapter 1: Getting Started with the Basics
******************************************

init
====

.. code-block:: bash
    :caption: init
    :name: init

    yarn init -y
    yarn add webpack webpack-cli --dev

.. code-block:: js
    :caption: index.js
    :name: index.js

    // src/index.js
    const hello = subject => console.log(`Hello ${subject}!`);
    hello("OLX Dev!");

.. code-block:: bash
    :caption: first test
    :name: first test

    yarn webpack
    yarn webpack --mode development
    yarn webpack --mode production

.. code-block:: js
    :caption: src/hello.js
    :name: src/hello.js

    // scr/hello.js
    export const hello = subject => console.log(`Hello ${subject}!`);

.. code-block:: js
    :caption: src/index.js
    :name: src/index.js

    // src/index.js
    import { hello } from "./hello";
    hello("OLX Dev!");

.. code-block:: json
    :caption: package.json
    :name: package.json

    // package.json
    "scripts": {
      "build": "webpack --mode production",
      "build:dev": "webpack --mode development"
    }

.. code-block:: bash
    :caption: test with npm script
    :name: test with npm script

    yarn build
    yarn build:dev

Chapter 2: Tidying Up Webpack
*****************************

Work with babel
===============

:code:`yarn add @babel/core @babel/preset-env babel-loader --dev`

* Babel Core: it has all logic necessary for transformations and also some polyfills;
* Babel Preset Env: it is able to choose the right transformations/polyfills depending on the target browser list;
* Babel Loader: it will be responsible for receiving the input file from Webpack and passing it through BabelJS.

.. code-block:: json
    :caption: .babelrc
    :name: .babelrc

    {
        "presets": ["@babel/preset-env"]
    }

.. code-block:: json
    :caption: package.json
    :name: package.json

    "browserslist": [
        "last 2 versions",
        "not dead"
    ]

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    module.exports = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: "babel-loader"
                }
            ]
        }
    };

Development Environment
=======================

* webpack-dev-server: hot module reloading
* html-webpack-plugin: auto insert bundle in an html file

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    const HtmlWebpackPlugin = require("html-webpack-plugin"); // first import ...

    module.exports = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: "babel-loader"
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin() // ... then register it
        ]
    };

Tip of the day: If you don’t want to output an index.html on the production builds, we can skip it by checking the webpack argv.mode:

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    // To prevent argv being undefined, let's use a default value
    module.exports = (env={}, argv={}) => ({
        // ...
        plugins: [
            // Any option given to Webpack client can be captured on the "argv"
            argv.mode === "development" ? new HtmlWebpackPlugin() : null
        ].filter(
            // To remove any possibility of "null" values inside the plugins array, we filter it
            plugin => !!plugin
        )
    });

* webpack accept object or function as conf
* env arg: :code:`--env.test or --env.customValue="Hello there!"`
* argv arg: ... the rest :code:`--mode=production`

.. code-block:: json
    :caption: package.json
    :name: package.json

    "scripts": {
        "build": "webpack --mode=production",
        "start:dev": "webpack-dev-server --mode=development"
    },

will be see at :code:`localhost:8080`
when you see the source you ll see the transpilled code
to have the source code

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    devtool: "source-map",

Chapter 3: Everything is a Module
*********************************

Import file - File loader
=========================

.. code-block:: bash

    yarn add file-loader --dev
    # file loader permit to inject a file in the html, example as in src in an image

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    module: {
        rules: [
            //...
            {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: 'file-loader'
            }
        ]
    },

.. code-block:: bash

    yarn add image-webpack-loader --dev
    # permit to optimize image

It has some image compressors already enabled by default:

* mozjpeg — Compress JPEG images
* optipng — Compress PNG images
* pngquant — Compress PNG images
* svgo — Compress SVG images
* gifsicle — Compress GIF images

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
            'file-loader',
            {
            loader: 'image-webpack-loader',
            options: {
                disable: true // Disables on development mode
            }
            }
        ]
    }

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    {
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: 'file-loader'
    }
    // permit to :code:`import andHisNameIs from "./assets/and-his-name-is.mp3";`

Adding Some Style with Sass
===========================

.. code-block:: bash

    yarn add node-sass sass-loader css-loader style-loader --dev

* sass-loader + node-sass: receive your Sass files and output CSS
* css-loader: turns it into a JS module
* style-loader: gets the CSS module and inserts it into the page inside a <style></style> tag

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    module: {
        rules: [
            //...
            {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"] // It's like a pipeline
            }
        ];
    }

Production Styles
-----------------

.. code-block:: bash

    yarn add mini-css-extract-plugin --dev

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    const MiniCssExtractPlugin = require(“mini-css-extract-plugin”);

    {
        test: /\.scss$/,
        use: [
            argv.mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
            { loader: "css-loader", options: { sourceMap: true }},
            { loader: "sass-loader", options: { sourceMap: true }}
        ]
    }
    [ ... ]
    plugins: [
        // Any option given to Webpack client can be captured on the "argv"
        argv.mode === "development" ? new HtmlWebpackPlugin() : null,
        argv.mode === "production"
            ? new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }) : null
    ].filter(
        // To remove any possibility of "null" values inside the plugins array, we filter it
        plugin => !!plugin
    );

Keep clean
==========

.. code-block:: js
    :caption: ./webpack/module.rules
    :name: ./webpack/module.rules

    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    module.exports = (env, argv) => [
        {
            test: /\.js$/,
            use: "babel-loader"
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
            "file-loader",
            {
                loader: "image-webpack-loader",
                options: {
                disable: true // webpack@2.x and newer
                }
            }
            ]
        },
        {
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            use: "file-loader"
        },
        {
            test: /\.scss$/,
            use: [
            argv.mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader"
            ]
        }
    ];

.. code-block:: js
    :caption: webpack.config.js
    :name: webpack.config.js

    module: {
      rules: require("./webpack/module.rules")(env, argv)
    },

Chapter 4: Dynamic Imports and Code Splitting
*********************************************

Sources
*******

* Chap0: https://tech.olx.com/webpack-from-zero-to-hero-5540b6d620ec
* Chap1: https://tech.olx.com/webpack-from-zero-to-hero-60673ea906aa
* Chap2: https://tech.olx.com/webpack-from-zero-to-hero-1e02cb42ab7b
* Chap3: https://tech.olx.com/webpack-from-zero-to-hero-cf1b77b852c9
* Chap4: https://tech.olx.com/webpack-from-zero-to-hero-f64924e4d06
* Chap5: https://tech.olx.com/webpack-from-zero-to-hero-10a7dc26c74

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.12.31 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
