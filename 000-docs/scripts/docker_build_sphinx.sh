#!/bin/bash

docker build -t sphinx-build -f docker/Dockerfile-sphinx-builder .
container_name="$(date +"%s")"
container_id=$(docker run --name="sphinx-build-${container_name}" --rm -it -d -e USER_ID=$UID sphinx-build bash)
rm -rf build
docker cp ${container_id}:/doc/build $(pwd)
docker stop $(docker ps -aq -f name=sphinx-build-${container_name})
docker rmi sphinx-build
