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

Program
********

Goal 1h/day or 5 video/day

Understanding the Kubernetes Attack Surface
*******************************************

The Attack (08:06)
==================

* identifie the ip of the application
  * ping
* scan the open port
* if docker is open :code:`docker -H <domain name> ps`
  * :code:`docker -H www.vote.com ps`
  * :code:`docker -H www.vote.com version`
  * :code:`docker -H www.vote.com run --priviledge -it ubuntu bash`
* launch a script to find exploit and acceed to the host

The 4C's of Cloud Native security (03:13)
=========================================

* Cloud
  * datacenter
  * network
  * servers
* Cluster
  * Authent
  * Auth
  * Admission
  * NetPol
* Container
  * Restrict Image
  * Supply Chain
  * Sandboxing
  * Priviledged
* Code
  * Best practices

Cluster Setup and Hardening
***************************

207min - 3h27 - 6h44

API Groups
===========

curl https://kube-master:6443/version
curl https://kube-master:6443/api/v1/pods

root api examples:
- /metrics: health of the cluster
- /healtz: health of the cluster
- /version
- /api: core group
- /apis: named group
- /logs

Core group: namespace,pods,rc,events,endpoints,nodes,bindings,PV,PVC,configmaps,secrets,services
Namegroup:
- /apps
  - /deployments
  - /replicasets
  - /statefulsets
- /extensions
- /networking.k8s.io
  - /networkpolicies
- /storage.k8s.io
- /authentication.k8s.io
- /certificates.k8s.io
  - certificatesigningrequest

CKS-Which request can you do to know the root api > curl http://localhost:6443 -k
CKS-Which request can you do to know the name api > curl http://localhost:6443/apis -k

Usually you need authentication to access the apiserver
curl http://localhost:6443 -k --key admin.key --cert admin.crt --cacert ca.crt

CKS-how to get apiserver on localhost (with correct kubeconfig) > kubectl proxy

CKS-What are the different k8s users > Cluster admin, developers, application end users, Bots
CKS-How k8s manage users > K8S does not manage users, it can manage thanks to a third part mechanism as ldap or certificate, but it can manage bot authent thanks to service account
CKS-What are k8s authent mechanism > Static password file, static token file, certificate, third part identity service

What are CIS Benchmarks (05:52)
===============================

* Center for Internet Security
* CIS-CATLite
* CIS-CATTool

CKS-What is security Benchmark? > A check of security best practice
CKS-What does CIS means > Center for Internet Security

Lab – Run CIS Benchmark Assessment tool on Ubuntu
=================================================

CIS benchmark for Kubernetes (02:41)
====================================

Kube-bench (01:15)
==================

* Permit to check CIS
* deploy mode
  * docker
  * pod
  * bin
  * source
* need to be installed on master node

Lab – Kube-bench
================

* :code:`./kube-bench --config-dir $(pwd)/cfg --config $(pwd)/cfg/config.yaml`

Kubernetes Security Primitives (03:18)
======================================

* on machine
  * disable password auth
  * enable ssh auth
* apiserver
  * who can access
    * file - user, password
    * files - user, token
    * certs
    * external auth provider (ldap)
    * service account
  * what can they do
    * RBAC
    * ABAC
    * Node auth
    * Wehbhook

Authentication (05:34)
======================

* who access
  * admin
  * dev
  * end user (manage by apps)
  * bots
* kube apiserver auth mechanism
  * static password file
    * give as kube-apiserver args
  * static token file
  * certs
  * identity service

Service Accounts (08:02)
========================

* add :code:`serviceAccountName: <your SA>` in pod s spec to use it

Lab – Service Accounts
======================

TLS Basics (20:03)
==================

10

* Public Key Infrastructure

TLS in Kubernetes (07:48)
=========================

* server certs
  * api server
  * etcd
  * kubelet
* client certs
  * us (kubectl) -> api server
  * scheduler -> apiserver
  * kube controller manager -> apiserver
  * kube proxy -> apiserver
  * apiserver -> etcd
  * apiserver -> kubelet
* CA
  * peer etcd
  * kube cluster

TLS in Kubernetes – Certificate Creation (10:55)
================================================

* manage CA
  * :code:`openssl genrsa -out ca.key 2048`: gen ca key
  * :code:`openssl req -new -key ca.key -subj "/CN=KUBERNETES-CA" -out ca.csr`: gen ca csr
  * Certificate Signing Request
  * :code:`openssl x509 -req -in ca.csr -signkey ca.key -out.crt`: sign ca certificate
* manage admin cert
  * :code:`openssl genrsa -out admin.key 2048`: gen admin key
  * :code:`openssl req -new -key admin.key -subj "/CN=kube-admin" -out admin.csr`: gen admin csr
  * :code:`openssl req -new -key admin.key -subj "/CN=kube-admin/O=system:master" -out admin.csr`: gen admin csr
  * :code:`openssl x509 -req -in admin.csr -CA ca.crt -CAkey ca.key -out admin.crt`: sign admin certificate
* :code:`curl https://kube-apiserver:6443/api/v1/pods --key admin.key --cert admin.crt --cacert ca.crt`

.. code-block:: yaml
  :name: kube config with cert

  apiVersion: v1
  clusters:
  - cluster:
      certificate-authority: ca.crt
      server: https://kube-apiserver:6443
    name: kubernetes
  kind: Config
  users:
  - name: kube-admin
    user:
      client-certificate: admin.crt
      client-key: admin.key

.. code-block:: ini
  :name: openssl.cnf to cert with alt name

  [req]
  req_extension = v3_req
  distinguished_name = req_distinguished_name
  [ v3_req ]
  basicConstraints = CA:FALSE
  keyUsage = nonRepudiation,
  subjectAltName = @alt_names
  [alt_names]
  DNS.1 = kubernetes
  DNS.2 = kubernetes.default
  DNS.3 = kubernetes.default.svc
  DNS.4 = kubernetes.default.svc.cluster.local
  IP.1 = 10.96.0.1
  IP.2 = 172.17.0.87

* :code:`openssl x509 -req -in apiserver.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out apiserver.crt -extensions v3_req -extfile openssl.cnf -days 1000`

View Certificate Details (04:31)
================================

* :code:`openssl x509 -in /etc/kubernetes/pki/apiserver.crt -text -noout`
* https://github.com/mmumshad/kubernetes-the-hard-way/tree/master/tools: all certs

Lab – View Certificates
========================

15

Certificates API (06:07)
========================

* :code:`openssl genrsa -out jane.key 2048`
* :code:`openssl req -new -key jane.key -subj "/CN=jane" -out jane.csr`

.. code-block:: yaml
  :name: k8s csr

  apiVersion: certificates.k8s.io/v1beta1
  kind: CertificateSigningRequest
  metadata:
    name: jane
  spec:
    groups:
    - system: authenticated
    usage:
    - digital signature
    - key encipherment
    - server auth
    request: <jane.csr | base64 in oneline>

* :code:`kubectl certificate approve jane`
* :code:`kubectl certificate deny jane`
* :code:`kubectl get csr jane -o jsonpath="{.status.certificate}"` -> user signed cert in base64
* csr action are managed by controller manager (csr approving, csr signing)

Lab – Certificates API
=======================

KubeConfig (08:32)
==================

* :code:`kubectl get pods --server my-kube-playground:6443 --client-key admin.key --client-certificate admin.crt --certificate-authority ca.crt`
* to avoid all of this add it in kubeconfig

.. code-block:: yaml
  :name: kube config

  apiVersion: v1
  clusters:
  - cluster:
      certificate-authority: ca.crt
      server: https://my-kube-playground:6443
    name: my-kube-playgound
  kind: Config
  users:
  - name: kube-admin
    user:
      client-certificate: admin.crt
      client-key: admin.key
  contexts:
  - name: kube-admin@my-kube-playgound
    user: kube-admin
    cluster: my-kube-playgound
  curretn-context: kube-admin@my-kube-playgound

* :code:`kubectl config view`
* :code:`kubectl config use-context kube-admin@my-kube-playgound`
* on :code:`context` you can add the field :code:`namespace`
* when you add cert as path, add the full path
* replace :code:`certificate-authority` by:code:`certificate-authority-data` to add the cert in base64 instead of the path

Lab – KubeConfig
=================

API Groups (05:52)
==================

20

Authorization (07:30)
=====================

* Who are you and what are you allowed to do
* Method:
  * Node: right of kubelet
    * read: svc, endpoint, node, pod
    * write: node status, pod status, events
  * ABAC: external auth
  * RBAC: group permission
  * Webhook: manage authorization out off the main kube component
  * AlwaysAllow
  * AlwaysDeny

RBAC (04:28)
============

.. code-block:: yaml
  :name: role

  apiVerion: rbac.authorization.k8s.io/v1
  kind: Role
  metadata:
    name: developer
  rules:
  - apiGroups: [""]
    resources: ["pods"]
    resourcesNames: ["pod1", "pod2"] # not mandatory
    verbs: ["list","get","create","update","delete"]
  - apiGroups: [""]
    resources: ["ConfigMap"]
    verbs: ["list","get","create","update","delete"]


.. code-block:: yaml
  :name: rolebinding

  apiVersion: rbac.authorization.k8s.io/v1
  kind: RoleBinding
  metadata:
    name: devuser-developer-binding
  subjects:
  - kind: User
    name: dev-user
    apiGroup: rbac.authorization.k8s.io
  roleRef:
    kind: Role
    name: developer
    apiGroup: rbac.authorization.k8s.io

* :code:`kubectl auth can-i create deploy`
* :code:`kubectl auth can-i create deploy --as dev-user`

Lab – RBAC
===========

Cluster Roles and Role Bindings (04:33)
=======================================

* :code:`kubectl api-resources --namespaced=true`: get namespace scoped
* :code:`kubectl api-resources --namespaced=false`: get cluster scoped
* if you give a right on cluster role it give the permission accross namespace

.. code-block:: yaml

  apiVersion: rbac.authorization.k8s.io/v1
  kind: ClusterRole
  metadata:
    name: cluster-administrator
  rules:
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["list","get","create","delete"]

.. code-block:: yaml

  apiVersion: rbac.authorization.k8s.io/v1
  kind: ClusterRoleBinding
  metadata:
    name: cluster-admin-role-binding
  subjects:
  - kind: User
    name: cluster-admin
    apiGroup: rbac.authorization.k8s.io
  roleRef:
    kind: ClusterRole
    name: cluster-administrator
    apiGroup: rbac.authorization.k8s.io

Lab – Cluster Roles and Role Bindings
======================================

25

Kubelet Security (14:48)
========================

1/2

.. code-block:: yaml
  :name: kubelet-config.yaml

  apiVersion: kubelet.config.k8s.io/v1beta1
  kind: KubeletConfiguration
  clusterDomain: cluster.local
  fileCheckFrequency: 0s
  healthzPort: 10248
  clusterDNS:
  - 10.96.0.10
  httpCheckFrequency: 0s
  syncFrequency: 0s
  authentication:
    anonymous:
      enabled: false
    x509:
      clientCAFile: /path/to/ca.crt

* add in kubelet argument :code:`--config=<kubelet-config.yaml path>`
* you can also add each arg with :code:`--healthzPort=10248`
* on kubelet
  * port 10250: serves API that allows full access
  * port 10255: serves API that allows unauthenticated read-only access
* :code:`curl -sk https://localhost:10250/logs/syslog`
* :code:`curl -sk https://localhost:10255/metrics`
* :code:`curl -sk https://localhost:10250/pods/`
* :code:`curl -sk https://localhost:10250/pods/ --key kubelet.key --cert kubelet.crt`

.. code-block:: bash
  :name: kubelet option for secu

  --read-only-port=10255
  --anonymous-auth=false
  --client-ca-file=/path/to/ca.crt
  --kubelet-client-key=/path/to/kubelet.key
  --kubelet-client-cert=/path/to/kubelet.crt
  --authorization-mode=Webhook

.. code-block:: yaml
  :name: kubelet-config.yaml for secu

  apiVersion: kubelet.config.k8s.io/v1beta1
  kind: KubeletConfiguration
  readOnlyPort: 10255
  authentication:
    anonymous:
      enabled: false
    x509:
      clientCAFile: /path/to/ca.crt
    mode: Webhook

Lab – Kubelet Security
=======================

Kubectl Proxy & Port Forward (06:48)
====================================

* when you try to access to apiserver you need authent
* :code:`kubectl proxy`: permit to acces apiserver with :code:`curl localhost:8001 -k`
* :code:`curl http://localhost:8001/api/v1/namespaces/default/services/nginx/proxy/`
* :code:`kubectl port-forward service/nginx 28080:80`
* access to the application on :code:`localhost:28080`

Lab – Kubectl Proxy & Port Forward
===================================

Kubernetes Dashboard (06:13)
============================

30

* with :code:`kubectl proxy`
* :code:`https://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy`
* https://redlock.io/blog/cryptojacking-tesla
* https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/
* https://github.com/kubernetes/dashboard
* https://www.youtube.com/watch?v=od8TnIvuADg
* https://blog.heptio.com/on-securing-the-kubernetes-dashboard-16b09b1b7aca
* https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md

Securing Kubernetes Dashboard (01:38)
=====================================

Lab – Secure Kubernetes Dashboard
==================================

Verify platform binaries before deploying (02:11)
=================================================

* After downloading binary, check the sha512sum

Lab – Verify platform binaries
===============================

35

Kubernetes Software Versions (02:54)
====================================

* :code:`kubectl get nodes`

Cluster Upgrade Process (11:11)
===============================

* core controlplane should be at the same version lvl, but not necessary
  * kube-apiserver must be the higher version
  * controller manager and kube-scheduler can be 1 version lower than the kube-apiserver
  * kubelet and kube-proxy can be 2 version lower thane kube-apiserver
  * kubectl can be between one version upper and one version lower than kube-apiserver
* In number
  * x = 1.10 = kube-apiserver version
  * x >= controller-manager >= x-1 (1.10 >= controller-manager >= 1.9)
  * x >= kube-scheduler >= x-1 (1.10 >= kube-scheduler >= 1.9)
  * x >= kubelet >= x-2 (1.10 >= kubelet >= 1.8)
  * x >= kube-proxy >= x-2 (1.10 >= kube-proxy >= 1.8)
  * x+1 >= kubectl >= x-1 (1.11 >= kubectl >= 1.9)

* :code:`kubeadm upgrade plan`
* :code:`kubectl drain controlplan`
* :code:`kubeadm upgrade apply v1.12.0`
* :code:`kubectl uncordon controlplan`
* first upgrade master node then worker node

CKS-upgrade-command-Which command will be use to upgrade cluster with kubeadm?
kubeadm upgrade plan
kubectl drain controlplane
{package manager} install -y kubelet=1.12.0-00 kubeadm=1.12.0-00
kubeadm upgrade apply v1.12.0
kubeadm upgrade node config --kubelet-version v1.12.0
systemctl restart kubelet
kubectl uncordon controlplan
kubectl get nodes

40

Lab – Cluster Upgrade
======================

Network Policy (07:51)
======================

* ingress netpol controll input trafic
* egress netpol controll output trafic
* default: all allow
* when you activate a netpol on a pod it switch to all deny
* support on
  * kube-router
  * calico
  * romnana
  * weave-net
* not support on
  * Flannel

.. code-block:: yaml
  :name: net pol ingress

  apiVersion: networking.k8s.io/v1
  kind: NetworkPolicy
  metadata:
    name: db-policy
  spec:
    podSelector:
      matchLabels:
        role: db
    policyTypes:
    - Ingress
    ingress:
    - from:
      - podSelector:
        matchLabels:
          name: api-pod
      ports:
      - protocol: TCP
        port: 3306

.. code-block:: yaml
  :name: netpol

  apiVersion: networking.k8s.io/v1
  kind: NetworkPolicy
  metadata:
    name: db-policy
  spec:
    podSelector:
      matchLabels:
        role: db
    policyTypes:
    - Ingress
    ingress:
    - from:
      - podSelector:
        matchLabels:
          name: api-pod
      - namespaceSelector:
          matchLabels:
            name: prod
      - ipBlock:
          cidr: 192.168.5.10/32
      ports:
      - protocol: TCP
        port: 3306

Lab – Network security policy
==============================

Ingress (22:34)
===============

45

.. code-block:: yaml
  :name: ingress base

  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    name: ingress-wear
  spec:
    backend:
      # the service has to be in the same ns
      serviceName: wear-service
      servicePort: 80

.. code-block:: yaml
  :name: sub path

  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    name: ingress-wear
  spec:
    rules:
    - http:
        paths:
        - path: /wear
          backend:
            serviceName: wear-service
            servicePort: 80
        - path: /watch
          backend:
            serviceName: watch-service
            servicePort: 80

.. code-block:: yaml
  :name: subdomain

  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    name: ingress-wear
  spec:
    rules:
    - host: wear.my-onlline-store.com
      http:
        paths:
        - path: /wear
          backend:
            serviceName: wear-service
            servicePort: 80
    - host: watch.my-onlline-store.com
      http:
        paths:
        - path: /watch
          backend:
            serviceName: watch-service
            servicePort: 80

* :code:`kubectl create ingress <ingress-name> --rule="host/path=service:port"`
* :code:`kubectl create ingress ingress-test --rule="wear.my-online-store.com/wear*=wear-service:80"`
* https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-ingress-em-
* https://kubernetes.io/docs/concepts/services-networking/ingress
* https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types

Lab – Ingress – 1
==================

Ingress – Annotations and rewrite-target
========================================

Lab – Ingress – 2
==================

Docker Service Configuration (06:57)
====================================

* :name:`dockerd`
* :name:`dockerd --debug`

.. code-block:: bash

  docker --debug
    --host=tcp://192.168.1.10:2376 \ # carefull; it expose  docker on the server \
    --tls=true \
    --tlscert=/var/docker/server.crt \
    --tlskey=/var/docker/server.key \

* can configure in a file

.. code-block:: json
  :name: /etc/docker/daemon.json

  {
    "debug": true,
    "hosts": ["tcp://192.168.1.10:2375"],
    "tls": true,
    "tlscert": "/var/docker/server.crt",
    "tlskey": "/var/docker/server.key"
  }

Docker – Securing the Daemon (07:25)
====================================

.. code-block:: json
  :name: /etc/docker/daemon.json

  {
    "debug": true,
    "hosts": ["tcp://192.168.1.10:2376"],
    "tls": true, # encrytion
    "tlscert": "/var/docker/server.crt",
    "tlskey": "/var/docker/server.key",
    "tlsverify": true, # authent with client cert
    "tlscacert": "/var/docker/caserver.crt"
  }

* client
  * :code:`export DOCKER_TLS_VERIFY=true`
  * :code:`export DOCKER_HOST="tcp://192.168.1.10:2376"`
  * :code:`docker --tlscert="" --tlskey="" --tlscacert="" ps`

System Hardening
****************

1h13 - 3h17

Least Privilege Principle (05:16)
=================================

* Look at in an airport, each one have is own permission to his job
* Limit Access to node
* RBAC Access
* Remove Obsolete Packages & Service
* Restrict Network Access
* Restrict Obsolete Kernel Modules
* Identify and fix Open Port

Limit Node Access (05:48)
=========================

* Create a private network to your cluster
* only admin access to the node, no dev, no enduser
* important file
  * /etc/password
  * /etc/shadow
  * /etc/group
* :code:`usermod -s /bin/nologin michael`: block the user
* :code:`userdel bob`: remove the user
* :code:`deluser michael admin`: remove michael from group admin

Lab – Limit Node Access
=======================

SSH Hardening (05:49)
=====================

* :code:`ssh <hostname or IP Address>`: acceed to the machine ssh way
* :code:`ssh <user>@<hostname or IP Address>`: acceed to the machine ssh way
* :code:`ssh -l <user> <hostname or IP Address>`: acceed to the machine ssh way
* manage your key
  * :code:`ssh-keygen -t rsa`: generate your key
  * :code:`~/.ssh/id_rsa.pub` your public key
  * :code:`~/.ssh/id_rsa` your private key
  * :code:`ssh-copy-id mark@node01` copy key in the server
  * :code:`~/.ssh/authorized_keys` where pub key are stored
  * :code:`/etc/ssh/sshd_config` where config are stored
* https://www.cisecurity.org/cis-benchmarks/
  * Go to the :code:`Operating Systems` section and search for the :code:`Distribution Independent Linux`

.. code-block:: ini
  :name: /etc/ssh/sshd_config

  PermitRootLogin no
  PasswordAuthentification no

Privilege Escalation in Linux (03:05)
=====================================

* defined in :code:`/etc/sudoers`
* :code:`grep -I ^root /etc/password` remove root login
* sudoers file
  * Field 1 user or group (bob, %sudo (group))
  * Field 2 Hosts (localhost, ALL(defailt))
  * Field 3 User (ALL(default))
  * Field 4 Command (/bin/ls, ALL(unrestricted))
  * Exemple :code:`%admin ALL=(ALL) ALL`

Lab – SSH Hardening and sudo
============================

* :code:`useradd jim`
* :code:`passwd jim`
* :code:`ssh-copy-id -i ~/.ssh/id_rsa.pub jim@node01`
* add :code:`jim ALL=(ALL:ALL) ALL` to :code:`/etc/sudoers`
* :code:`jim ALL=(ALL) NOPASSWD:ALL`
* :code:`%admin ALL=(ALL) ALL`

Remove Obsolete Packages and Services (02:56)
=============================================

* base
  * Bios Post
  * Boot loader (Grub2)
  * Kernel Init
  * Init Process (systemd)
* :code:`systemctl list-units --type service`: list all active service
* :code:`systemctl stop apache2`: stop service
* :code:`systemctl disable apache2`: disable service

10

Restrict Kernel Modules (02:31)
===============================

* :code:`modprobe pcspkr`
* :code:`lsmod` list kernel module
* :code:`cat /etc/modprobe.d/blacklist.conf`: list all blacklisted kernel module (or any file in this directory)
* after modprobe edition, restart
* refer to CIS 3.4

Identify and Disable Open Ports (02:29)
=======================================

* :code:`netstat -an | grep -w LISTEN`: check binded port

Reference links
===============

* https://www.cisecurity.org/cis-benchmarks/
* https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#check-required-ports

Lab – Identify open ports, remove packages services
===================================================

* lsmod
* apt list --installed
* cat /etc/modprobe.d/blacklist.conf

Minimize IAM roles (05:46)
==========================

15

* dont use the root account, use root account to create user and give right, no more

Minimize external access to the network (02:12)
===============================================

* :code:`cat /etc/services`: classique services s port
* if ssh listen on :code:`0.0.0.0` any connection can be established

UFW Firewall Basics (05:55)
===========================

* UFW: Uncomplicated FireWall (interface for iptable)
* :code:`apt-get install ufw`
* :code:`systemctl restart ufw`

* :code:`ufw status`
* :code:`ufw default allow outgoing`
* :code:`ufw default deny incoming`
* :code:`ufw allow from 172.16.238.5 to any port 22 proto tcp`
* :code:`ufw allow from 172.16.238.5 to any port 80 proto tcp`
* :code:`ufw allow from 172.16.100.0/28 to any port 80 proto tcp`
* :code:`ufw allow 1000:2000/tcp`
* :code:`ufw deny 8080`
* :code:`ufw enable`
* :code:`ufw status`
* :code:`ufw delete deny 8080`
* :code:`ufw delete 5`: with 5 the row number in :code:`ufw status`
* :code:`ufw status numbered` display the rules along with rule numbers
* :code:`ufw reset` reset firewall

Lab – UFW Firewall
==================

Linux Syscalls (04:20)
======================

* computer are seperate on 3 parts
  * user space: Application/Process
  * Kernel Space: Linux Kernel
  * Memory, CPU, Devices
* Communication between user and kernel space is with :code:`system calls`
* :code:`touch` command call several system calls
  * open(), close(), execve(), readdir(), strlen(), closedir(),
* :code:`strace`: list all system calls called by an application
  * :code:`strace touch /tmp/error.log`
  * :code:`strace -c touch /tmp/error.log`: count and sumurize
* :code:`pidof etcd`: show pid of the etcd
  * :code:`strace -p 3596`

AquaSec Tracee (03:20)
======================

20

* use eBPF to trace sytem call at runtime
* eBPF: Extended Berkeley Packet Filter
  * Work directly in the kernel space without interfering with the kernel source code or loading any kernel modules
* Tracee: monitor the OS and detect suspicious behavior
  * store the program in /tmp/Tracee
  * need kernel headers (in ubuntu is in /lib/modules)
  * headers dependencies in /usr/src
  * need additionnal capabilities (easier with :code:`--priviledged`)
* :code:`docker run --name tracee --rm --privileged --pid=host -v /lib/modules/:/lib/modules/:ro -v /usr/src:/usr/src:ro -v /tmp/tracee:/tmp/tracee aquasec/tracee:0.4.0 --trace comm=ls`: in :code:`event` column you can see syscalls off ls
* :code:`docker run --name tracee --rm --privileged --pid=host -v /lib/modules/:/lib/modules/:ro -v /usr/src:/usr/src:ro -v /tmp/tracee:/tmp/tracee aquasec/tracee:0.4.0 --trace pid=new`: you can see all the syscalls
* :code:`docker run --name tracee --rm --privileged --pid=host -v /lib/modules/:/lib/modules/:ro -v /usr/src:/usr/src:ro -v /tmp/tracee:/tmp/tracee aquasec/tracee:0.4.0 --trace container=new`: follow all the syscalls of a new container

Restrict syscalls using seccomp (08:37)
=======================================

* Seccomp: Secure Computing
* introduce in 2005 with kernel 2.6.12
* :code:`grep -i seccomp /boot/config-$(uname -r)`: if you see :code:`CONFIG_SECCOMP=yes` seccomp is supported
* test seccomp
  * :code:`docker run docker/whalesay hello!`
  * :code:`docker run -it --rm docker/whalesay /bin/sh`
  * :code:`ps -ef`: look for the pid of /bin/sh
  * :code:`grep Seccomp /proc/1/status`: 1 is the pid
  * check the result
    * if mode is 0: seccomp is disabled
    * if mode is 1: seccomp is in strict mode, all is disabled but read, write, exit and cigarette on Syscalls
    * if mode is 2: seccomp is filtered mode
* if filter is activated and nothing configured there is default filter configuration (in a file default.json)
* default docker seccomp block at least 60 syscalls
* :code:`docker run --security-opt seccomp=/root/custom.json` to test or use a custom seccomp profile
* :code:`docker run --security-opt seccomp=unconfiner` to ignore sandbox

.. code-block:: json
  :name: whitelist.json

  {
    "defaultAction": "SCMP_ACT_ERRNO",
    "architectures": [
      "SCMP_ARCH_X86_64",
      "SCMP_ARCH_X86",
      "SCMP_ARCH_X32"
    ],
    "syscalls": [
      {
        "names": [
          "<syscalls-1>",
          "<syscalls-2>",
          "<syscalls-3>"
        ],
        "action": "SCMP_ACT_ALLOW"
      }
    ]
  }

.. code-block:: json
  :name: blacklist.json

  {
    "defaultAction": "SCMP_ACT_ALLOW",
    "architectures": [
      "SCMP_ARCH_X86_64",
      "SCMP_ARCH_X86",
      "SCMP_ARCH_X32"
    ],
    "syscalls": [
      {
        "names": [
          "<syscalls-1>",
          "<syscalls-2>",
          "<syscalls-3>"
        ],
        "action": "SCMP_ACT_ERRNO"
      }
    ]
  }

Implement Seccomp in Kubernetes (07:51)
=======================================

* :code:`docker run --rm r.j3ss.co/amicontained amicontained`: list blocked syscalls and seccomp mode
* :code:`kubectl run amicontained --image r.j3ss.co/amicontained amicontained -- amicontained `: show logs to know

.. code-block:: yaml
  :name: pod seccomp scaner

  apiVersion: v1
  kind: Pod
  metadata:
    name: amicontained
  spec:
    securityContext:
      seccompProfile:
        type: RuntimeDefault
        #type: Unconfined # default
    containers:
    - name: amicontained
      image: r.j3ss.co/amicontained
      args:
      - amicontained
      securityContext:
        allowPrivilegeEscalation: false

.. code-block:: yaml
  :name: pod with custom

  apiVersion: v1
  kind: Pod
  metadata:
    name: test-audit
  spec:
    securityContext:
      seccompProfile:
        type: Localhost
        localhostProfile: profiles/audit.json # default in /var/lib/kubelet/seccomp
    containers:
    - name: ubuntu
      image: ubuntu
      command: ["bash", "-c", "echo 'I just made some syscalls' && sleep 100"]
      securityContext:
        allowPrivilegeEscalation: false

* :code:`mkdir -p /var/lib/kubelet/seccomp/profiles`
* :code:`echo '{"defaultAction": "SCMP_ACT_LOG"}' /var/lib/kubelet/seccomp/profiles/audit.json`: will log all syscalls in /var/log/syslog
* you can know the correspondance between number and syscall name in :code:`/usr/lib/include/asm/unistd_64.h` (ubuntu)
* or use tracee
* find doc: https://kubernetes.io/docs/tutorials/clusters/seccomp/

Lab – Seccomp
=============

AppArmor (04:09)
================

* :code:`systemctl status apparmor`: check if it is installed
* :code:`cat /sys/module/apparmor/parameters/enabled`: check in node if it is loaded
* :code:`cat /sys/kernel/security/apparmor/profiles`: check available profiles
* :code:`aa-status`: check if apparmor is activated
* 3 apparmor mode
  * enforce: apply profiles
  * complain: allowed but logs as event
  * unconfined: free
* :code:`ls /etc/apparmor.d`: list default profile
* :code:`apparmor_parser -q /etc/apparmor.d/usr.sbin.nginx`: load a module

.. code-block:: hcl

  profile apparmor-deny-write flags=(attach_disconnected) {
    file,
    # Deny all file write,
    deny /** w,
  }

Creating AppArmor Profiles (05:11)
==================================

25

.. code-block:: bash
  :name: add_data.sh

  #!/bin/bash
  data_directory=/opt/app/data
  mkdir -p ${data_directory}
  echo "=> file created at $(date)" | tee ${data_directory} create.log

* :code:`apt-get install -y apparmor-utils`
* :code:`aa-genprof /root/add-data.sh`: generate profile
  * :code:`S`: scan events and ask for each if we deny, inherit, ...
  * :code:`S`: at the end -> save, then :code:`F` to finish
* :code:`aa-status` to see the new profile
* :code:`cat /etc/apparmor.d/root.add_data.sh`: the bash script which will be launch to apply when add_data is launch
* To disable a profile
  * :code:`apparmor_parser /etc/apparmor.d/root.add_data.sh`: validate if profile is ok
  * :code:`apparmor_parser -q /etc/apparmor.d/usr.sbin.nginx`: load a module
  * :code:`apparmor_parser -R /etc/apparmor.d/root.add_data.sh`: desactivate phase 1
  * :code:`ln -s /etc/apparmor.d/root.add_data.sh /etc/apparmor.d/disable/`

AppArmor in Kubernetes (02:44)
==============================

.. code-block:: yaml
  :name: pod with apparmor

  apiVersion: v1
  kind: Pod
  metadata:
    name: ubuntu sleeper
    annotations:
      #container.apparmor.security.beta.kubernetes.io/<container_name>: localhost/<profile-name>
      container.apparmor.security.beta.kubernetes.io/ubuntu-sleeper: localhost/apparmor-deny-write
    spec:
      containers:
      - name: ubuntu-sleeper
        image: ubuntu
        command: ["sh", "-c", "echo 'Sleeping for an hour!' && sleep 1h"]

* go in and try to create a file

Linux Capabilities (04:05)
==========================

* list of capabilities: https://man7.org/linux/man-pages/man7/capabilities.7.html
* :code:`getcap /usr/bin/ping`: list needed capabilities
* :code:`getpcap <pid>`: list needed capabilities
* by default docker permit only 14 capabilities (https://github.com/moby/moby/master/oci/caps/default.go#L6-L19)

.. code-block:: yaml
  :name: pod with apparmor

  apiVersion: v1
  kind: Pod
  metadata:
    name: ubuntu sleeper
  spec:
    containers:
    - name: ubuntu-sleeper
      image: ubuntu
      command: ["sh", "-c", "echo 'Sleeping for an hour!' && sleep 1h"]
      securityContext:
        capabilities:
          add: ["SYS_TIME"]
          drop: ["CHOWN"]

Lab – AppArmor
==============

28 - 66

Minimize Microservice Vulnerability
***********************************

59min - 2h04

Security Contexts (01:52)
=========================

Lab – Security Contexts
========================

Admission Controllers (08:07)
=============================

Lab – Admission Controllers
============================

Validating and Mutating Admission Controllers (10:26)
=====================================================

5

Lab – Validating and Mutating Admission Controllers
====================================================

Pod Security Policies (07:39)
=============================

Lab – PSP
==========

Open Policy Agent (OPA) (09:48)
===============================

1/2

Reference links
===============

10

Lab – OPA
==========

OPA in Kubernetes (09:45)
=========================

Lab – OPA in Kubernetes
========================

OPA Gatekeeper in Kubernetes
============================

Manage Kubernetes secrets (05:38)
=================================

15

Lab – Manage Kubernetes secrets
===============================

Container Sandboxing (06:53)
============================

gVisor (04:55)
==============

18 - 38

Supply Chain Security
*********************

26min - 1h05

Minimize base image footprint (07:24)
=====================================

Image Security (04:43)
======================

Lab – Image Security
=====================

Whitelist Allowed Registries – Image Policy Webhook (05:16)
===========================================================

Lab – Whitelist Allowed Registries – ImagePolicyWebhook
========================================================

1/2

Use static analysis of user workloads (e.g.Kubernetes resources, Docker files) (02:46)
======================================================================================

Lab – kubesec
==============

Scan images for known vulnerabilities (Trivy) (08:34)
=====================================================

Lab – Trivy
============

9 - 20

Monitoring, Logging and Runtime Security
*****************************************

39min

Perform behavioral analytics of syscall process (04:47)
=======================================================

Falco Overview and Installation (02:53)
=======================================

Use Falco to Detect Threats (08:39)
===================================

Falco Configuration Files (06:54)
=================================

Lab – Use Falco to Detect Threats
==================================

Reference links
===============

1/2

Mutable vs Immutable Infrastructure (04:50)
===========================================

Ensure Immutability of Containers at Runtime (05:18)
====================================================

Lab – Ensure Immutability of Containers at Runtime
===================================================

Use Audit Logs to monitor access (10:18)
========================================

Lab – Use Audit Logs to monitor access
=======================================

11

Mock Exam
*********




Completion with udemy
Section 02
2 02 86
Section 03
4 06 84
Section 04
3 09 80
Section 05
3 12 77
Section 06
2 14 74
Section 07
1 15 72
Section 08
2 17 71
Section 09
5 22 69
Section 10
4 26 64
Section 11
4 30 60
Section 12
4 34 56
Section 13
5 39 52
Section 14
5 44 47
Section 15
5 49 42
Section 16
2 51 37
Section 17
4 55 35
Section 18
2 57 31
Section 19
4 61 29
Section 20
1 62 25
Section 21
2 64 24
Section 22
7 71 22
Section 23
3 74 15
Section 24
4 78 12
Section 25
7 85 08
Section 26
1 86 01

86/6 = 15
