k8s - kodekloud - (CKS) Certified Kubernetes Security Specialist
################################################################

.. code-block:: bash

  alias_file=~/.alias
  PATH_TO_INSTALL=/opt/.kube

  echo "alias k=kubectl" >> ${alias_file}
  echo "alias kg='kubectl get'" >> ${alias_file}
  echo "alias kd='kubectl describe'" >> ${alias_file}
  echo "alias ke='kubectl exec'" >> ${alias_file}
  echo "alias krm='kubectl delete'" >> ${alias_file}
  echo "alias ka='kubectl apply'" >> ${alias_file}
  echo ". ${alias_file}" >> ~/.zshrc
  . ~/.zshrc
  echo ". ${alias_file}" >> ~/.bashrc
  . ~/.bashrc

  mkdir -p ${PATH_TO_INSTALL}
  git clone https://github.com/ahmetb/kubectx ${PATH_TO_INSTALL}/.kubectx;
  ln -s ${PATH_TO_INSTALL}/.kubectx/kubectx /usr/local/bin/kctx;
  ln -s ${PATH_TO_INSTALL}/.kubectx/kubens /usr/local/bin/kns;

  mkdir -p ${PATH_TO_INSTALL}
  wget https://raw.githubusercontent.com/ahmetb/kubectl-alias/master/.kubectl_aliases -o ${PATH_TO_INSTALL}/.kubectl_aliases
  #echo "[ -f ${PATH_TO_INSTALL}/.kubectl_aliases ] && source ${PATH_TO_INSTALL}/.kubectl_aliases" >> ${alias_file}
  #echo "[ -f ${PATH_TO_INSTALL}/.kubectl_aliases ] && source <(cat ${PATH_TO_INSTALL}/.kubectl_aliases | sed -r 's/(kubectl.*) --watch/watch \1/g')" >> ${alias_file}
  echo "function kubectl() { echo "+ kubectl $@">&2; command kubectl $@; }" >> ${alias_file}

  echo ". ${alias_file}" >> ~/.zshrc
  . ~/.zshrc

Cluster Setup and Hardening
***************************

Lab – Run CIS Benchmark Assessment tool on Ubuntu
=================================================

* Run a CIS Bench an check items

Lab – Kube-bench
================

* launch Kub-bench and fix vulnerabilities
* :code:`./kube-bench --config-dir $(pwd)/cfg --config $(pwd)/cfg/config.yaml`

Lab – Service Accounts
======================

* list SA
* check token used by SA
* inspect a SA
* Check which SA a pod use

Labs – View Certificates
========================

* certificate
  * identify certificate
    * apiserver server cert
    * apiserver-etcd client cert
    * apiserver-kubelet client key
    * etcd server cert
    * etcd ca
  * read cn and altname in a cert file
  * read ca name used to sign a cert
  * read the end date of a cert and how long does it is valid for

Labs – Certificates API
=======================

Labs – KubeConfig
=================

* read kubeconfig
* target specific kubeconfig

Labs – RBAC
===========

Labs – Cluster Roles and Role Bindings
======================================

* ClusterRole
  * list cluster role
  * create and bind ClusterRole to give node administration to someone
  * check if a user have the right to do something without having the user in kubeconfig

Labs – Kubelet Security
=======================

* Read and understand kubelet config

Labs – Kubectl Proxy & Port Forward
===================================

* know what you need to connect apiserver
* make a localhost proxy

Labs – Secure Kubernetes Dashboard
==================================

* create sa
* create clusterrole
* create clusterrolebinding
* give all right on all resource in a specific ns (with clusterrole and rolebinding)
* give right to list ns

Labs – Cluster Upgrade
======================

* check cluster version
* check where is deployed workload
* check available upgrade
* update a cluster

Labs – Network security policy
==============================

* list netpol
* check all netpol target in one command
* create netpol ingress
* create netpol egress

Labs – Ingress – 1
==================

* read an ingress configuration
* write an ingress configuration

Labs – Ingress – 2
==================

System Hardening
****************

Lab – Limit Node Access
=======================

* know linux system security basics
  * change user pwd
  * delete user/group
  * suspend user
  * create user with specific shell, specific home, specific uid and group

Lab – SSH Hardening and sudo
============================

* know ssh
  * port
  * scp
  * authent mode
  * option to give pk
  * create user and only permit to him to connect to a node (ssh auth)
  * troubleshoot sudoers

Lab – Identify open ports, remove packages services
===================================================

* list installed package
* list kernel module
* disable a service
* blacklist a module
* identify a service using a port and disable it
* update a package

Lab – UFW Firewall
==================

* check ufw status
* reset firewall
* allow a range of port
* allow ssh
* allow an ip range to a port
* disable ufw

Lab – Seccomp
=============

* list syscall of a command
* know where are seccomp profile
* read seccomp profile
* link a seccomp profile to a pod

Lab – AppArmor
==============

* check if apparmor is activate on a node
* load a profile
* edit apparmor profile in a pod

Minimize Microservice Vulnerability
***********************************

59min - 2h04

Labs – Security Contexts
========================

Labs – Admission Controllers
============================

Labs – Validating and Mutating Admission Controllers
====================================================

Labs – PSP
==========

Labs – OPA
==========

Labs – OPA in Kubernetes
========================

Lab – Manage Kubernetes secrets
===============================

Supply Chain Security
*********************

Labs – Image Security
=====================

Labs – Whitelist Allowed Registries – ImagePolicyWebhook
========================================================

Labs – kubesec
==============

Labs – Trivy
============

Monitoring, Logging and Runtime Security
*****************************************

Labs – Use Falco to Detect Threats
==================================

Labs – Ensure Immutability of Containers at Runtime
===================================================

Labs – Use Audit Logs to monitor access
=======================================

Mock Exam
*********
