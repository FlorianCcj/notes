k8s - Udemy - (CKAD) Kubernetes Certified Application Developer with Tests
##########################################################################

DEVOPS15 to have 15% discount

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

Core Concept
************

26 9-34
1h48 12h22

K8s archi
=========

* master: manage the cluster
* component:
  * Apiserver
  * etcd
  * scheduler
  * controller
  * container runtime
  * kubelet

Pod
===

* smalest object managable
* scalable to manage trafic
* during scaling can be deploy on other node
* a pod can have multi container
* :code:`kubectl run nginx --image=nginx`
* :code:`kubectl get pod`

Pod with yaml
=============

.. code-block:: yaml
  :name: base yaml

  apiVersion:
  kind:
  metadata:
  spec:

.. code-block:: yaml
  :name: pod yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      tier: frontend
  spec:
    containers:
    - name: myapp
      image: busybox

* :code:`kubectl apply -f myapp.po.yaml`
* :code:`kubectl get pods`
* :code:`kubectl describe pods myapp-pod`

Edit pod
========

* :code:`kubectl get pod <pod name> -o yaml > mypod.yaml`
* :code:`kubectl edit pod <pod name>`

Replicasets
===========

.. code-block:: yaml
  :name: replicaset template yaml

  apiVersion: v1
  kind: ReplicaSet
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      tier: frontend
  spec:
    replicas: 5
    template:
      HERE POD DEFINITION

.. code-block:: yaml
  :name: replica set yaml

  apiVersion: v1
  kind: ReplicaSet
  metadata:
    name: myapp-rs
  spec:
    replicas: 5
    selector:
      matchLabels:
        name: myapp-pod
    template:
      metadata:
        name: myapp-pod
        labels:
          app: myapp
          tier: frontend
      spec:
        containers:
        - name: myapp
          image: busybox

* :code:`kubectl apply -f myapp-rs.yaml`
* scale: :code:`kubectl scale --replicas=6 rs myapp-rs`

Deployment
==========

.. code-block:: yaml
  :name: deployment yaml

  apiVersion: v1
  kind: Deployment
  metadata:
    name: myapp-rs
  spec:
    replicas: 5
    selector:
      matchLabels:
        name: myapp-pod
    template:
      metadata:
        name: myapp-pod
        labels:
          app: myapp
          tier: frontend
      spec:
        containers:
        - name: myapp
          image: busybox

Kubectl output format
=====================

* :code:`kubectl get pod -o wide`
* :code:`kubectl get pod -o json`
* :code:`kubectl get pod -o yaml`
* :code:`kubectl get pod -o name`

Namespace
=========

kubectl get namespace
kubectl create namespace <namespace name>

Imperative command
==================

Configuration
*************

32 35-66
1h55 10h34

Command and argument
====================

* entrypoint (docker) -> command (k8s)
* command (docker)    -> args (k8s)

.. code-block:: yaml
  :name: command and args yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      tier: frontend
  spec:
    containers:
    - name: myapp
      image: busybox
      command:
      - sleep
      args:
      - "10"

Editing pods and deployment
===========================

* You can only edit a pod on:
  * :code:`spec.containers[*].image`
  * :code:`spec.initContainers[*].image`
  * :code:`spec.activeDeadlineSeconds`
  * :code:`spec.tolerations`

env vars
========

.. code-block:: yaml
  :name: env vars in pod

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      tier: frontend
  spec:
    containers:
    - name: myapp
      image: busybox
      env:
      - name: APP_COLOR
        value: pink
      # or
      - name: APP_COLOR
          valueFrom:
            configMapKeyRef:
              name: app-cm
              key: APP_COLOR
      # or
      - name: APP_COLOR
          valueFrom:
            secretKeyRef:
              name: app-sec
              key: HOST_DB
      # or
      envFrom:
      - configMapRef:
          name: app-cm
      # or
      envFrom:
      - secretRef:
          name: app-sec

config map
==========

* :code:`kubectl create configmap app-cm --from-literal=APP_COLOR=pink`
* :code:`kubectl create configmap app-cm --from-file=app_config.properties`

.. code-block:: ini
  :name: app_config.properties

  APP_COLOR: blue
  APP_MODE: prod

.. code-block:: yaml
  :name: config map yaml

  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: app-config
  data:
    APP_COLOR: green


.. code-block:: yaml
  :name: config map in volume

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      tier: frontend
  spec:
    containers:
    - name: myapp
      image: busybox
    # you can have cm in volume to
    volumes:
    - name: app-config-volume
      configMap:
        name: app-cm

secrets
=======

* :code:`kubectl create secret generic app-sec --from-literal=DB_HOST=pink`
* :code:`kubectl create secret generic app-sec --from-file=app_config.properties`
* If you do it as yaml file, values have to be base64


.. code-block:: yaml
  :name: secret as volume

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      tier: frontend
  spec:
    containers:
    - name: myapp
      image: busybox
    # create a file for each secret on /opt/<secret name>-volumes
    volumes:
    - name: app-config-volume
      secret:
        secretName: app-sec

docker security
===============

* :code:`kubectl create secret docker-registry reg-cred --docker-server= --docker-username= --docker-password= --docker-email=`
* list of capabilities on /usr/include/linux/capability.h

security context
================

.. code-block:: yaml
  :name: security context in pod

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      tier: frontend
  spec:
    securityContext:
      runAsUser: 1002
    containers:
    - name: myapp
      image: busybox
      securityContext:
        runAsUser: 1001
        # only on continer, not global
        capabilities:
          add: ["MAC_ADMIN"]

Service account
===============

* service account can be use for user or for bot
* namespace s service account is automaticly mount on each pod

.. code-block:: yaml
  :name: service account in pod

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      tier: frontend
  spec:
    serviceAccountName: dashboard-sa
    # automountServiceAccountToken: false
    containers:
    - name: myapp
      image: busybox

Quota
=====

.. code-block:: yaml
  :name: resource limitation in pod

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
      tier: frontend
  spec:
    containers:
    - name: myapp
      image: busybox
      resources:
        requests:
          memory: 1Gi
          cpu: 1
        limits:
          memory: 2Gi
          cpu: 2

Taint and toleration
====================

* :code:`kubectl taint nodes node01 key(=value):effect(-)`
* :code:`kubectl taint nodes node01 spray=mortein:NoSchedule`: add taint
* :code:`kubectl taint nodes node01 spray=mortein:NoSchedule-`: remove taint
* effect:
  * NoSchedule
  * PreferNoSchedule
  * NoExecute

.. code-block:: yaml
  :name: taint in pod

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
  spec:
    containers:
    - name: myapp
      image: busybox
    tolerations:
    - key: "spray"
      operator: "Equals"
      vaule: "mortein"
      effect: "NoSchedule"

Node selector and node affinity
===============================

* :code:`kubectl label nodes node01 size=Large`

.. code-block:: yaml
  :name: node selector in pod

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
  spec:
    containers:
    - name: myapp
      image: busybox
    # Node selector
    nodeSelector:
      size: Large
    # Node affinity
    affinity:
      nodeAffinity:
      # preferredDuringSchedulingIgnoredDuringExecution:
      # (planned)requiredDuringSchedulingRequiredDuringExecution:
        requiredDuringSchedulingIgnoredDuringExecution:
        - matcheExpressions:
          - key: size
            operator: In
            value:
            # Permit to say or
            - Large
            - Bigger
          # Permit to say and
          - key: size
            operator: NotIn # Permit to say not
            value:
            - Small
          - key: size
            operator: Exists

Multi-Container PODs
********************

3 67-69
15mni - 8h39

.. code-block:: yaml
  :name: multicontainer pod

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
  spec:
    containers:
    - name: myapp
      image: busybox
    - name: sidecar
      image: busybox

Observability
*************

9 70-78
24min - 8h24

Readiness and liveness probe
============================

* pod condition
  * PodScheduled
  * Initialized
  * ContainerReady
  * Ready
* readiness:
  * what to check to be sure the service is runable
  * is ready to accept request
* liveness
  * to kube need to restart the pod ?

.. code-block:: yaml
  :name: readiness probe

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
  spec:
    containers:
    - name: myapp
      image: busybox
      ports:
      - containerPort: 8080
      readinessProbe:
        httpGet:
          path: /api/ready
          port: 8080
        #
        tcpSocket:
          port: 3306
        #
          exec:
            command:
            - cat
            - /app/is_ready

.. code-block:: yaml
  :name: liveness probe

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
  spec:
    containers:
    - name: myapp
      image: busybox
      livenessProbe:
        initialSelaySeconds: 10
        periodSeconds: 5
        failureThreshold: 8
        httpGet:
          path: /api/ready
          port: 8080
        #
        tcpSocket:
          port: 3306
        #
          exec:
            command:
            - cat
            - /app/is_ready

Container Logging
=================

* :code:`kubectl logs - my-pod`

Monitor and Debug app
=====================

* metrics-server to see metric node,pod
* :code:`kubectl top pod`

POD Design
**********

11 79-89
55min - 8h00

Labels, selectors and annotations
=================================

.. code-block:: yaml
  :name: labels pod

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
    annotations:
      buildVersion: 1.34
  spec:
    containers:
    - name: myapp
      image: busybox

* :code:`kubectl get po -l app=myapp`
* :code:`kubectl get po -l env=prod,tier=frontend`
* :code:`kubectl get po -l env=prod -l env=dev`

Rolling Update
==============

* :code:`kubectl rollout status deploy myapp-deploy`
* :code:`kubectl rollout history deploy myapp-deploy`
* :code:`kubectl set image deploy myapp-deploy nginx=nginx:1.9.1`
* :code:`kubectl rollout undo deploy myapp-deploy`
* replicat set is kept
* :code:`kubectl rollout history deployment nginx --revision=1`: see this revision modif
* :code:`kubectl set image deployment nginx nginx=nginx:1.17 --record`
  * :code:`--record`: save the command use in rollout history

Jobs
====

.. code-block:: yaml
  :name: fake job yaml

  apiVersion: v1
  kind: Pod
  metadata:
    name: math-pod
  spec:
    containers:
    - name: math-add
      image: ubuntu
      command: ['expr', '3', '+', '2']
    restartPolicy: Never # default: Always

.. code-block:: yaml
  :name: job yaml

  apiVersion: batch/v1
  kind: Jod
  metadata:
    name: math-add-job
  spec:
    # not mandatory
    # how much do it have to run
    # will launch as many job as needed until 3 success
    completions: 3
    parallelism: 3
    # mandatory
    template:
      spec:
        containers:
        - name: random-error
          image: kodekloud/random-error
        restartPolicy: Never # default: Always

CronJobs
========


.. code-block:: yaml
  :name: cronjob yaml

  apiVersion: batch/v1beta1
  kind: CronJod
  metadata:
    name: reporting-cron-job
  spec:
    # minute jour "day of the month" month "day of the week"
    schedule: "*/1 * * * *"
    jobTemplate:
      spec:
        completions: 3
        parallelism: 3
        template:
          spec:
            containers:
            - name: reporting-tool
              image: reporting-tool
            restartPolicy: Never

Services & Networking
*********************

15 90-104
1h41 - 7h05

Service
=======

* NodePort
* ClusterIP
* Loadbalancer
* 2 or 3 ports in use
  * Port
  * TargetPort
  * (NodePort)

Ingress Networking
==================

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

Rewrite-target option
=====================

Network policies
================

* ingress: trafic which enter the pod
* egress: trafic which go out the pod
* communication
  * all allow (default)
* support on
  * kube-router
  * calico
  * romnana
  * weave-net
* not support on
  * Flannel
* if you define a net pol, it block all trafic

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

State Persistence
*****************

14 105-117
1h - 5h24

Volume
======

.. code-block:: yaml
  :name: pod with volume

  apiVersion: v1
  kind: Pod
  metadata:
    name: random-number-generator
  spec:
    containers:
    - name: alpine
      image: alpine
      command: ["/bin/sh", "-c"]
      args: ["shuf -i 0-100 -n 1 >> /opt/numer.out;"]
      volumeMounts:
      - mountPath: /opt
    volumes:
    - name: data-volume
      hostPath:
        path: /data
        type: Directory

Persistent Volume
=================

* access mode:
  * ReadOnlyMany
  * ReadWriteOnce
  * ReadWriteMany

.. code-block:: yaml
  :name: pv

  apiVersion: v1
  kind: PersistentVolume
  metadata:
    :name: pv-vol1
  spec:
    accessModes:
    - ReadWriteOnce
    capacity:
      storage: 1Gi
    hostPath:
      path: /tmp/data

Persistent Volume Claim
=======================

* criteria
  * sufficient capacity
  * access mode
  * volume modes
  * storage class
* to target a specific volume use :code:`labels.name: my-pv` and :code:`selector.matchLabels.name: my-pv`
* you can choose :code:`persistentVolumeReclaimPolicy` value:
  * :code:`Retain`
  * :code:`Delete`
  * :code:`Recycle`

.. code-block:: yaml
  :name: pvc

  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: myClaim
  spec:
    accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi

PVC in Pods
===========

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
  spec:

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


Statefull sets
==============

* replica deployment are ordered

.. code-block:: yaml
  :name: sts yaml

  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: mysql
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: mysql
    template:
      metadata:
        name: mysql
        labels:
          app: mysql
      spec:
        containers:
        - name: mysql
          image: mysql
    # diff with deploy
    serviceName: mysql-h
    podManagementPolicy: Parallel # don t care about ordering deployment

Headless Services
=================

* create dns entry for each replica
  * :code:`<podname>.<headless-servicename>.<namespace>.svc.<cluster-domain.example>`
  * :code:`mysql-0.mysql-h.default.svc.cluster.local`

.. code-block:: yaml
  :name: headless service

  apiVersion: v1
  kind: Service
  metadata:
    name: mysql-h
  spec:
    ports:
    - port: 3306
    selector:
      app: mysql
    clusterIP: None

.. code-block:: yaml
  :name: pod with headless service

  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: mysql
  spec:
    containers:
    - name: mysql
      image: mysql
    subdomain: mysql-h
    hostname: mysql-pod # if you put it on deployment, each replica will have the same name

Storage in Statefull sets
=========================

* each replica will share the same pvc
* to generate different PV to different instance of replica you need volumeclaime template

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
    name: mysql
    labels:
      app: mysql
  spec:
    replicas: 3
    selector:
      matchLabels:
        labels:
          app: mysql
    template:
      metadata:
        labels:
          app: mysql
      spec:
        containers:
        - name: mysql
          image: mysql
          volumeMount:
          - name: data-volume
            mountPath: /var/lib/mysql
    volumeClaimTemplates:
    - metadata:
        name: data-volume
      spec:
        accessModes:
        - ReadWriteOnce
        storageClassName: google-storage
        resources:
          requests:
            storage: 500Mi


Update for 2021.09 Changes
**************************

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
  spec:

30 118-147
2h12 - 4h24

Define, build and modify container images
=========================================

.. code-block:: Dockerfile

  FROM Ubuntu

  RUN apt-get update
  RUN apt-get install python

  RUN pip install flask
  RUN pip install flask-mysal

  COPY . /opt/source-code

  ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run

* :code:`docker build Dockerfile -t mmumshad/my-custom-app`
* :code:`docker push mmumshad/my-custom-app`
* :code:`docker history mmumshad/my-custom-app`

Labs - Practice test Docker Images
==================================

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
  spec:

Authentication, Authorization and Admission Control
===================================================

* node
* kube-apiserver
  * who
  * what can they do

KubeConfig
==========

* :code:`curl https://my-kube-playground:6443/api/v1/pods --key admin.key --cert admin.crt --cacert ca.crt`

.. code-block:: yaml

  apiVersion: v1
  kind: Config
  users:
  - name: my-kube-admin
    user:
      client-certificate: admin.crt
      client-key: admin.key
  clusters:
  - name: my-kube-playground
    cluster:
      certificate-authority:
      server: https://my-kube-playground:6443
  contexts:
  - name: my-kube-playground@my-kube-admin
    context:
      cluster: my-kube-playground
      user: my-kube-admin

* :code:`kubectl config view`
* :code:`kubectl config use-context prod-user@production`
* for each crt you can add :code:`-data` and add the full cert base64


Labs - Practice Test KubeConfig
===============================

API Groups
==========

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

Role Based Access Controls
==========================

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

Cluster Roles
=============


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

Labs - Practice Test Role Based Access Controls
===============================================

Admission Controllers
=====================

* authent
* authorization
* admission controllers
  * can restrict auth
    * only auth image from a registry
    * do not allow latest image
    * do not allow run as root
  * example:
    * AlwaysPullImages
    * DefaultStorageClass
    * EventRateLimit
    * NamespaceExists
    * ...
  * to active: in kube-apiserver :code:`--enable-admission-plugins=NodeRestriction,NamespaceAutoProvision`
  * to unactive: in kube-apiserver :code:`--disable-admission-plugins=DefaultStorageClass`
* finally create pod
* default activate: :code:`kube-apiserver -h | grep enable-admission-plugins`
* default activate: :code:`kubectl -n kube-system exec -it kube-apiserver-controlplane -- kube-apiserver -h | grep enable-admission-plugins`

Labs - Admission Controllers
============================

Validating and Mutating Admission Controllers
=============================================

* Validating Admission Controllers: NamespaceExists
* Mutating Admission Controllers: NamespaceAutoProvision
* Call :code:`Admission Webhook Server` with a :code:`AdmissionReview` resources
* Respond with :code:`{"apiVersion": "admission.k8s.io/v1", "kind": "AdmissionReview", "response":{"uid": "<value from request.uid>", "allowed": true}}`
* https://github.com/kubernetes/kubernetes/blob/v1.13.0/test/images/webhook/main.go
* mutating are called before validatinf webhook

.. code-block:: go
  :name: webhook server

  @app.route("/validate", methods=["POST"])
  def validate():
    object_name = request.json["request"]["object"]["metadata"]["name"]
    user_name = request.json["request"]["userInfo"]["name"]
    status = True
    if object_name == user_name:
      message = "You can't create objects with your own name"
      status = False
    return jsonify(
      {
        "response": {
          "allowed": status,
          "uid": request.json["request"]["uid"],
          "status": {"message": message}
        }
      }
    )

    @app.route("/mutate", methods=["POST"])
    def mutate():
      user_name = request.json["request"]["userInfo"]["name"]
      patch = [{"op": "add", "path": "/metadata/labels/users", "value": user_name}]
      return jsonify(
        {
          "response": {
            "allowed": True,
            "uid": request.json["request"]["uid"],
            "patch": base64.b64encode(patch),
            "patchtype": "JSONPatch"
          }
        }
      )

* Configure Admission Webhook

.. code-block:: yaml
  :name: admission webhook configuration

  apiVersion: admissionregistration.k8s.io/v1
  kind: ValidatingWebhookConfiguration
  metadata:
    name: "pod-policy.example.com"
  webhooks:
    name: "pod-policy.example.com"
    clientConfig:
      url: "https://external-server.example.com"
      # or
      service:
        namespace: "webhook-namespace"
        name: "webhook-service"
      caBundle: "Ci0tLS0tQk...tLS0K"
    rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      operations: ["CREATE"]
      resources: ["pods"]
      scope: "Namespaced"

Labs - Validating and Mutating Admission Controllers
====================================================

* just after apigroup
* alpha:
  * Enable: No, can enable via flags
  * Tests: may lack e2e tests
  * Reliability: May have bugs
  * Support: No Commitment. May be dropped later
  * Audience: Expert Users interested in giving early feedback
* beta:
  * Enable: Yes by default
  * Tests: has e2e tests
  * Reliability: May have minor bugs
  * Support: Commits to complete the feature and move to GA.
  * Audience: Users interested in beta testing and providing feedback

API Versions
============

* API Deprecation Policy Rule #4a: Other than the most recent API version in each track, older API version must be supported after their announcement deprecation for a duration of no less than
  * GA: 12 month or 3 releases (whichever is longer)
  * Beta: 9 month or 3 releases (whichever is longer)
  * Alpha: 0 releases

* :code:`kubectl convert -f <old-file> --output-version <new-api>`
* :code:`kubectl convert -f nginx.yaml --output-version app/v1`

API Deprecations
================

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
  spec:

Lab - API Versions/Deprecations
===============================

Custom Resource Definition
==========================

* controller do 2 thing: monitor, change

.. code-block:: yaml
  :name: CRD

  apiVersion: apiextensions.k8s.io/v1
  kind: CustomResourceDefinition
  metadata:
    name: flighttickets.flights.com
  spec:
    scope: Namespaced
    group: flights.com
    names:
      kind: FlightTicket
      singular: flightticket
      plural: flighttickets
      shortname:
      - ft
    versions:
    - name: v1
      served: true
      storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              from:
                type: string
              to:
                type: string
              number:
                type: integer
                minimum: 1
                maximum: 10

Custom Controllers
==================

.. code-block:: go
  :name: flightticket_controller.go

  package flightticket

  var controllerKind *
  apps.SchemeGroupVersion.WithKind("Flightticket")

  // < Code hidden >

  // Run begins watching and syncing
  func (dc *FlightTicketController) Run(workers int, stopCh <-chan struct{})

  // < Code hidden >
  // Call BookFlightAPIReplicaSet
  func (dc *FlightTicketController) callBookFlightAPI(obj interface{})

  // < A lot of code hidden >

* :code:`git clone https://github.com/kubernetes/sample-controller`
* :code:`cd sample-controller`
* :code:`go build -o sample-controller .`
* :code:`./sample-controller -kubeconfig=$HOME/.kube/config`

Operator Framework
==================

* CRD + Custom controller = Operator
* List of all of this in https://operatorhub.io

Deployment Strategy - Blue Green
================================

* old=blue, new=green
* deploy all the green pod and when all the pod are running, switch the trafic to the green pod
* how to
  * create a new deployment, with the new version
  * when all pod are ok, change service selector to the new pods

Deployment Strategy - Canary
============================

* only a pourcentage of the trafic go to the new version. When it is ok, 100% go
* how to
  * create a 2nd deployment with the new version
  * label the 2 deployments with the same label
  * change the svc target to this label
  * you will a 50% on each
  * to reduce the %, reduce the number of pod on the 2nd version

Labs - Practice Test - Deployment strategies
============================================

Helm Introduction
=================

* Wordpress 5 yaml file
  * deploy
  * secret
  * PV
  * service
  * PVC
* DO NOT put all file one after another ...
* :code:`helm install wordpress ...`
* :code:`helm upgrade wordpress ...`
* :code:`helm rollback wordpress ...`
* :code:`helm uninstall wordpress ...`

Labs - Install Helm
===================

Helm Concepts
=============

* Put all your yaml file in a templates dir
* change value that you want to variabilize by :code:`{{ .Value.image }}` or :code:`{{ .Value.<var name> }}`

.. code-block:: yaml
  :name: Chart.yaml

  apiVersion: v2
  name: Wordpress
  version: 9.0.3
  description: Web publishing platform for building blogs and websites
  keywords:
    - wordpress
    - cms
    - blog
    - http
    - web
    - application
  home: http://www.wordpress.com/
  sources:
    - https://hithub.com/bitnami/bitnami-docker-wordpress
  maintainers:
    - email: containers@bitnami.com
      name: Bitnami

* artifacthub.com
* :code:`helm search hub wordpress`
* :code:`helm repo add bitnami https://charts.bitnami.com/bitnami`
* :code:`helm search repo wordpress`
* :code:`helm repo list`
* :code:`helm install [release-name] [chart-name]`
* :code:`helm list`
* :code:`helm pull --untar bitnami/wordpress`
* :code:`helm install release-4 ./wordpress`

Labs - Helm Concepts
====================

Additional Practice - Game of Pods
**********************************

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
  spec:

2 148-149
8 min - 2h12

Certification Tips
******************

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
  spec:

2 150-151
6 min - 2h04

Lighting Labs
*************

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
  spec:

5 152-156
53min - 1h58

Mock Exam
*********

.. code-block:: yaml

  apiVersion:
  kind:
  metadata:
  spec:

6 157-162
1h05
