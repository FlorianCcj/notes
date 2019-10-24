#!/bin/bash

# rm -rf build
docker build -t tex-build -f docker/Dockerfile-tex-builder .
container_name="$(date +"%s")"
container_id=$(docker run --name="sphinx-build-${container_name}" --rm -it -d -e USER_ID=$UID tex-build bash)
docker cp ${container_id}:/workdir/build $(pwd)
docker stop $(docker ps -aq -f name=sphinx-build-${container_name})
# docker rmi tex-build
