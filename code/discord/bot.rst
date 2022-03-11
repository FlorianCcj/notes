https://dylanbonjean.wordpress.com/2018/01/05/bot-discord/
https://discordpy.readthedocs.io/en/latest/

1. aller sur la console dev discord https://discordapp.com/developers/applications/me
2. new app
3. indiquer un nom (attention le bot aura le meme nom qur l app)
4. bot -> create bot user
5. recuperer le token //!\\

bot-token: NjA1MDAzMTI4NTU5MTA4MTA3.XT2Wrg.FgqrrTmAV7fc0uUVAlVmRtL40-U
app-clientid: 605003128559108107

6.  Invitez le bot sur votre serveur à l’aide de l’URL suivante
    (Remplacez votre_client_id avec le Client ID de votre bot)
    (Vous devez avoir les droits sur le serveur sur lequel vous voulez deployez votre bot)

https://discordapp.com/oauth2/authorize?client_id=votre_client_id&scope=bot&permissions=0

view: il apparatra alors  hors ligne dans le serveur

7. Installer python (le tuto presente en mode from scratch)
    * sudo apt-get install libssl-dev libffi-dev libsqlite3-dev zlib1g-dev gcc g++ make
    * wget https://www.python.org/ftp/python/3.6.4/Python-3.6.4.tgz
    * tar xzvf Python-3.6.4.tgz
    * cd Python-3.6.4/
    * ./configure # verifie les dependances
    * sudo make # commencer la compil
    * sudo make install # install
8. Faire le bot
    1. sudo python3 -m pip install -U discord.py[voice]
    2. mkdir bot_ccj && cd bot_ccj
    3. mettre ./bot.py dans le dossier
    4. editer la ligne TOKEN = 'your_token_here'
    5. enregistrer et lancer python3 bot.py