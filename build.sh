#!/bin/sh

# build the docker container
docker build -t synoptic .

# run the container
docker run --rm -d -p 3000:3000 --env-file ./src/.env -it synoptic
