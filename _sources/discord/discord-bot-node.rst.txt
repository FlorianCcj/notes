Discord - Bot - NodeJS
######################

init
****

need: nodejs, yarn or npm, git

use discord.js

Go on discord
*************

create and add to serv
======================

* `<discordapp.com/developers/applications/>`_
* new application
* <application name>
* menu > bot > add bot
* Oauth2 > check bot > copy link
* open the copy link in a new tab
* choose server to add bot

role s bot
==========

* top corner > server settings > roles > +
* then in channel settings you can manage bot role
* create a logs channel to get bots logs

First code
==========

* Just copy the example in discord.js
* paste it in src/main.js
* need to put the token in :code:`client.login()`
* :code:`client.on` listen to event
* on the doc, on the subject :code:`client` you have all the event list
* go in discord-dev > bot > Token > Copy
* paste in client.log()
* terminal > node src/main.js


* some optimisation

.. code-block:: js

    const Discord = require('discord.js');
    const client = new Discord.Client();

    // become

    const { Client } = require('discord.js');
    const client = new Client();

config file
***********

.. code-block:: js
    :name: config.js
    :caption: config.js

    exports.TOKEN = 'NjA1MDAzMTI4NTU5MTA4MTA3.XozUjw.h2gMIMh-xvtJeMqju4XrNyWtb1U';
    exports.PREFIX = 'f?'

.. code-block:: js
    :name: src/main.js
    :caption: src/main.js

    const require { TOKEN, PREFIX } = require('../config.js');

get argument
************

.. code-block:: js

      const args = msg.constent.split(/ +/g);
      const cmd = args.shift.toLowerCase();

db management
*************

bot on heroku
*************

* create account
* instead of :code:`config.js` we will transfert everything in env var and get is with :code:`process.env.BOT_ID` or :code:`process.env.HASH` ...
* create a :code:`Procfile`

.. code-block:: yaml
    :name: Procfile
    :caption: Procfile

    worker: node src/main.js

* install `heroku cli <https://devcenter.heroku.com/categories/command-line>`_
* heroku login
* heroku create <name_app>
* heroku create dreadnought-branch --buildpack heroku/nodejs
* dans l ihm > settings > add viarable
* in build, follow the tuto
* Overview > more > show logs
* in ressource, prefere :code:`worker` than :code:`npm start`

note function
*************

* msg.reply('cite and replay');
* msg.channel.send('only send a message')
* msg.mentions.{member,channel}

on discord
* :code:`\@bad`: to get user :code:`bad` id
* :code:`\@maous`: to get group :code:`bad` id
* :code:`\#maous`: to get channel :code:`bad` id

sources
*******

* init: https://www.youtube.com/watch?v=yW3Kr1aY510&list=PLuWyq_EO5_ALqv4KE_k2Bq9Wlf8QDLGFR&index=2
* advanced: https://www.youtube.com/watch?v=XIoOfakbCx4&list=PLuWyq_EO5_AKux6AAAfMvhM6nAWTGJ380&index=2
* projet 1: https://www.youtube.com/watch?v=sB2on7-pLms&list=PLuWyq_EO5_AKpjOLTZU37wSYC7tDpLTMt
* hebergement: https://www.youtube.com/watch?v=aCKpHDvg8tA