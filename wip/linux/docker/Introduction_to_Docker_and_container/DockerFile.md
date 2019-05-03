DockerFile.md
==============

* `FROM`: indicate base image
* `RUN`: will be executed by Docker during the build
    * must be non-interactive (no input can be provid to docker during the build) => add `-y` to `apt-get`

* `docker build -t figlet .`
    * `-t` tag to apply
    * `.` location of the build context

## CMD and ENTRYPOINT

CMD <command>: launch <command> when we launch the container
ENTRYPOINT <command>: launch <command> when we launch the container with an argument (ex: `docker run -it figlet salut` will launch `sh -x "figlet -f script" salut`)
if you use them together -> it will launch entrypoint with `CMD` argument
CMD <argument>
ENTRYPOINT <cmd>

COPY <path>: to copy a file/directory in container
WORKDIR <path>: to tell where to work

## Multi stage build principe

* FROM: launch a new stage
* COPY --from=...: access to files of previous stages (ex: COPY --from=0 /file/from/first/stage /location/in/current/stage
* `docker build -t ...` last stage is tagged
* possible to alias ```
FROM goland AS builder
RUN ...
FROM alpine
COPY --from=builder /go/bin/mylittlebin /usr/local/bin
```

## publish
* config : ~/.docker/config
* registry
    * jpetazzo/clock => index.docker.io/jpetazzo/clock
    * ubuntu => library/ubuntu => index.docker.io/library/ubuntu
* `docker tag figlet jpetazzo/figlet && docker push pjetazzo/figlet`: like that anybody can `docker run jpetazzo/figlet`

You can link a Docker Hub repo with a GitHub or Bitbucket repository

## Tips for efficient Dockerfiles
### Reducing the number of layers
* each line in a Dockerfile creates a new layer
* Build your Dockerfile to take advantage of Docker's catcing system

RUN apt-get install thisthing andthat andthid && cd /var/www \
    && touch thisfile

### avoid re-installing dependencies at each build
```
# Bad dockerfile
FROM python
COPY . /src/
WORKDIR /src
#build system does not know if requirements.txt has been updated
RUN pip install -qr requirements.txt
EXPOSE 500
CMD ["python", "app.py"]
```

```
# Good dockerfile
FROM python
COPY ./requirements.txt /tmp/requirements.txt
RUN pip install -qr requirements.txt
COPY . /src/
WORKDIR /src
EXPOSE 500
CMD ["python", "app.py"]
```

### Embedding unit tests in the build process
```
FROM <baseimage>
RUN <install dependencies>
COPY <code>
RUN <build code>
RUN <install test dependencies>
COPY <test data sets and fixtures>
RUN <unit tests>
FROM <baseimage>
COPY <code>
RUN <build code>
CMD, EXPOSE, ...
```
