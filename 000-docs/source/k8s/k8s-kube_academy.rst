k8s - kube_academy
##################

Learning path - Kubernetes Core Concept
***************************************

Platform
========

Introduction
------------

Cloud native principles:

* Container packaged: isolated unit of work that does not require OS dependencies
* Dynamically Managed: actively scheduled and managed by an orchestration process
* Microservice Oriented: loosely coupled with dependencies explicitly described

Why Containers?

* Velocity: enables business to develop and roll out new offerings faster
* Portability: predictable execution in any linux based environment. Move from your laptop to your datacenter in the cloud
* Reliability: hermetically sealed image makes production deployments very simple and less error-prone
* Efficiency: maximize resource utilization
* Self-Service: developer productivity
* Isolation: avoid dependency conflict

Container vs VMs

* Virtual Machines

  * Full OS virtual hardware
  * Deployed as a unit
  * Require hypervisor
  * VM performance critical to cloud performance
  * Overhead cannot be removed
  * Hotplugging requires support from guest OS

* Containers

  * Decouple application and OS
  * Can be composed together
  * Modifies existing OS to provide isolation
  * A concept built on kernel namespace feature
  * Contain as little as one process
  * An application container consumes less RAM
  * Operate at a higher abstraction level, offer move insight into behaviors without deploying additional agents

Command

* Staging and Stopping Containers
  * docker run: start a new container from an image
  * docker stop: stop a running container
  * docker rm: delete a container (must be stopped), add :code:`-f` to both stop and remove a container
* Managind images
  * docker images: display a list of images on the machine
  * docker rmi: delete an image
  * docker build: build an image from a Dockerfile
  * docker tag: add tags to an image
  * docker pull/push: pull and push images to/from a registry
* Docker Troubleshooting Commands
  * docker ps: retrieve a list of running containers, add :code:`-a` to include non running containers
  * docker logs: view a container's log output
  * docker exec:
    * run a command within a container
    * can also start a shell within a container (if available)

Managing application
====================

Cluster concept
===============

Additional Application Features
===============================

Workloads and security
======================
