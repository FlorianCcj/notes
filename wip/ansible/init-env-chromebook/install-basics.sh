#!/bin/sh

## install de base

sudo apt-get update
sudo apt-get install -y terminator zsh git firefox vlc curl zip 

## install oh(my-zsh)

cd
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

## install z.sh

curl https://raw.githubusercontent.com/rupa/z/master/z.sh > ~/z.sh
echo ". ~/z.sh" >> ~/.bashrc
echo ". ~/z.sh" >> ~/.zshrc

## update git

sudo apt-get install -y software-properties-common python-software-properties

sudo add-apt-repository ppa:git-core/ppa
sudo apt-get update
sudo apt-get install -y git

## get personnal gitconfig

curl https://raw.githubusercontent.com/FlorianCcj/notes/master/gitconfig > ~/.gitconfig
git config --global user.email "florianccj@gmail.com"
git config --global user.name "florianccj"
git config --local core.filemode false # ne prend plus en compte la permission
