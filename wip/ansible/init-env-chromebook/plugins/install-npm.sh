#!/bin/bash

sudo apt-get update
sudo apt-get install npm -y
npm config set registry="http://registry.npmjs.org/"
sudo npm i -g n
sudo n stable
sudo npm i -g @vue/cli npm yarn @angular/cli

ng set defaults.styleExt=scss --global
ng set --global packageManager=yarn
