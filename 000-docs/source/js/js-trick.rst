JS - Trick
##########

Auto-reload
***********

.. code-block:: JS

    npm i -g http-server
    cd <static file dir>
    http-server -o
    # then go http://127.0.0.1:8080

Node - Argument
****************

```js
const argv = require("minimist")(process.argv.slice(2));
console.log(argv);
```

Npm - bin
*********

Access to npm bin in npm script :code:`"cypress:open": "$(npm bin)/cypress open"`

Npx
***

:code:`npx browserslist` launch without installing, just for one launch

Audit
******

As a mandatory CI task the `npm audit --production --registry=https://registry.npmjs.org/` command will report known vulnerabilities and their impact from the run dependencies. NPM registry is specified because Azure Artifacts NPM registry does not handle dependencies vulnerability report. Please refer to the Dependencies chapter to fix vulnerabilities.

JavaScript development ecosystem is famous for its high granular libraries as explained in this article: How one programmer broke the internet by deleting a tiny piece of code.
Indeed a React scaffolded Hello World application fetches about 2 000 dependencies.
To ensure stability, please add package-lock.json to the repository. If you need to upgrade a specific version of a dependency, because of a vulnerability for instance, do not remove the package-lock.json file to recreate it with $ `npm install`. Instead, proceeds to a chirurgical upgrade of the affected dependency.
Identify the packet and the affected version
Print the reverse dependency tree from this dependency using $ `npm dependency list <dependency>`
Find the declared required version within all the parent dependencies (preceding dependency in the transitive relationship) $ `npm show <parent-dependency>`. Are there conflicts? Do I need to upgrade parents?
Upgrade dependency consequently using $ `npm install <dependency@fixed-version>`

Package manager
****************

To use the same package manager you can add `"packageManager": "yarn@1.22.19"` on your `package.json`
then launch `corepack enable` to activate the auto package manager changement

With the propertie engine it permit to block if engine is not correct
https://www.marcusoft.net/2015/03/packagejson-and-engines-and-enginestrict.html

https://phoenixnap.com/kb/package-json
