Init
====

mkdir -p mounts/{conf,data,extensions,log}
chown -R 999:999 mounts

build init
==========

docker-compose -f docker-compose-builder.yml build

Launch
======

if you have plugin
------------------

docker-compose -f docker-compose-builder.yml up

else
----

docker save -o sonar-sonarqube.docker.tar sonar_sonarqube
docker load -i sonar-sonarqube.docker.tar
docker tag sonar_sonarqube docker.intranet/sonarqube:7.9-1
docker-compose up

plugin
======

a full image
------------

```
sudo docker cp sonar_sonarqube_1:/opt/sonarqube/extensions/. mounts/extensions
chown -R 999:999 mounts/extensions
# check if volume mounts is not comment in docker-compose
# dwl plugin and add it in mounts/extensions
```

Active plugin
-------------

* ihm (localhost:9000 default)
* connect (admin:admin default)
* quality profile
  * which on you want
  * extend
  * <your QP name>
  * copy
  * <your QP name>
  * set as default
  * (inherance)
  * (be sure that your parent is the good one)
  * active more rules
  * Filters
  * QP
  * inactive
  * bulk change

Scanner
=======

docker run --network=host -ti -v $(pwd):/usr/src sonar-scanner:3.3.3 sonar-scanner -Dsonar.projectKey=<key in sonar> -Dsonar.sources=. -Dsonar.host.url="http://127.0.0.1:9000"

Linter (pylint, hadolint, phpcs)
Sonar
Check dependencies security
scan security (trivy, anchor, docker bench security )
TU
Git hook
check git flow
husky (git hook for npm)
crook (git hook for php)
bruli/php-git-hooks (git hook for php)