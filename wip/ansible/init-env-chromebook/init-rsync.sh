#!/bin/bash

cd
mkdir Document
cp -fr /media/removable/SD\ Card/Document/exclude-list.txt ~/Document/exclude-list.txt

rsync -az /media/removable/SD\ Card/Document /home/florianccj/
