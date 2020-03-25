Docker - Network
################

Different network
*****************

* Bridge networks
  * enable containers running on the same host to communicate with each other, 
  * local IP, not accessible from outside 
  * new instance of Docker comes with a default bridge network,
  * all newly started containers automatically connect to it. 
  * Out-of-the-box defaults will require fine-tuning in production. For example, custom bridges enable features that aren’t automatic in default mode, including DNS resolution; the ability to add and remove containers from a custom bridge while they’re running; and the ability to share environment variables between containers.
* Overlay networks 
  * for containers running on different hosts (like in a Docker swarm)
  * containers across hosts can automatically find each other and communicate by tunneling network subnets
* host network
  * side by side with the stack on the host
  * A web server on port 80 in a host-networked container is available from port 80 on the host itself
  * Speed is the biggest appeal of host networking
* Macvlan network
  * for applications that work directly with the underlying physical network (such as network-traffic monitoring app)
  * assign an IP address to a container and even a physical MAC address.
  * generally reserved for applications that don’t work unless they rely on a physical network address

Sources
*******

* https://www.networkworld.com/article/3529384/essential-things-to-know-about-container-networking.html