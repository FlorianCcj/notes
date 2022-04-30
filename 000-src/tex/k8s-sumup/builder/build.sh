#!/bin/bash

# rm -rf build
docker build -t tex-build -f builder/Dockerfile-tex-builder .
container_name="$(date +"%s")"
container_id=$(docker run --name="k8s-sumup-${container_name}" --rm -it -d -e USER_ID=$UID tex-build bash)
docker cp ${container_id}:/workdir/build $(pwd)
docker rm -f $(docker ps -aq -f name=k8s-sumup-${container_name})
# docker rmi tex-build
