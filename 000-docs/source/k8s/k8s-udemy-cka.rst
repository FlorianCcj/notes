k8s - Udemy - (CKA) Certified Kubernetes Administrator with Practice Tests
##########################################################################

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

Core concept
************

2h57 - 18h17

Compare with cargo. On the cargo we put container. But we need to organise container, manage machine, etc

* The master node: manage; plan, schedule, monitor
  * store all in etcd cluster
  * kube scheduler: determine where to deploy container
    * il classe les noeud grace a un score de 0 a 10 en fonction des ressources disponible apres avoir deploye le pod
  * Node controller
    * check l etat des noeud, si un noeud et down, lui laisse 5 min avant de repartir ses pods
  * Replication controler
    * manage load balancing and scaling
    * replace by replica set
  * Controller manager: manage node and replication controller
    * gere le status des nodes et des controller
    * check l etat des noeud toute les 5 seconde
  * Kube api server: authentifie et valide les demandes
    * hard deploy: generate a service in /etc/systemd/system/kube-apiserver
* Worker: host application as container
  * Kubelet listen and execute apiserver order
    * transfert les ordres
    * retourne un rapport regulier sur les container
    * non automatic deployment with kubeadm
  * Kube proxy: permit the communication between each resources
    * deployer sur chaque node
    * creer des regles a chaque creation de service
    * passe par iptables

Etcd
====

* Managed by an ip and a port (default 2379). The ip (or url) must be config in the apiserver
* etcdctl is a binary which permit to manage an etcd
* if manually deployed, you need to give all certificate and config information
* if you deply with kubeadm, etcd is a pod in kubesystem namespace
* all etcd need to know eachover
* Commands v2
  * etcdctl backup
  * etcdctl cluster-health
  * etcdctl mk
  * etcdctl mkdir
  * etcdctl set
* command v3
  * etcdctl snapshot save 
  * etcdctl endpoint health
  * etcdctl get
  * etcdctl put
* export ETCDCTL_API=3 # set api version
* :code:`kubectl exec etcd-master -n kube-system -- sh -c "ETCDCTL_API=3 etcdctl get / --prefix --keys-only --limit=10 --cacert /etc/kubernetes/pki/etcd/ca.crt --cert /etc/kubernetes/pki/etcd/server.crt  --key /etc/kubernetes/pki/etcd/server.key" --endpoints=https://[127.0.0.1]:2379`
* :code:`export ETCDCTL_API=3;etcdctl snapshot save snapshot-pre-boot.db --cacert /etc/kubernetes/pki/etcd/ca.crt --cert /etc/kubernetes/pki/etcd/server.crt  --key /etc/kubernetes/pki/etcd/server.key --endpoints=127.0.0.1:2379`: backup

Yaml in k8s
===========

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
  spec:

.. code-block:: yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      type: front-end
  spec:
    containers:
    - name: nginx-container
      image: nginx

* apply with :code:`kubectl create -f myapp.pod.yml`
* check pod :code:`kubectl get pod`
* check pod :code:`kubectl describe pod myapp-pod`

.. code-block:: yaml

  apiVersion: apps/v1
  kind: ReplicationSet
  metadata:
    name: myapp-replicaset
    labels:
      app: myapp
      type: front-end
  spec:
    replicas: 3
    selector: # no mandatory, which pod monitor
      matchLabels:
        type: front-end
    template:
      metadata:
        name: myapp-pod
        labels:
          app: myapp
          type: front-end
      spec:
        containers:
          - name: nginx-container
            image: nginx

* apply with :code:`kubectl create -f myapp.rc.yml`
* check pod :code:`kubectl get rs`
* check pod :code:`kubectl get po`
* check pod :code:`kubectl describe rc myapp-rc`
* :code:`error: unable to recognize "replicaset-definition.yml": no matches for /, Kind=ReplicatSet`
  * need to correct apiVersion

* scale:
  * change the number of replica and :code:`kubectl replace -f myapp.rs.yml`
  * :code:`kubectl scale --replicas=6 -f myapp.rs.yml`
  * :code:`kubectl scale --replicas=6 rs myapp-replicaset`

Deployment
==========

Permit to manage the pod edition

.. code-block:: yaml

  apiVersion: app/v1
  kind: Deployment
  metadata:
    name: myapp-replicaset
    labels:
      app: myapp
      type: front-end
  spec:
    replicas: 3
    selector: # no mandatory, which pod monitor
      matchLabels:
        type: front-end
    template:
      metadata:
        name: myapp-pod
        labels:
          app: myapp
          type: front-end
      spec:
        containers:
          - name: nginx-container
            image: nginx

* apply with :code:`kubectl create -f myapp.dep.yml`
* check pod :code:`kubectl get all`

* Create an NGINX Pod :code:`kubectl run nginx --image=nginx`
* Generate POD Manifest YAML file (-o yaml). Don't create it(--dry-run) :code:`kubectl run nginx --image=nginx --dry-run=client -o yaml`
* Create a deployment :code:`kubectl create deployment --image=nginx nginx`
* Generate Deployment YAML file (-o yaml). Don't create it(--dry-run) :code:`kubectl create deployment --image=nginx nginx --dry-run=client -o yaml`
* Generate Deployment YAML file (-o yaml). Don't create it(--dry-run) with 4 Replicas (--replicas=4) :code:`kubectl create deployment --image=nginx nginx --dry-run=client -o yaml > nginx-deployment.yaml`
* Save it to a file, make necessary changes to the file (for example, adding more replicas) and then create the deployment. :code:`kubectl create -f nginx-deployment.yaml`
* In k8s version 1.19+, we can specify the --replicas option to create a deployment with 4 replicas. :code:`kubectl create deployment --image=nginx nginx --replicas=4 --dry-run=client -o yaml > nginx-deployment.yaml`

Namespace
=========

To acceed a service you can only call :code:`<svc name>` but outdoor the namespace you need to tell the complete namespace of the service :code:`<ns name>.<svc name>.svc.cluster.local` (dns name of the service)

* check pod in a particular ns :code:`kubectl get -n <my ns>`

.. code-block:: yaml

  # you can specify the namespace
  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    namespace: dev
    labels:
      app: myapp
      type: front-end
  spec:
    containers:
    - name: nginx-container
      image: nginx

.. code-block:: yaml

  apiVersion: v1
  kind: Namespace
  metadata:
    name: dev

* create ns :code:`kubectl create -f dev.ns.yml`
* create ns :code:`kubectl create ns dev`
* to avoid using the :code:`-n` option each 5 sec :code:`kubectl config set-context $(kubectl current-context) -n dev`

.. code-block:: yaml

  # quota
  apiVersion: v1
  kind: Namespace
  metadata:
    name: dev
  spec:
    hard:
      pods: "10"
      requests.cpu: "4"
      requests.memory: "5Gi"
      limits.cpu: "10"
      limits.memory: "10Gi"

Service
=======

Service permit to the exterior to communicate with the pods
from the node you can curl the pod ip, but from outside ...

Services type
* Nodeport
* ClusterIP
* LoadBalancer

Nodeport
--------

Node port will need 3 port
* Nodeport: the port of the node which will be call outside
  * can only be in 30 000-32 767 by default
* Port: the port of the service
* TargetPort: the port of the pod

.. code-block:: yaml

  apiVersion: v1
  kind: Service
  metadata:
    name: myapp-svc
  spec:
    type: NodePort
    ports:
      - targetPort: 80
        port: 80
        nodeport: 30000
    selector:
      # my pod labels
      app: myapp
      type: front-end

Cluster ip
----------

.. code-block:: yaml

  apiVersion: v1
  kind: Service
  metadata:
    name: back-end-svc
  spec:
    #not mandatory, ClusterIP is the default value
    type: ClusterIP
    ports:
      - targetPort: 80
        port: 80
    
    selector:
      # my pod labels
      app: myapp
      type: front-end

LoadBalancer
------------

You should need an loadbalancer to target any of your noad ...

On aws and gcp they make a auto config loadbalancer which you can configure with a loadbalancer service

Imperative vs declarative

* Declarative
  * :code:`kubectl run --image=nginx nginx`
  * :code:`kubectl create deployment --image=nginx nginx`
  * :code:`kubectl expose deployment nginx --port 80`: create svc imperative
  * :code:`kubectl edit deployment nginx`
  * :code:`kubectl scale deployment nginx --replicas=5`
  * :code:`kubectl set image deployment nginx nginx=nginx:1.18`
  * :code:`kubectl create -f nginx.yml`
  * :code:`kubectl replace -f nginx.yml`
  * :code:`kubectl delete -f nginx.yml`
* Imperative
  * Define a set of file
  * apply

* :code:`--dry-run`
* :code:`--dry-run=client`: tell you if the resource can be create
* :code:`-o yaml` output the creation as yaml


* :code:`kubectl run nginx --image=nginx`
* :code:`kubectl run nginx --image=nginx --dry-run=client -o yaml`
* :code:`kubectl create deployment --image=nginx nginx`
* :code:`kubectl create deployment --image=nginx nginx --dry-run=client -o yaml`
* :code:`kubectl create deployment nginx --image=nginx --replicas=4`
* :code:`kubectl scale deployment nginx --replicas=4`
* :code:`kubectl create deployment nginx --image=nginx --dry-run=client -o yaml > nginx-deployment.yaml`
* :code:`kubectl expose pod redis --port=6379 --name redis-service --dry-run=client -o yaml`
* :code:`kubectl create service clusterip redis --tcp=6379:6379 --dry-run=client -o yaml`
* :code:`kubectl expose pod nginx --type=NodePort --port=80 --name=nginx-service --dry-run=client -o yaml`
* :code:`kubectl create service nodeport nginx --tcp=80:80 --node-port=30080 --dry-run=client -o yaml`

Kubectl apply
=============

Will compare the local file filed value and change if need
Then will check last applied configuration (keep in json format) field to remove field if needed

Scheduling
**********

1h50 - 15h20

Manual scheduling
=================

.. code-block:: yaml
  :name: manual scheduling

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      type: front-end
  spec:
    # you can define the node where you want to deploy
    # only at creation
    nodeName: node2
    containers:
    - name: nginx-container
      image: nginx

.. code-block:: yaml

  # you can tell to change a pod's node
  apiVersion: v1
  kind: Binding
  metadata:
    name: myapp-pod
  target:
    apiVersion: v1
    kind: Node
    name: node3

curl --header "Content-Type:application/json" --request POST --data '{"apiVersion":"v1","kind":"Binding","metadata":{"name":"myapp-pod"},"target":{"apiVersion":"v1","kind":"Node","name":"node4"}}' http://$SERVER/api/v1/namespaces/default/pods/$PODNAME/binding

Label and selectors
===================

permit to filter or group by kind, name, app, color, function, ...
Annotaion are used to record other details for information purpose (tool detail like name, version build information, contact detail, phone number)

.. code-block:: yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      type: front-end
      # you can add as many labels as you like
  spec:
    # you can define the node where you want to deploy
    # only at creation
    nodeName: node2
    containers:
    - name: nginx-container
      image: nginx

* :code:`kubectl get pods --selector app=App1`
* :code:`kubectl get pods -l app=App1,tier=coucou`

Taints and tolerations
======================

* Taints is a 2nd skin, depending of if the pod can tolerate or not the taint it can be deploy on the node
* by default pod are intolerate
* :code:`kubectl taint nodes node-name key=value:taint-effect`
* :code:`kubectl taint nodes node1 app=jenkins-worker:NoSchedule`
* :code:`kubectl taint nodes node1 jenkins-worker:NoSchedule-`: remove taint
* taint effect:
  * NoSchedule: will not be schedule on the node
  * PreferNoSchedule: will try to avoid to not schedule on this node
  * NoExecute: NoSchedule + if already existing, will be evicted (killed)

.. code-block:: yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      type: front-end
  spec:
    containers:
    - name: nginx-container
      image: nginx
    # on this key never forget double quote
    tolerations:
    - key: "app"
      operator: "Equal"
      value: "blue"
      effect: "NoSchedule"

* Master node is a classic node but with a taint
* :code:`kubectl describe node master1 | grep Taint`

Node selectors and affinity
===========================

.. code-block:: yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      type: front-end
  spec:
    containers:
    - name: nginx-container
      image: nginx
    nodeSelector:
      size: Large

* :code:`kubectl label nodes <node-name> <label-key>=<label-value>`: add a label to a node
* :code:`kubectl label nodes node1 size=Large`

.. code-block:: yaml
  :name: permit to manage condition like AND or OR

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      type: front-end
  spec:
    containers:
    - name: nginx-container
      image: nginx
    affinity:
      nodeAffinity:
        requiredDuringSchedulingIgnoredDuringExecution:
          nodeSelectorTerms:
          - matchExpressions:
            - key: size
              operator: In
              # can be replace by `NotIn` to exclude value
              # can be replace by `Exists` to check if the label exist (without value)
              values:
              - Large
              - Medium

* type of node affinity:
  * requiredDuringSchedulingIgnoredDuringExecution
  * preferredDuringSchedulingIgnoredDuringExecution
  * (planned) requiredDuringSchedulingRequiredDuringExecution

* Taint permit to be sure that only pod with the good toleration are deploy on the taint node
* But you are not sure that the pod will not be deploy on an other pod
* Node affinity permit to be sure that a pod is deploy on a particular node
* But you are not sure that other pod will not be deploy on the same node

Request and limits
==================

By default pods request 0.5 vCpu and 256Mi
By default pods limit 1 vCpu and 512Mi

.. code-block:: yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      type: front-end
  spec:
    containers:
    - name: nginx-container
      image: nginx
    # you can change what your pod request
    ressources:
      requests:
        memory: "1Gi"
        cpu: 1
      limits:
        memory: "2Gi"
        cpu: 2

* on cpu: 1 = 1000m = 1 hyperthread = 1 AWS vCpu = 1 GCP core = 1 Azure Core
* on memory:
  * 1G (Gigabyte) = 1 000 000 000 bytes
  * 1M (Megabyte) = 1 000 000 bytes
  * 1K (Gigabyte) = 1 000 bytes
  * 1Gi (Gibibyte) = 1 073 741 824 (2^30) bytes
  * 1Mi (Mebibyte) = 1 048 576 (2^20) bytes
  * 1Ki (Gibibyte) = 1 024 (2^10) bytes
* if exceed limit cpu, nothing hapened
* if exceed limit memory, terminate

.. code-block:: yaml

  # you can add default limit and request on namespace
  apiVersion: v1
  kind: LimitRange
  metadata:
    name: mem-limit-range
  spec:
    limits:
    - default:
        memory: 512Mi
        cpu: 1
      defaultRequest:
        memory: 256Mi
        cpu: 0.5
      type: Container

Remember, you CANNOT edit specifications of an existing POD other than the below.
* spec.containers[*].image
* spec.initContainers[*].image
* spec.activeDeadlineSeconds
* spec.tolerations

Daemonsets
==========

* Daemonsets is deployed on all nodes
* permit to help with logging and monitoring
* networking and kubeproxy are daemonset
* Before v1.12 daemonset uses label with the nodeName
* From v1.12 daemonset uses NodeAffinity to deals pod on each node
* ignore by the kubescheduler

.. code-block:: yaml

  apiVersion: apps/v1
  kind: DaemonSet
  metadata:
    name: monitoring daemon
  spec:
    selector:
      matchLabels:
        app: monitoring-agent
    template:
      metadata:
        labels:
          app: monitoring-agent
      spec:
        containers:
          - name: monitoring-agent
            image: monitoring-agent

Static pods
===========

* Kubelet can manage even without apiserver/etcd
* You can add manifest on :code:`/etc/kubernetes/manifests`
* static pod have :code:`-<nodename>` at the end of the pod name
* You can kustom this directory in options of the service :code:`--pod-manifest-path=/etc/kubernetes/manifests`
* or in the kubeconfig.yaml
  * add :code:`--config=kubeconfig.yaml`
  * and in the kubeconfig :code:`staticPodPath: /etc/kubernetes/manifests`

Multiple schedulers
===================

download scheduler binary and launch it as a service

.. code-block:: sh
  :name: my-custom-scheduler.service

  ExecStart=/usr/local/bin/kube-scheduler \\
    --config=/etc/kubernetes/config/kube-scheduler.yaml \\
    --scheduler-name=my-custom-scheduler

.. code-block:: yaml
  :name: /etc/kubernetes/manifests/kube-scheduler.yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: my-custom-scheduler
    namespace: kube-system
  spec:
    container:
    - command:
      # leader-elect: even if there is one scheduler on each master, this is this one which have priority
      - kube-scheduler
      - --adress:127.0.0.1
      - --kubeconfig=/etc/kubernetes/scheduler.conf
      - --leader-elect=true
      - --scheduler-name=my-custom-scheduler
      # - --lock-object-name=my-custom-scheduler #???
      image: k8s.gcr.io/kube-scheduler-amd64:v1.11.3
      name: kube-scheduler

.. code-block:: yaml
  :name: pod-definition.yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: nginx
  spec:
    containers:
    - image: nginx
      name: nginx
    schedulerName: my-custom-scheduler

Logging & Monitoring
********************

(79-86 = 8) 13 min - 13h30

* heapster: deprecated
* use metrics server
* cAdvisor is include in kubelet to export metric
* if metric server is installed you can use :code:`top` command

* :code:`kubectl logs -f my-pod`
* :code:`kubectl logs -f my-pod -c my-container`
* :code:`kubectl logs -f my-pod my-container`

Application Lifecycle Management
********************************

(87-114 = 28) 1h31 - 13h17

Rolling update and rollbacks
============================

* :code:`kubectl rollout status deployment/myapp-deployment`
* :code:`kubectl rollout history deployment/myapp-deployment`
* strategy
  * recreate: destroy all instance, when all instance are destroyed, create new one
  * rolling update: destroy and create instance one by one
* rollout is done with :code:`set` or :code:`apply`
* after a rollout you will have two replica set: old one and new one
* rollback:: :code:`kubectl rollout undo deployment/myapp-deployment`

command and arguments
=====================

* on docker
  * entrypoint: if you add smthing at the end of :code:`docker run`, it will get it as argument of the entrypoint
  * command: if you add something at the end of :code:`docker run` command, it will be replace, or default value of entrypoint

.. code-block:: yaml
  :name: pod-definition.yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: ubuntu-sleeper-pod
  spec:
    containers:
    - image: ubuntu-sleeper
      name: ubuntu-sleeper
      args: ["10"]

.. code-block:: yaml
  :name: pod-definition.yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: ubuntu-sleeper-pod
  spec:
    containers:
    - image: ubuntu-sleeper
      name: ubuntu-sleeper
      # overwrite entrypoint filed of the docker image
      command: ["sleep"]
      # overwrite command filed of the docker image
      args: ["10"]

Env vars
========

.. code-block:: yaml
  :name: envvars exemple

  apiVersion: v1
  kind: Pod
  metadata:
    name: simple-webapp-color
  spec:
    containers:
    - image: simple-webapp-color
      name: simple-webapp-color
      ports:
        - containerPort: 8080
      env:
      # envvars
      - name: APP_COLOR
        value: pink
      # configmap
      - name: APP_COLOR
        valueFrom:
          configMapKeyRef:
            name: app-config
            key: APP_COLOR
      # secret
      - name: APP_COLOR
        valueFrom:
          secretKeyRef:
            name: app-config
            key: APP_COLOR
      # from other field of the pod
      - name: POD_NAME
        valueFrom:
          fieldRef:
            fieldPath: metadata.name

.. code-block:: yaml
  :name: app_config.properties

  APP_COLOR: blue
  APP_MODE: prod

* :code:`kubectl create configmap app-config --from-literal=APP_CONFIG=blue --from-literal=APP_MODE=prod`
* :code:`kubectl create configmap app-config --from-file=app_config.properties`

.. code-block:: yaml
  :name: config-map.yaml

  # create a configmap
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: app-config
  data:
    APP_COLOR: blue
    APP_MODE: prod

.. code-block:: yaml
  :name: env vars load form a file
  
  # give all a configmap as envvars
  apiVersion: v1
  kind: Pod
  metadata:
    name: simple-webapp-color
  spec:
    containers:
    - image: simple-webapp-color
      name: simple-webapp-color
      ports:
        - containerPort: 8080
      envFrom:
      - configMapRef:
          name: app-config

.. code-block:: yaml
  :name: pod-definition.yaml
  
  # push a config map as a volume (as for conf file)
  apiVersion: v1
  kind: Pod
  metadata:
    name: simple-webapp-color
  spec:
    containers:
    - image: simple-webapp-color
      name: simple-webapp-color
      ports:
        - containerPort: 8080
      volumes:
      - name: app-config-volume
        configMap:
          name: app-config

Secrets
=======

* :code:`kubectl create secret generic app-secret --from-literal=DB_Host=mysql --from-literal=DB_User=root --from-literal=DB_Password=passwrd`
* :code:`kubectl create secret generic app-secret --from-file=app_config.secrets`

.. code-block:: yaml
  :name: secret-data.yaml

  # create a secret
  apiVersion: v1
  kind: Secret
  metadata:
    name: app-secret
  data:
    DB_Host: mysql
    DB_User: root
    DB_Password: passwrd

* the value in secret you should cypher it in base64
* :code:`echo -n "mysql" | base64` and complete with :code:`=` to have a multiple of 8 character

.. code-block:: yaml
  :name: secret-data.yaml

  # create a configmap
  apiVersion: v1
  kind: Secret
  metadata:
    name: app-secret
  data:
    DB_Host: bX1zcWw=
    DB_User: cm9vdA==
    DB_Password: cGFzd3Jk

* to show value: :code:`kubectl get secret app-secret -o yaml`

.. code-block:: yaml
  :name: get all value off secret as env vars
  
  # give all a secret as envvars
  apiVersion: v1
  kind: Pod
  metadata:
    name: simple-webapp-color
  spec:
    containers:
    - image: simple-webapp-color
      name: simple-webapp-color
      ports:
        - containerPort: 8080
      envFrom:
      - secretRef:
        name: app-secret

.. code-block:: yaml
  :name: add secret as volume
  
  ---
  # add secret as volume
  # each secret will create a file
  apiVersion: v1
  kind: Pod
  metadata:
    name: secret-1401
  spec:
    volumes:
    - name: secret-volume
      secret:
        secretName: dotfile-secret
    containers:
    - name: secret-admin
      command:
      - sleep
      args:
      - "4800"
      image: busybox
      volumeMounts:
      - name: secret-volume
        readOnly: true
        mountPath: "/etc/secret-volume"

* multicontainer design pattern
  * sidecar
  * adapter
  * ambassador

initcontainer
=============

.. code-block:: yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
  spec:
    containers:
    - name: myapp-container
      image: busybox:1.28
      command: ['sh', '-c', 'echo The app is running! && sleep 3600']
    initContainers:
    - name: init-myservice
      image: busybox:1.28
      command: ['sh', '-c', 'until nslookup myservice; do echo waiting for myservice; sleep 2; done;']
    - name: init-mydb
      image: busybox:1.28
      command: ['sh', '-c', 'until nslookup mydb; do echo waiting for mydb; sleep 2; done;']

Cluster maintenance
*******************

(115-131 = 17) 1h11 - 11h46

Os Upgrade
==========

* If a node do not answer in 5 min, it is considered as dead and all pod will be re located
* :code:`kube-controller-manager --pod-eviction-timeout=5m0s`
* :code:`kubectl drain node1`: ???
* :code:`kubectl cordon node1`: make the node unschedulable
* :code:`kubectl uncordon node1`: re-add the node

K8s software versions
=====================

* :code:`kubectl get nodes`
* alpha release: new feature are present but desactivated

Cluster Upgrade Process
=======================

* core k8s controlplane
  * kube-apiserver
  * kube-scheduler
  * kube-proxy
  * controller-manager
  * kubelet
  * kubectl
* k8s extend
  * etcd
  * core DNS

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

* k8s support 3 minor version
* If your version is 1.10, until 1.12 you could keep your cluster whitout changing. If 1.13 is release you should update your cluster, 1.10 is no more supporter
* the recommendation is to update one minor by one
  * you shouldn t update from 1.10 to 1.13
  * you should update from 1.10 to 1.11 then from 1.11 to 1.12 and from 1.12 to 1.13
* begin by your master node then your worker nodes 
* to upgrade node one by one or all together or add new node, remove one old, add a 2nd, remove a 2nd etc

Upgrade with kubeadm
====================

* :code:`kubeadm upgrade plan`: show all upadte disponible
* :code:`apt-get upgrade -y kubeadm=1.12.0-00`
* :code:`kubeadm upgrade apply v1.12.0`: update everything but kubelet
* update kubelet, first the master then worker
  * master:
    * :code:`apt-get upgrade kubelet=1.12.0-00`
    * :code:`systemctl restart kubelet`
  * worker:
    * :code:`kubectl drain node1`
    * (on node1) :code:`apt-get upgrade -y kubeadm=1.12.0-00`
    * (on node1) :code:`kubeadm upgrade node config --kubelet-version v1.12.0`
    * (on node1) :code:`systemctl restart kubelet`
    * :code:`kubectl uncordon node1`

Backup Restore Methods
======================

* what to restore:
  * Resource configuration
    * keep it on git
    * query the api-server
      * :code:`kubectl get all --all-namespace -o yaml > all-deploy-services.yaml`
      * use velero
  * ETCD Cluster
    * on the service, launching there is an option :code:`--data-dir` where data is kept
    * :code:`ETCDCTL_API=3 etcdctl snapshot save snapshot.db`
    * :code:`ETCDCTL_API=3 etcdctl snapshot status snapshot.db`
    * :code:`service kube-apiserver stop`
    * :code:`ETCDCTL_API=3 etcdctl snapshot restore --data-dir /var/lib/etcd-from-backup`
    * :code:`systemctl daemon-reload`
    * :code:`service etcd restart`
    * :code:`service kube-apiserver start`
    * maybe you need
      * :code:`ETCDCTL_API=3 etcdctl snapshot save snapshot.db --endpoints=https://127.0.0.1:2379 --cacert=/etc/etcd/ca.crt --cert=/etc/etcd/etcd-server.crt --key=/etc/etcd/etcd-server.key`
  * Persistent Volumes

Etcd command
============

* :code:`export ETCDCTL_API=3`
* :code:`etcdctl snapshot restore -h`
* :code:`etcdctl snapshot save -h`
* options
  * :code:`--cacert: verify certificates of TLS-enabled secure servers using this CA bundle`
  * :code:`--cert: identify secure client using this TLS certificate file`
  * :code:`--endpoints=[127.0.0.1:2379]: This is the default as ETCD is running on master node and exposed on localhost 2379.`
  * :code:`--key: identify secure client using this TLS key file`

Security
********

(132-164 = 33) 2h21 - 10h35

Security Primitives
===================

* secure hosts
  * password based authentication disabled
  * ssh key based authentication
* Authentication
  * who can access
    * files - username and password
    * files - username and tokens
    * Certificates
    * External Authentication providers LDAP
    * Service Accounts
  * What can they do
    * RBAC Authorization
    * ABAC Authorization
    * Node Authorization
    * Webhook Mode
* TLS Certificates
* Network policies

Authentication
==============

* Who access
  * Admins: User
  * Dev: User
  * Application End users: manage by application
  * bots: Service Accounts
* :code:`kubect create serviceaccount sa1`
* :code:`kubect get serviceaccount`
* kube-apiserver auth mechanism
  * static password file
  * static token file
  * certificates
  * third part auth, identity services

.. code-block:: csv
  :name: user-details.csv

  password123,user1,u0001
  password123,user2,u0002
  password123,user3,u0003
  password123,user4,u0004

* this file have 3 column
  * password
  * username
  * uid
  * (optional) group
* then give to the api-server by argument
  * :code:`--basic-auth-file=user-details.csv`
* use in curl :code:`curl -v -k https://master-node-ip:6443/api/v1/pods -u "user1:password123"`

.. code-block:: csv
  :name: user-token-details.csv

  AZERTYUIOPMLKJHGFDSQWXCVBN,user1,u0001
  NCXWQSDFGHJKLMOIUYTREZASFD,user2,u0002
  QSDFGHJKLMLKJHGFDSQAZERTYU,user3,u0003
  WXCVBNYTRESXCVHJKIUGFDDFUY,user4,u0004

* if you use token, then give to the api-server by argument
  * :code:`--token-auth-file=user-token-details.csv`
* use in curl :code:`curl -v -k https://master-node-ip:6443/api/v1/pods --header "Authorization: Bearer QSDFGHJKLMLKJHGFDSQAZERTYU"`

* basic auth is deprecated in 1.19

TLS
====

* TLS is made to encrypted data between client and server
  * symmetric: exchange of key
  * asymmetric: private key and public lock
* on a server use asymmetric encryption
  * push your public lock on :code:`~/.ssh/authorized_keys` on your server
* :code:`openssl genrsa -out my-bank.key 1024`
* :code:`openssl rsa -in my-bank.key -pubout > mybank.pem`
* certificate authority: organism that you can trust to deal certificate
* :code:`openssl req -new -key my-bank.key -out my-bank.csr -subj "/C=US/ST=CA/O=MyOrg, Inc./CN=my-bank.com"`
* you can manage client certificat to only permit to define list of client to acces
* private key file MUST HAVE :code:`key` on their filename

TLS in k8S/cert creation
========================

* 3 certificates
  * Root certificates: CA
  * Server Certificates
  * Client certificates
* All node must have master certificate
* which have server certificate:
  * kube-apiserver
  * etcd server
  * kubelet
* which have client certificate
  * admin (with kubectl)
  * kube-scheduler
  * kube-controller-manager
  * kube-proxy
  * kube-apiserver (to acces etcd and kubelet)
* which CA do we have
  * one for control plane
  * one for etcd

* ca management
  * :code:`openssl genrsa -out ca.key 2048`: generate key
  * :code:`openssl req -new -key ca.key -subj "/CN=KUBERNETES-CA" -out ca.csr`: Certificate Signing Request
  * :code:`openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt`: sign certificat
* admin user
  * :code:`openssl genrsa -out admin.key 2048`
  * :code:`openssl req -new -key admin.key -subj "/CN=kube-admin" -out admin.csr`: Certificate Signing
  * :code:`openssl req -new -key admin.key -subj "/CN=kube-admin/O=system:masters" -out admin.csr`: Certificate Signing with a group
  * :code:`openssl x509 -req -in admin.csr -CA ca.crt -CAkey ca.key -out admin.crt`: sign certificat
* for kube scheduler, kube controller manager there are system component, you need to prefix them by :code:`system:`
  * :code:`openssl req -new -key admin.key -subj "/CN=system:kube-scheduler" -out admin.csr`
* permit to acces kubeapiserver
  * :code:`curl https://kube-apiserver:6443/api/v1/pods --key admin.key --cert admin.crt --cacert ca.crt`

.. code-block:: yaml
  :name: kubeconfig.yaml

  apiVertsion: v1
  clusters:
  - cluster:
      certificate-authority: ca.crt
      server: https://kube-apiserver:6443
    name: kubernetes
  kind: Config
  users:
  - name: kubernetes-admin
    user:
      client-certificate: admin.crt
      client-key: admin.key

* they all need ca certificate
* etcd generate peer certificate to communicate between each instance of the etcd cluster
* server certificate can be
  * on the service name: <svc-name>
  * <svc-name>.<ns-name>
  * <svc-name>.<ns-name>.svc
  * <svc-name>.<ns-name>.svc.cluster.local
  * <internal ip-adress>
  * <external ip-adress>
* kube-apiservier certificate
  * :code:`openssl genrsa -out apiserver.key 2048`
  * :code:`openssl req -new -key apiserver.key -subj "/CN=kube-apiserver" -out apiserver.csr`
  * :code:`openssl req -new -key apiserver.key -subj "/CN=kube-apiserver" -out apiserver.csr --config openssl.cnf`
  * :code:`openssl x509 -req -in adminserver.csr -CA ca.crt -CAkey ca.key -out apiserver.crt`: sign certificat

.. code-block:: ini
  :name: openssl.cnf

  [req]
  req_extensions = v3_req
  distinguished_name = req_distinguished_name
  [ v3_req ]
  basicConstraints = CA:FALSE
  keyUsage = nonRepudiation,
  subjectAltName = @alt_names
  [alt_name]
  DNS.1 = kubernetes
  DNS.2 = kubernetes.default
  DNS.3 = kubernetes.default.svc
  DNS.4 = kubernetes.default.svc.cluster.local
  IP.1 = 10.96.0.1
  IP.2 = 172.17.0.87

* kubelet:
  * you need a key and cert for each node
  * each cert is on node name
  * certificate are give on kubelet config file
  * if you are on master do not forget :code:`system:node:`

.. code-block:: yaml
  :name: kubelet-config.yaml

  kind: KubeletConfiguration
  apiVersion: kubelet.config.k8s.io/v1beta1
  authentication:
    x509:
      clientCAFile: "/var/lib/kubernetes/ca.pem"
  authorization:
    mode: Webhook
  clusterDomain: "cluster.local"
  clusterDNS:
    - "10.32.0.10"
  podCIDR: "${POD_CIDR}"
  resolvConf: "/run/systemd/resolv/resolv.conf"
  runtimeRequestTimeout: "15m"
  tlsCertFile: "/var/lib/kubelet/kubelet-node01.crt"
  tlsPrivateKeyFile: "/var/lib/kubelet/kubelet-node01.key"
  
View Certificate Detail
=======================
  
* :code:`cat /etc/systemd/system/kube-apiserver.service`
* :code:`cat /etc/kubernetes/manifests/kube-apiserver.yaml`
* :code:`openssl x509 -in /etc/kubernetes/pki/apiserver.crt`
  * https://github.com/mmumshad/kubernetes-the-hard-way/tree/master/tools
  * check Subject, must be CN=kube-apiserver
  * check alt name
  * check issuer: must be kubernetes
  * check Not After
* inspect service logs: :code:`journalctl -u etcd.service -1`
* inspect service logs: :code:`kubectl logs etcd`
* inspect logs: :code:`docker ps`

Certificates API
================

* a CA server is include un k8s, generally on master
* you can:
  * Create CertificateSigninRequest Object
  * Review Requests
  * Approve Requests
  * Share Certs to Users
* thanks to kubectl command
* CSR are manage by the controller Manager
* :code:`openssl genrsa -out jane.key 2048`
* :code:`openssl req -new -key -subj "/CN=jane" -out jane.csr`

.. code-block:: yaml
  :name: csr creation

  ---
  apiVersion: certificates.k8s.io/v1
  kind: CertificateSigningRequest
  metadata:
    name: akshay
  spec:
    groups:
    - system:authenticated
    request: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ1ZqQ0NBVDRDQVFBd0VURVBNQTBHQTFVRUF3d0dZV3R6YUdGNU1JSUJJakFOQmdrcWhraUc5dzBCQVFFRgpBQU9DQVE4QU1JSUJDZ0tDQVFFQXY4azZTTE9HVzcrV3JwUUhITnI2TGFROTJhVmQ1blNLajR6UEhsNUlJYVdlCmJ4RU9JYkNmRkhKKzlIOE1RaS9hbCswcEkwR2xpYnlmTXozL2lGSWF3eGVXNFA3bDJjK1g0L0lqOXZQVC9jU3UKMDAya2ZvV0xUUkpQbWtKaVVuQTRpSGxZNDdmYkpQZDhIRGFuWHM3bnFoenVvTnZLbWhwL2twZUVvaHd5MFRVMAo5bzdvcjJWb1hWZTVyUnNoMms4dzV2TlVPL3BBdEk4VkRydUhCYzRxaHM3MDI1ZTZTUXFDeHUyOHNhTDh1blJQCkR6V2ZsNVpLcTVpdlJNeFQrcUo0UGpBL2pHV2d6QVliL1hDQXRrRVJyNlMwak9XaEw1Q0ErVU1BQmd5a1c5emQKTmlXbnJZUEdqVWh1WjZBeWJ1VzMxMjRqdlFvbndRRUprNEdoayt2SU53SURBUUFCb0FBd0RRWUpLb1pJaHZjTgpBUUVMQlFBRGdnRUJBQi94dDZ2d2EweWZHZFpKZ1k2ZDRUZEFtN2ZiTHRqUE15OHByTi9WZEdxN25oVDNUUE5zCjEwRFFaVGN6T21hTjVTZmpTaVAvaDRZQzQ0QjhFMll5Szg4Z2lDaUVEWDNlaDFYZnB3bnlJMVBDVE1mYys3cWUKMkJZTGJWSitRY040MDU4YituK24wMy9oVkN4L1VRRFhvc2w4Z2hOaHhGck9zRUtuVExiWHRsK29jQ0RtN3I3UwpUYTFkbWtFWCtWUnFJYXFGSDd1dDJveHgxcHdCdnJEeGUvV2cybXNqdHJZUXJ3eDJmQnErQ2Z1dm1sVS9rME4rCml3MEFjbVJsMy9veTdqR3ptMXdqdTJvNG4zSDNKQ25SbE41SnIyQkZTcFVQU3dCL1lUZ1ZobHVMNmwwRERxS3MKNTdYcEYxcjZWdmJmbTRldkhDNnJCSnNiZmI2ZU1KejZPMUU9Ci0tLS0tRU5EIENFUlRJRklDQVRFIFJFUVVFU1QtLS0tLQo=
    signerName: kubernetes.io/kube-apiserver-client
    usages:
    - client auth

* :code:`kubectl get csr`
* :code:`kubectl certificate approve jane`
* :code:`kubectl certificate deny jane`

Kubeconfig
==========

* :code:`curl https://my-kube-playground:6443/api/v1/pods --key admin.key --cert admin.crt --cacert ca.crt`
* :code:`kubectl get pods --server my-kube-playground:6443 --client-key admin.key --client-certificate admin.crt --certificate-authority ca.crt`

.. code-block::
  :name: $HOME/.kube/config

  --server my-kube-playground:6443
  --client-key admin.key
  --client-certificate admin.crt
  --certificate-authority ca.crt

* create :code:`$HOME/.kube/config` if you want to add default option
* you can custom config path adding :code:`--config my-super-path`

.. code-block:: yaml
  :name: $HOME/.kube/config.yaml

  apiVersion: v1
  kind: Config
  current-context: my-kube-admin@my-kube-playground
  clusters:
  - name: my-kube-playground
    cluster:
      certificate-authority: /etc/kubernetes/pki/ca.crt
      # you can give also put data with cert data | base64
      # certificate-authority-data:
      server: https://my-kube-playground:6443
  contexts:
  - name: my-kube-admin@my-kube-playground
    context:
      cluster: my-kube-playground
      user: my-kube-admin
  - name: my-kube-admin@my-kube-playground@system
    context:
      cluster: my-kube-playground
      user: my-kube-admin
      # you can add ns
      namespace: kube-system
  users:
  - name: my-kube-admin
    user:
      client-certificate: /etc/kubernetes/pki/admin.crt
      client-key: /etc/kubernetes/pki/admin.key

* :code:`kubectl config view`
* :code:`kubectl config use-context prod-user@prod`

API Group
=========

* :code:`curl https://kube-master:6443/version`
* :code:`curl https://kube-master:6443/api/v1/pods`
* groups:
  * :code:`/metrics`
  * :code:`/healthz`
  * :code:`/version`
  * :code:`/api`: core group
    * :code:`curl https://kube-master:6443/api/v1/{namespaces, pods, rc, events, endpoints, nodes, bindings, PV, PVC, configmaps, secrets, services}`
  * :code:`/apis`: named group
    * :code:`/apps/v1`
      * :code:`/deployments`
      * :code:`/replicasets`
      * :code:`/statefullsets`
    * :code:`/extensions`
    * :code:`/networking.k8s.io/v1`
      * :code:`networkpolicies`
    * :code:`/storage.k8s.io`
    * :code:`/authentication.k8s.io`
    * :code:`/certicates.k8s.io/v1`
      * :code:`certficatesigningrequests`
  * :code:`/logs`
* on named group: API Groups + (version +) Resources + Verbs
* Verbs: list, get, create, delete, update, watch
* :code:`kubectl proxy`: make a proxy on your computer to curl the apiserver

Authorization
=============

* 4 form
  * node: if the client certificat dont have :code:`system:node:` group he is not alowed
  * ABAC: for each user you asign permision
  * RBAC: you asign permision to a group then you asign user to group
  * Webhook: it launch a request to know (exemple Open Policy Agent)
* config on apiserver
  * :code:`--authorization-mode=AlwaysAllow`: default
  * :code:`--authorization-mode=AlwaysDeny`
  * :code:`--authorization-mode=Node,RBAC,Webhook`

RBAC
====

.. code-block:: yaml

  apiVersion: rbac.authorization.k8s.io/v1
  kind: Role
  metadata:
    name: developer
  rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["list","get","create","update","delete"]
  - apiGroups: [""]
    resources: ["ConfigMap"]
    verbs: ["list","get","create"]

.. code-block:: yaml

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

* :code:`kubectl get roles`
* :code:`kubectl get rolebindings`
* :code:`kubectl describe role developer`
* :code:`kubectl describe rolebindings devuser-developer-binding`
* :code:`kubectl auth can-i create deployments`
* :code:`kubectl auth can-i create deployments --as dev-user`

.. code-block:: yaml

  apiVersion: rbac.authorization.k8s.io/v1
  kind: Role
  metadata:
    name: developer
    # target only this namespace
    namespace: developer
  rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["list","get","create","update","delete"]
  - apiGroups: [""]
    resources: ["ConfigMap"]
    verbs: ["list","get","create"]

Cluster Roles and Role Binding
==============================

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

Service Account
===============

* :code:`kubectl create serviceaccount dashboard-sa`
* :code:`kubectl get serviceaccount`
* :code:`kubectl describe serviceaccount dashboard-sa`
* :code:`kubectl describe secret dashboard-sa-token-kbsaboom`
* :code:`curl https://192.168.56.70:6443/api -k --header "Authorization: Bearer ..."`
* each namespace have a default service account which is mount on each pod
* :code:`kubectl exec -it my-kubernetes-dashboard ls /var/run/secrets/kubernetes.io/serviceaccount`: token is mounted

.. code-block:: yaml
  :name: pod with service account

  apiVersion: v1
  kind: Pod
  metadata:
    name: my-kubernetes-dashboard
  spec:
    containers:
    - name: my-kubernetes-dashboard
      image: my-kubernetes-dashboard
    serviceAccountName: dashboard-sa
    # you can not mount the token
    # automountServiceAccountToken: false

Image Security
==============

.. code-block:: yaml
  :name: pod-definition.yml

  apiVersion: v1
  kind: Pod
  metadata:
    name: nginx-in-private-registry
  spec:
    containers:
    - name: nginx
      image: private-registry.io/nginx
    imagePullSecrets:
    - name: regCred

* :code:`kubectl create secret docker-registry regcred --docker-server=private-registry.io --docker-username=registry-user --docker-password=registry-password --docker-email=registry-user@org.com`

Security contexts
=================

.. code-block:: yaml
  :name: pod-definition.yml

  apiVersion: v1
  kind: Pod
  metadata:
    name: nginx-in-private-registry
  spec:
    securityContext:
      runAsUser: 1000
    containers:
    - name: nginx
      image: private-registry.io/nginx

.. code-block:: yaml
  :name: pod-definition.yml

  apiVersion: v1
  kind: Pod
  metadata:
    name: nginx-in-private-registry
  spec:
    containers:
    - name: nginx
      image: private-registry.io/nginx
      securityContext:
        runAsUser: 1000
        # capabilities only at container lvl not pod lvl
        capabilities:
          add: ["MAC_ADMIN"]

Network Policy
==============

* egress manage trafic which go out the pod
* ingress manage trafic which go in the pod
* egress for an emetor is an ingress for the receiver

.. code-block:: yaml
  :name: netpol ingress

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
      # from api of the qualif ns
      - podSelector:
          matchLabels:
            name: api-pod
        namespaceSelector:
          matchLabels:
            name: qualif
      # from all pod in namespace prod
      - namespaceSelector:
          matchLabels:
            name: prod
      # from the server
      - ipBlock:
        cidr: 192.168.5.10/32
    egress:
    - to:
      - podSelector:
          matchLabels:
            name: mysql
      ports:
      - port: 3306
    - to:
      - podSelector:
          matchLabels:
            name: payroll
      ports:
      - port: 8080
    ports:
    - protocol: TCP
      port: 3306

Storage
=======

(165-180 = 16) 55 min - 8h14

Docker storage

* docker storage
  * storage driver
  * volume driver
* file system: /var/lib/docker
* layer archi
  * docker run: create a new layer
  * Copy-on-write: create a copy of the file in the RW layer
* storage driver:
  * AUFS
  * ZFS
  * BTRFS
  * Device Mapper
  * Overlay
  * Overlay2
* Volume driver:
  * Local
  * Azure File Storage
  * Conviy
  * DigitalOcean Block Storageflocker
  * Flocker
  * GlusterFS
  * NetApp
  * RexRay
  * Portworx
  * VMware vSphere Storage

Container Storage Interface (CSI)
=================================

* Container Runtime Interface: permet to manage docker, rocket, crio; etc.
* CSI permit to interface with all storage solution

Volume
======

* permit to persist data even after container destruction

.. code-block:: yaml
  :name: volume-in-pod.yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: Pod with volume
  spec:
    containers:
    - name: alpine
      image: alpine
      command: ["/bin/sh", "-c"]
      args: ["shuf -i 0-100 -n 1 >> /opt/number.out;"]
      volumeMounts:
      - mountPath: /opt
        name: data-volume
    volumes:
    - name: data-volume
      # not recommand on multi node cluster ... data is not shared
      hostPath:
        path: /data
        type: Directory

PV
====

* administrator create a pool of PV and developper ask it with PVC

.. code-block:: yaml
  :name: pv-file.yaml

  apiVersion: v1
  kind: PersistentVolume
  metadata:
    name: pv-vol1
  spec:
    accessModes:
      - ReadWriteOnce # value: ReadOnlyMany, ReadWriteOnce, ReadWriteMany
    capacity:
      storage: Gi
    # or replace with storage provider
    hostPath:
      path: /tmp/data
    persistentVolumeReclaimPolicy: Retain # not mandatory

PVC
====

* k8s bind pvc to pv depending on
  * sufficient Capacity
  * Access Modes
  * Volumes Modes
  * Storage Class
  * Selector
* If no PV is ok, PVC will be pending, waiting a good PV is released

.. code-block:: yaml
  :name: pvc-file.yml

  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: mypvc
  spec:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 500Mi

* on PV you can choose the policy of the reclaim
  * :code:`persistentVolumeReclaimPolicy`
  * value:
    * :code:`Delete`: the PV is delete
    * :code:`Retain` (default) and no other PVC can bound it
    * :code:`Recycle`: delete the PV and recreate one to be available to an other PVC

.. code-block:: yaml
  :name: pvc in pod

  apiVersion: v1
  kind: Pod
  metadata.name: mypod
  spec:
    containers:
    - name: myfrontent
      image: nginx
      volumeMounts:
      - mountPath: "/var/www/html"
        name: mypd
    volumes:
    - name: mypd
      persistentVolumeClaim:
        claimName: myclaim
    - hostPath:
        path: /etc/ssl/certs
        type: DirectoryOrCreate

Storage Class
=============

* To provide dynamicaly PV we can use storage class

.. code-block:: yaml
  :name: storage class file

  apiVersion: storage.k8s.io/v1
  kind: StorageClass
  metadata.name: google-storage
  provisioner: kubernetes.io/gce-pd

.. code-block:: yaml
  :name: pvc with StorageClass

  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: mypvc
  spec:
    storageClassName: google-storage
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 500Mi

* remove PV definition
* in pvc add :class:`storageClassName: google-storage`
* add :code:`volumeBindingMode: WaitForFirstConsumer` to sc to wait a pod use it before provisionning

Networking
**********

(181-217 = 37) 3h07 - 7h19

Switching Routing
=================

* A network is just two computer connected
* The connection go throught an interface
* you can see the connected interface with :code:`ip link`
* :code:`ip addr add 192.168.1.10/24 dev eth0`: add the other machine
* :code:`ip addr add 192.168.1.11/24 dev eth0`: add the other machine
* a routeur connects 2 network together
* routeur have gateway for each network (here 192.168.1.1 and 192.168.2.1)
* to see routing: :code:`route`
* :code:`ip route add 192.168.2.0/24 via 192.168.1.1`: add the other network
* :code:`ip route add 172.217.194.0/24 via 192.168.2.1`: add internet
* :code:`/proc/sys/net/ipv4/ip_forward`: define if you connect the different interface
  * you need to edit also in :code:`/etc/sysctl.conf` value :code:`net.ipv4.ip_forward=`
* :code:`arp <nodename>`: find mac addr of a node
* :code:`ip link show <interface name>`: show only the interface
* :code:`ip route show default`: show default gw and interface
* :code:`ip addr show weave`: show pod ip range
* :code:`netstat -lptn`: show which process are on which port
* :code:`netstat -nap`: show the number of connection
* look api-server :code:`service-cluster-ip-range` to see service ip range

* default network plugin directory:
  * conf: :code:`/etc/<plugin name>/net.d`
  * suported bin: :code:`/opt/<plugin name>/bin`

DNS
====

* DNS permit to not have every ip in /etc/hosts
* you can change priority in /etc/nsswitch.conf on value :code:`hosts`
* you can list DNS on /etc/resolv.conf
* domain names
  * root: :code:`.`
  * top lvl domain name: :code:`.com`
  * subdomain 1: :code:`google`
  * subdomain 2: :code:`WWW`
* nslookup www.google.com
* dig www.google.com

Network Namespace
=================

* When a container is deployed it has is own namespace, interface, network , ...
* :code:`ip link add <veth-red> type veth peer name <veth-blue>`
* :code:`ip link set <veth-red> netns <red>`

Docker Networking
=================

* :code:`docker run --network none nginx`
* :code:`docker run --network host nginx`
* :code:`docker run --network bridge nginx` (default): a network only for docker
  * the interface is docker0
* :code:`ip netns`
* :code:`ip -n ... addr`: view addr from the ns
* :code:`curl http://<bridge container ip>:80`
* :code:`curl http://172.17.0.3:80`: you can acces to your container
* :code:`iptables -t nat -A PREROUTING -j DNAT -dport 8080 --to-destination 80`: what docker do with :code:`-p`
* :code:`iptables -nvL -t nat`: list iptable nat rules

CNI
====

* all network namespace functionnality is used the same way in docker, rocket mesos and even k8s
* so they made a binary :code:`bridge` to manage all of this
* :code:`bridge add 2e34cdf34 /var/run/netns/2e34ddf34`: add a container to a ns
* CNI define the standart to manage the network
* CNI responsibilities
  * Must support arguments ADD/DEL/CHECK
  * Must support parameters container id, network ns, etc
  * Must manage IP Address assignment to PODs
  * Must Return results in a specific format

Cluster Network
===============

* ports:
  * kube-api: 6443
  * kubelet: 10250
  * kube-scheduler: 10251
  * kube-controller-manager: 10252
  * Service: 30000-32767
  * etcd: 2379
  * source: https://kubernetes.io/docs/setup/independent/install-kubeadm/#check-required-ports

Pod Networking
==============

???

CNI in k8s
==========

* CNI plugin is defined in kubelet
* :code:`ls /opt/cni/bin`
* :code:`ls /opt/cni/net.d`: witch to use

CNI weave
=========

* weave deploy an agent on each node
* there are all connected
* when a pod send a package, the agent get it in an other package, the agent of the other get it, unpackage it then deliver the package
* weave can be deploy as pod or daemonset
* :code:`kubectl apply -f "https://cloud/weave/workd/k8s/net?k8s-version=$(kubectl version | base65 | tr -d '\n')"`: deploy as daemonset

IP Adress Management (IPAM CNI)
===============================

* we can create a file with all ip list with an indication FREE or ASSIGNED with the designation of the pod
* CNI come with host-local plugin and DHCP plugin
* :code:`/etc/cni/net.d/net-script.conf`: we can specify the type of plugin that we use
* default weave:
  * :code:`10.32.0.0/12`
  * :code:`10.32.0.1 > 10.47.255.254` (1 048 475 pods possible)

Service Networking
==================

* Multi type of service
  * ClusterIP: permit to acces to the pod everywhere in the cluster
  * NodePort: ClusterIP + expose on a port on all node
* kubelet watch change un apiserver, when a pod is create, it create in a node
* kubeproxy watch change un apiserver, when a svc is create, kube proxy get the ip adress and create forwarding rules on each nodes
  * use userspace, ipvs or iptables
  * :code:`kube-proxy --proxymode [userspace | iptables | ipvs]`
* iprange is defined on apiserver :code:`kube-api-server --service-cluster-ip-range ipNet (default 10.0.0.0/24)`
* :code:`iptables -L -t nal | grep db-service`
* you can see it on kubeproxy logs

DNS in k8s
==========

* kubeadm deploy auto
* coreDNS manage names
* an entry is create for pod but not with the name, but with the ip
  * 10.244.2.5 => 10-244-2-5.apps.pod.cluster.local
* kubelet configure all pod to know where is the DNS
* :code:`host web-service`: give you the full fqdn and ip

Ingress
=======

* Ingress permit to translate request to a pod depending of the request
* You still need to expose it (load balancer on clouds)
* If you deploy an ingress solution (Nginx, haproxy, trafik, ...) as a redirect service, it s call an ingress controller

.. code-block:: yaml
  :name: nginx ingress controller

  apiVersion: extension/v1beta1
  kind: Deployment
  metadata.name: nginx-ingress-controller
  spec:
    replicas: 1
    selector:
      matchLabels:
        name: nginx-ingress
      template:
        metadata:
          name: nginx-ingress
        spec:
          containers:
          - name: nginx-ingress-controller
            image: quay.io/kubernetes-ingres-controller/nginx-ingree-controller:0.21.0
          args:
            - /nginx-ingress-controller
            - --configmap=${POD_NAMESPACE}/nginx-configuration
          env:
          - name: POD_NAME
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
          - name: POD_NAMESPACE
            valueFrom:
              fieldRef:
                fieldPath: metadata.namespace
          ports:
            - name: http
              containerPort: 80
            - name: https
              containerPort: 444
  ---
  apiVersion: v1
  kind: Service
  metadata.name: nginx-ingress
  spec:
    type: NodePort
    ports:
    - port: 80
      targetPort: 80
      protocol: TCP
      name: http
    - port: 443
      targetPort: 443
      protocol: TCP
      name: https
    selector:
      name: nginx-ingress
  ---
  apiVersion: v1
  kind: ServiceAccount
  metadata.name: nginx-ingress-serviceaccount

* ingress rules apply on ingress controller
  * forward all incoming trafic
  * forward incoming trafic based on the url
  * forward incoming trafic based on the domain name

.. code-block:: yaml
  :name: ingress conf forward every incomming to a service

  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata.name: ingress-wear
  spec:
    backend:
      serviceName: wear-service
      servicePort: 80

.. code-block:: yaml
  :name: ingress conf forward base on subdir

  ---
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: ingress-wear-watch
  spec:
    rules:
    - http:
        paths:
        - path: /wear
          pathType: Prefix
          backend:
            service:
              name: wear-service
              port:
                number: 8080
        - path: /watch
          pathType: Prefix
          backend:
            service:
              name: video-service
              port:
                number: 8080

.. code-block:: yaml
  :name: ingress conf forward base on host

  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    name: ingress-wear-watch
  spec:
    rules:
    - host: wear.my-online-store.com
      http:
        paths:
          - backend:
            serviceName: wear-service
            servicePort: 80
    - host: watch.my-online-store.com
      http:
        paths:
          - backend:
            serviceName: watch-service
            servicePort: 80

Design and install a k8s cluster
********************************

(218-223 = 6) 32min - 4h12

design
======

choose infrastructure
=====================

configure HA
============

* :code:`kube-controller-manager --leader-elect true --leader-elect-lease-durastion 15s --leader-elect-renew-deadlini 10s --leader-elect-retry-period 2s`
* get the etcd outside the master node

.. code-block:: ini
  :name: /etc/systemd/system/kube-apiserver.service

  [Service]
  ExecStart=/usr/local/bin/kube-apiserver \\
    --advertise-address=${INTERNAL_IP} \\
    --allow-priviledge=true \\
    --apiserver-count=3 \\
    --etcd-cafile=/var/lib/kubernetes/ca.pem \\
    --etcd-certfile=/var/lib/kubernetes/kubernetes.pem \\
    --etcd-keyfile=/var/lib/kubernetes/kubernetes.pem \\
    --etcd-servers=https://10.240.0.10:2379,https://10.240.0.11:2379

ETCD in HA
==========

* quorum = N/2 +1
* fault tolerance = N - Quorum

k8s the hard way
================

Install "k8s the kubeadm way"
*****************************

(224-229 = 6) 29min - 3h40

VM with vagrant
===============

* Step
  * install container runtime
  * install kubelet
  * install kubeadm
  * initialize master
  * deploy pod network
  * join worker node
* vagrant file: https://github.com/kodekloudhub/certified-kubernetes-administrator-course

Deploy with kubeadm
===================

* you need vagrant and virtualbox
* :code:`vagrant status`
* :code:`vagrant up`
* :code:`vagrant status`
* :code:`vagrant status ssh kubemaster`
* go on https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/

* :code:`kubeadm init --apiserver-cert-extra-sans=controlplane --apiserver-advertise-address=<controlplane ip adress on eth0> --pod-network-cidr=10.244.0.0/16`
* :code:`kubeadm init --apiserver-cert-extra-sans=controlplane --apiserver-advertise-address=10.2.223.3 --pod-network-cidr=10.244.0.0/16`

End to End Tests on a k8s cluster
*********************************

(230 = 1) 1min - 3h11

RIP

Troubleshooting
***************

(231-243 = 13) 1h - 3h10

Application faillure
====================

* :code:`curl http://<service-ip>:<service-port>`
* :code:`kubectl describe service web-service`: see event and ip adress
* :code:`kubectl logs web`
* :code:`kubectl logs web --previous`

Control Plane Failure
=====================

* :code:`kubectl get nods`
* :code:`service [kube-apiserver | kube-controller-manager | kube-scheduler | kubelet | kube-proxy] status`
* :code:`sudo journalctl -n kube-apiserver`
* :code:`kubectl logs kube-apiserver -n kube-system`

Worker Node Faillure
====================

* :code:`kubectl get nods`
* :code:`kubectl describe nods worker-1`: in condition section, status must be at True or False. If it is Unknown or something else, the node have a problem
* (on node) :code:`top`
* (on node) :code:`df -h`
* (on node) :code:`service kubelet status`
* (on node) :code:`sudo journalctl -n kubelet`
* (on node) :code:`openssl x509 -in /var/lib/kubelet/worker-1.crt -text`: check CA, Not After, group (0=system:nodes)

Network Troubleshooting
=======================

* check :code:`cni-bin-dir or network-plugin` in kubelet option
* coreDNS
  * composed by
    * service account (coredns)
    * cluster roles (coredns, kube-dns)
    * cluster roles binding (coredns, kube-dns)
    * deployment (coredns)
    * configmap (coredns)
    * service (coredns)
  * if coreDNS is pending: check if the network plugin is installed
  * :code:`kubectl -n kube-system get ep kube-dns`: check endpoint
  * :code:`systemd-resolved` ???
  * check resolv.conf (configure in kubelet)
* kubeproxy:
  * :code:`kubectl describe ds kube-proxy -n kube-system`
  * definition of clusterCIDR, kubeproxy mode, ipvs, iptables, bindaddress, kube-config etc
  * check
    * state
    * logs
    * configmap
    * process

Other Topics
************

(244-247 = 4) 12min - 2h10

Json Path
=========

* https://kodekloud.com/p/json-path-quiz
* https://mmumshad.github.io/json-path-quiz/index.html#!/?questions=questionskub1
* https://mmumshad.github.io/json-path-quiz/index.html#!/?questions=questionskub2

Advanced Kubectl
================

* :code:`kubectl get nodes -o wide`: have a bit more detail
* :code:`kubectl get nodes -o json`: have the raw answer
* Exemple:
  * :code:`kubectl get pods -o=jsonpath='{.items[0].spec.containers[0].image}'`
  * :code:`kubectl get pods -o=jsonpath='{.items[*].metadata.name}'`
  * :code:`kubectl get pods -o=jsonpath='{.items[*].status.nodeInfo.architecture}'`
  * :code:`kubectl get pods -o=jsonpath='{.items[*].status.capacity.cpu}'`
  * :code:`kubectl get pods -o=jsonpath='{.items[*].metadata.name}{.items[*].status.capacity.cpu}'`: you can merge query but it is ugly
  * :code:`kubectl get pods -o=jsonpath='{.items[*].metadata.name}{"\n"}{.items[*].status.capacity.cpu}'`: merge with lign return
  * :code:`kubectl get pods -o=jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.capacity.cpu}{"\n"}{end}'`: first example of range
  * :code:`kubectl get pods -o=custom-columns='NODE:.metadata.name,CPU:.status.capacity.cpu'`: you can custom column
  * :code:`kubectl get nodes --sort-by=.metadata.name`
  * :code:`kubectl config view --kubeconfig=/root/my-kube-config -o jsonpath={.users[*].name}`: browse kubeconfig
  * :code:`kubectl config view --kubeconfig=my-kube-config -o jsonpath="{.contexts[?(@.context.user=='aws-user')].name}" > /opt/outputs/aws-context-name`

jsonpath
========

* always return array of result
* :code:`$`: is the root element
* :code:`$.`: if the root element is a {}
* :code:`$[]`: if the root element is a []
* criteria
* :code:`$[?(@ > 40)]`: element > 40
* :code:`$[?(@ != 40)]`: element != 40
* :code:`$[?(@ == 40)]`: element == 40
* :code:`$[?(@ in [40, 41, 42])]`: element in the list
* :code:`$[?(@ nin [40, 41, 42])]`: element not in the list
* ex: :code:`$.car.wheel[?(@.location == 'front-right')]`
* wildcard
* :code:`$.*.color`: each color of each attirbut of the object
* :code:`$[*].color`: each color of each element of the array
* list
  * :code:`$[0, 3]`: 1st and 4th element
  * :code:`$[0:3]`: 1st to 3th element
  * :code:`$[0:8:2]`: 1st to 8th element with a step of 2
  * :code:`$[-1:0]` or :code:`$[-1:]`: last element
  * :code:`$[-3:]`: last element 3 element


Mock Exam
*********

(250-255 = 6) 1h56 - 1h57

Conclusion
**********

(256-258 = 3) 1min - 0h01

revoir les certificats et les etcd
role, pourquoi apigroup app et extension ?
clusterrolebinding
security capability
what is apiGroups in roles
network
what is network plugin in kubelet
volume de config map et de secret au niveau pod ? au niveau deploy