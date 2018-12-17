# Script to install

Différent script que j'ai fait pour installer mon chromebook

 * install-basics.sh : le minimum vital
 * modules/install-composer.sh : to install composer (need php)
 * modules/install-lamp.sh : install php, mysql apache2
 * modules/install-npm.sh : install node, npm, @angular/cli
 * modules/install-python.sh: install python and virtenv

 * rsync.sh : permet de synchroniser de la carte vers la home

A faire a la manot:
 * crontab : a mettre dans le crontab
 * https://addons.mozilla.org/fr/firefox/tag/postman
 * https://www.pcastuces.com/pratique/astuces/4267.htm


install php 7.2
sudo apt-get install python-software-properties
sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php7.0 php7.0-fpm php7.0-mysql -y