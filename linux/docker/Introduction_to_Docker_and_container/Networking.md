Networking.md
=============


# Networking
Network service -> accepting requests

* `docker run -d -P nginx`
    * `-d`: background
    * `-P`: reachable from other computers
* `docker ps`: affiche les ports in host -> in container
* `docker port <containerId> 80`: print which host port is map on container port 80
* `docker run -d -p 80:80 nginx`: port-on-host:port-on-container
* `docker run -d -p 8080:80 -p 8888:80 nginx`
* `docker inspect --format '{{ .NetworkSettings.IPAdress }}'` <containerId>

### way to integrate
* start the container letting Docker allocate a public port for it, then asign it in your config
* setting the port when running container, et point config on it
* use a network plugin, connecting your container with e.g. VLANs, tunnels, ...
* Enable Swarm Mode to deploy across a cluster, the container will then be reachable through any node of the cluster

# Cointainer network drivers
* `docker run --net <selectedDriver> ...`

include
* bridge (default)
    * a virtal `eth0` interface connected to the Docker bridge (`dcoker0` by default, can be change `--bridge`
* none
    * only `lo` interface no `eth0`
    * cant send or receive network traffic
* host
    * see and can access betwork interfaces of the host
    * can bind any adress/port
    * perf = native
* container
    * launch with `docker run --net container:id`
    * use an other container network stack
    * shares with other container the same interface, IP address, routes; iptable, rules, ...
    * containers can communicate over their `lo` interface (I.E. one can bind to 127.0.0.1 and others can connect to it)



# create a network
* `docker network create dev`: create a network named dev
* `docker network ls`:
* `docker run -d --name es --net dev elasticsearch:2`
* `docker run -it --net dev alpine sh`
    * `ping es`: will ping the container named es
* in Docker Engine 1.9, there is /etc/hosts with adresses.
* in Docker Engine 1.10,this has been replace by dynamic resolver

## service discovery with containers
* `docker run --net dev -d -P jpetazzo/trainingwheels`
* `docker docker ps -l`
* `docker run --net dev --name redis -d redis`

## scope
* name are unique, there can be onl one container named redis
* we can specify network name of our container with `--net-alias`
* `--net-alias` is scoped per network and independent from container name
* `docker run --net dev --name redis -d redis` => `docker run --net dev --net-alias redis -d redis`

* name are local to each network
* `docker create network prod`
* `docker run -d --name prod-es-1 --net-alias es --net prod elasticsearch:2`
* `docker run -d --name prod-es-2 --net-alias es --net prod elasticsearch:2`
* `docker run --net prod --rm alpine nslookup es`: resolving network aliases
* `docker run --rm --net dev centos curl -s es:9200`

## Custom networks
* `--internal`: disables outbound traffic (the network won't have a deffault gateway)
* `--gateway`: indicates which address to use for the gateway (when outbound traffic is allowed)
* `--subnet`: (in CIDR notation) indicates the subnet to use
* `--ip-address`: (in CIDR notation) indicates the subnet to allocate from
* `--aux address`: allows to specify a list of reserved addresses (which won't be allocated to containers)

* `docker network create --subnet 10.66.0.0/16 pubnet`
* `docker run --net pubnet --ip 10.66.66.66 -d nginx`

## Overlay network
* until now we have seen for just one host
* multiple host => overlay network
* `docker swarm init` then `docker swarm join` on other nodes
* `docker network create mynet --driver overlay`
* `docker service create --netwrk mynet myimage`
p272 ... don't understand
* `<install the pluggin>`
* `docker network create --driver pluginname`

## Ambassador
* ambassador are containers that "masquerade" or "proxy" for another service, they abstract the connection details for htie services and permit to
    * discovery (where is my service actually running?)
    * migration (what if my service has to be moved while I use it?)
    * fail over (how




p277