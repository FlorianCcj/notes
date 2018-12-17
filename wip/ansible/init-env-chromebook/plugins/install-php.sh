#!/bin/sh

## Install de base

sudo apt-get update

sudo apt-get install -y apache2 php php-fpm php-mysql php-curl php-mysql php-xml
# sudo apt-get install -y mysql-server mysql-client

## patch mysql

sudo mkdir -p /var/run/mysqld && sudo touch /var/run/mysqld/mysqld.sock && sudo chown -R mysql. /var/run/mysqld
sudo service mysql stop
sudo service mysql start
sudo /etc/init.d/mysql start
# sudo mysql_secure_installation

## ajout php 7.1+

sudo apt-get install -y software-properties-common python-software-properties

sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php
sudo apt-get update

version="7.2"
package="php${version}"
sudo apt-get install -y ${package} ${package}-fpm ${package}-mysql ${package}-curl ${package}-xml ${package}-mbstring ${package}-zip
