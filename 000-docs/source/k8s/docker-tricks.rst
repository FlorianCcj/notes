Docker - Tricks
###############

Clean up
*********

docker image rm -f $(docker images --format "{{.ID}}")
docker image rm -f $(docker images --filter=reference=toto --format "{{.ID}}")
docker system prune

Helm - Quality
***************

:source: https://cloudentity.com/developers/blog/helm_chart_testing_tools/#kube-score

helm template . | docker run -i -v $(pwd):/project zegl/kube-score:latest score --output-format ci -

Chart tester: https://github.com/helm/chart-testing/
kubetest: https://docs.testkube.io/articles/helm-chart/
KICS

Good Practice - Remove useless file
***********************************

* :code:`apt-get clean`
* :code:`rm -rf /var/lib/apt/lists/*`
* https://docs.docker.com/develop/dev-best-practices/?mkt_tok=eyJpIjoiTVdNeE1Ua3hPRFUyTW1JMyIsInQiOiJFR0VleitPSUpsK1RTQkxEeXRCckJIaitrR1RXb3hCenltY1NkY0Z2bnRpUGVkcUpMa21mSkJ0em5GYkcrZEJJU2ZkUDhsMTBZeTk4VUpFNHI0dFFCV29NcXdROE9uTWFOdHpWWEI5SHRVK3J2UXZBVjJxRXZOV0NXZjcrbkRPUyJ9

Good Practice - Check layers size
**********************************

docker history --human --format "{{.CreatedBy}}: {{.Size}}" nginx

Good Practice - Label
*********************

ARG creation_date
ARG image_revision

LABEL "org.opencontainers.image.created"="$creation_date"
LABEL "org.opencontainers.image.revision"="$image_revision"
LABEL "org.opencontainers.image.authors"="fccj"
LABEL "org.opencontainers.image.url"="https://github.com/FlorianCcj/bot-discord-igo-dictionary"
LABEL "org.opencontainers.image.documentation"="https://github.com/FlorianCcj/bot-discord-igo-dictionary"
LABEL "org.opencontainers.image.source"="https://github.com/FlorianCcj/bot-discord-igo-dictionary"
LABEL "org.opencontainers.image.version"="1.0.0"
LABEL "org.opencontainers.image.title"="Discord - Bot - Igo - dictionary"
LABEL "org.opencontainers.image.description"="igo_dictionnary is the first discord bot related with the anciant strategical chinese game popularized by japan : the so called game of go. Its main aim is to help beginners in their go journey by clarifying the fearsome go jargon. Through elegant and efficient commands, the user is able to acces to a large number of go related thermes with flawless definitions and explicit illustrations alongside. In this manner, concepts such as 'ishi no shita' or 'sabaki' will have no secrets for the neophyte. Ultimately our igo_dictionnary bot will act like a giant online vivid and interactiv encyclopedia, providing the go discord community a top-notch educational tool."

docker build --build-arg creation_date=$(date --iso-8601=ns) --build-arg image_revision=$(git log -n1 --format=format:"%h")
docker build --build-arg creation_date=$(date --iso-8601=m) --build-arg image_revision=$(git log -n1 --format=format:"%h")
docker build --build-arg creation_date=$(date --iso-8601=m) --build-arg image_revision=$(git rev-parse --short HEAD)
docker build --build-arg creation_date=$(date --iso-8601=minutes) --build-arg image_revision=$(git rev-parse --short HEAD)

--build-arg creation_date=$(date --iso-8601=minutes) --build-arg image_revision=$(git rev-parse --short HEAD)

TODO: note how to create docker env for symfony
http://carnetdudev.net/2019/07/14/mettre-en-place-un-environnement-de-developpement-docker-pour-symfony-4/
