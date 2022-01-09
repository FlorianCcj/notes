k8s - Udemy - (CKAD) Kubernetes Certified Application Developer with Tests
##########################################################################

Recap Core Concepts
*******************

41/41

* PODs
  * list pod
  * create a pod
  * inpect po
  * understand what is the column :code:`Ready` in :code:`kubectl get pods`
* ReplicaSets
  * list pods
  * list replicaset
  * inspect replica set
  * edit and make it in
  * scale
* Deployments
  * list deploy
  * inspect deploy
  * create deploy, imperative way
* Namespaces
  * list namespace
  * list pods in namespace
  * create pod in namespace
  * find where is a pod accross ns
  * curl a svc in an other ns
* Imperative Commands
  * run a pod
  * run a pod with label
  * expose one pod
  * create deploy
  * create and expose a pod with one command` 

Configuration
*************

36/41

* Commands and Arguments
  * inspect pods and find launched command
  * edit a yaml file to add command
  * know how will work commad, entrypoint and args in deployment + dockerfile
* ConfigMaps
  * check env var in a pod
  * list config map
  * read a config map
  * create a config map
  * get config map value as env vars
* Secrets
  * list secret
  * create secret
  * load env vars from secret
* Security Contexts
  * check container user
  * launch a container with a specific user
  * add capabilities
* Resource Limits
  * check pod resource
  * edit resource
* Service Account
  * list service account
  * check the service account used by a pod
  * change service account of a pod
* Taints and Tolerations
  * check node s taint
  * apply a taint
  * create a pod with toleration
  * remove a taint
* Node Affinity
  * check nodes labels
  * apply a label on a node
  * apply node affinity on a deployment

Multi-Container PODs
********************

28/41

* Multi-Container PODs
  * inspect container in pods
  * create multi container pod
  * add a sidecar to scrap logs
* Readiness Probes
  * apply a readiness probe to a pod
  * apply a liveness probe to a pod
* Logging
* Monitoring

POD Design
**********

24/41

* Labels and Selectors
  * list po by label
* Rolling Updates & Rollbacks
  * Know how rolling update and recreate strategy work
* Jobs and CronJobs
  * create a job
  * update backoff limit
  * parallelism jobs
  * create a cronjob

Services & Networking
*********************

21/41

* Kubernetes Services
  * list svc
  * expose a deployment
* Network Policies
  * inpect a netpoll
  * create a netpol
* Ingress Networking - 1
  * find the ingress controller
  * list ingress
  * inspect ingress
  * add path to an ingress
  * create an ingress

State Persistence
*****************

17/41

* Persistent Volumes
  * create a volume
  * create a pv
  * create a pvc
  * inspect pv/pvc status
  * bind a pvc to a pod
* Storage Class
  * list storage class
  * use storage class

Lightning Labs
**************

* Lightning Lab - 1
  * create a PV, a PVC and mount it on a pod
  * troubleshoot why incoming and outcomming trafic do not go to a pod
  * with a default netpol denying all trafic, open incomming trafic to a pod
  * create a pod launching a script which depend of a value in configmap, the script write in a file which is in a volume
  * create a deployment with specific rollingupdate strategy, update it, then rollback
  * create a deployment with a pod woth a label and 2 volumes: 1 emptydir 2 a configmap, and expose it on port 6379
* Lightning Lab - 2
  * troubleshoot a readinessProbe and create a livenessProbe
  * create a cronjob with specific backoffLimit and timeout
  * create a pod in a specific namespace, schedule on controleplane and mounting a secret
  * create an ingress
  * inspect pod log

Mock Exams
**********

* Mock Exam - 1
  * create a pod
  * create a ns
  * create a deploy with specific replicas
  * deploy a pod with a specific label
  * troubleshoot a replicaset
  * expose a pod
  * update a pod env var
  * create a configmap
  * create a secret
  * update a pod to run it as root and give capabilities
  * create a PersistentVolume
  * create a pod and give access to this pod to all those with a specific tag and not to other
  * create a multicontainer pod
* Mock Exam - 2
  * create a deployment and expose it as nodeport
  * add a taint to a node and create a pod which can be deploy on it
  * add label to a node and deploy a pod with node affinity to target it
  * create an ingress
  * add readinessProbe with delay and period
  * create a job with specific completion, add backofflimit
  * create a pvc

Updates for Sep 2021 Changes
****************************

* Practice test Docker Images
* Practice Test KubeConfig
* Practice Test Role Based Access Controls
* Labs - Admission Controllers
  * check which default admission controller are active
  * check which admission controller are added
* Labs - Validating and Mutating Admission Controllers
  * create a tls secret
* Lab - API Versions/Deprecations
  * identify shortname
  * convert an old yaml file to a new one
* Practice Test - Deployment strategies
  * increase deployment replica
  * decrease deployment replica
* Labs - Install Helm
* Labs - Helm Concepts
  * search a chart

Game of pod
***********

* bravo
  * create pvs with hostpath
  * create pvcs
  * run pod with volume (pvc)
  * create secreate
* pento
  * troubleshoot apiserver
  * troubleshoot kubeconfig
  * drain node
  * create pv,pvc
  * deploy server file application
* redis island
  * create pv
  * create sts
  * create service
  * use pvc template
  * change mountpath mode
* tyro
  * create deployment
  * create role and rolebinding
  * create pv and pvc
