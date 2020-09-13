Docker - Tricks
###############

Good Practice - Remove useless file
***********************************

* :code:`apt-get clean`
* :code:`rm -rf /var/lib/apt/lists/*`

Good Practice - Label
*********************

ARG creation_date
ARG image_revision

LABEL "org.opencontainers.image.created"="$creation_date"
LABEL "org.opencontainers.image.authors"="fccj"
LABEL "org.opencontainers.image.url"="https://github.com/FlorianCcj/bot-discord-igo-dictionary"
LABEL "org.opencontainers.image.documentation"="https://github.com/FlorianCcj/bot-discord-igo-dictionary"
LABEL "org.opencontainers.image.source"="https://github.com/FlorianCcj/bot-discord-igo-dictionary"
LABEL "org.opencontainers.image.version"="1.0.0"
LABEL "org.opencontainers.image.revision"="$image_revision"
LABEL "org.opencontainers.image.title"="Discord - Bot - Igo - dictionary"
LABEL "org.opencontainers.image.description"="igo_dictionnary is the first discord bot related with the anciant strategical chinese game popularized by japan : the so called game of go. Its main aim is to help beginners in their go journey by clarifying the fearsome go jargon. Through elegant and efficient commands, the user is able to acces to a large number of go related thermes with flawless definitions and explicit illustrations alongside. In this manner, concepts such as 'ishi no shita' or 'sabaki' will have no secrets for the neophyte. Ultimately our igo_dictionnary bot will act like a giant online vivid and interactiv encyclopedia, providing the go discord community a top-notch educational tool."

docker build --build-arg creation_date=$(date --iso-8601=ns) --build-arg image_revision=$(git log -n1 --format=format:"%h")
