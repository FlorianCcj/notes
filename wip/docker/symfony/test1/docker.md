# Docker

sudo service --status-all |grep docker

## add group

sudo groupadd docker
sudo usermod -aG docker $USER

## first

docker run hello-world

## peut etre utile

export DOCKER_HOST=127.0.0.1:4243 >> ~/.bashrc

container ici: cd /var/run/docker/libcontainerd

```bash
# dans /lib/systemd/system/docker.service
ExecStart=/usr/bin/dockerd -H fd://
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375
```

```bash
# dans  /etc/init.d/docker
DOCKER_OPTS=
DOCKER_OPTS="-H tcp://0.0.0.0:2375"
```
