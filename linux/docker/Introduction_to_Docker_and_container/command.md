command.md
==========


http://container.training


## Escape hell dependency

1. write installation instructions into an INSTALL.txt file
2. Using this file, write an install.sh script that works for you
3. Turn this file into a Dockerfile, test it on your machine
4. If the Dockerfile builds on your machine, it will build anywhere

## Fist step
* `docker version`
* `docker run busybox echo hello world` # tellecharge l image et lance la command
* `docker run -it ubuntu`
    * `-i`: connect to stdin
    * `-i`: acces to a pseudo-terminal
* `apt-get update && apt-get install figlet` # there is nothing in the container, we need to install everything we need
* `dpkg -l | wc -l`: `dpkg -l` to list installed package, `wc -l` counts them
* `^D` or `exit`: quit container
* `docker run -d jpetazzo/clock`: `-d` to daemon mode
* `docker run --name ticktock jpetazzo/clock`: add a specific name to a container
* `docker rename`: add a specific name to a container
* `docker ps`: print all active container
    * `-l`: last
    * `-q`: quiet or quick
* `docker logs <numero ou tag du container>`: affiche les logs du container
    * `--tail 3`: 3 last lines
    * `--tail f`: all new line
* `docker kill`: terminate a container (KILL signal)
* `docker stop`: terminate a container (TERM signal then after 10 seconds KILL signal)
    * `-a` or `--all`: target all container
* `docker inspect`: detail of a container
* `docker inspect <containerID> | jq .`: parse the doc
* `docker inspect --format '{{ json .Created }}'` <containerId>

## attach an detach

* `-it`: this option permit to attach to a container
* `^P^Q`: detach a container
* `docker run -ti --detach-keys ctrl-x,x jpetazzo/clock`: now to detach it is ^X x
* `docker attach <containerID>`: attach a container
* `docker attach $(docker ps -lq)`

* `docker start <containerID>`: if it was in stop state

## Create image

* image namespace
    * official images: ubuntu, busybox, ...
    * User: jpetazzo/clokc, ...
    * self-hosted images: registry.example.com:5000/my-private/image

* `docker search <smthg to search>`

* `docker run`: to launch base
* `<command>`: to modify the image and do what we want as result
* `docker diff <containerId>`: review change
* `docker commit <containerId>`: turn the container as a new image
* `docker tag <imageId> <tag>` or `docker commit <containerId> <tag>` : if you want to add a tag
* `docker run -it <tag>`

## download image
* explicite: `docker pull`
* implicite: `docker run`

## plus

* `docker history <containerID>` or `docker history <containerTag>`
