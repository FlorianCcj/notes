k8s - Udemy - CKA - exercises
#############################

PO
****

* (imp) run a pod pod1 with bad image
* (imp) change image of pod1
* delete pod1
* list the pods
* list container in a pod
* check  why a container in a pod is not running (testable with a bad image)
* inspect containers image in a pod
* (dec) create a yaml file to deploy a pod with a image
* run a with labels

RS
****

* list RS
* check how many replica a rs want
* check the image deploy in the pod managed in the rs
* how many pod are ready in the rs
* delete a pod to observe replica effect
* check resource api compatible in the cluster (explain/api-resource)
* FIX: a replicaset yaml file
  * apiversion
  * selector and label do not match
* delete rs from resource
* delete rs from file
* FIX already deploy rs with wrong image, observe what happened to pods
* (imp) scale
* (imp) scale by edition
* (dec) scale

deploy
******

* list deploy
* fix deploy
  * wrong image
  * kind without capitalize
* (imp) create deploy: image + replica

ns
****

* list ns
* list pod in a ns
* create pod in a ns
* find pod accross all ns
* access a pod in the same ns
* access a pod in an other ns

svc
****

* list svc
* identify svc type, port, target port, labels
* list endpoint
* expose a deploy
* run a pod AND expose it with a single command

Scheduling
**********

* identify/inspect scheduler
* schedule po on a node (no taint no affinity)
* schedule a pod on a taint node
* kubectl with filter
* taint and toleration
  * list node
  * list node and label
  * check if there is taint on a node
  * taint a node
  * create a pod with toleration
  * untaint node
* affinity
  * label a node
  * define an affinity
* quota
  * know pod s quota
* ds
  * list ds
  * deploy a log ds
* static po
  * identify static pod
  * deploy a static po

Log
****

* deploy a full directory
* deploy a full directory and subdirectory
* sort :code:`get no` by cpu consuption
* inspect logs from a pod
* inspect logs from a container in a multicontainer pod

Lifecycle
*********

* how work rolling update
* how to read rolling update paramter details
* change update strategy
* use attribut :code:`command` and :code:`args`
* config map
  * check pod s envvars
  * read a configmap
  * create a configmap
  * use configmap as env vars in a pod
* secret
  * know how work default ns SA and his secret
  * use secret as env vars in a pod
* multicontainer pod
  * see pod s container name
  * create multicontainer pod
  * enter in a container in a pod
  * check init container
  * create initcontainer

Maintenance
***********

* check in which node is your app
* drain a node
* identify pod which is not managed by rc, rs, ds, job, sts or deploy
* cordon/uncordon node
* update a cluster with kubeadm
* check etcd version
* backup an etcd
  * find etcd adress to contact it
  * find cert, key and cacert
* check a cluster after maintainance
* restore a backup
  * do not forget to change etcd volume

Security
********

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
* CSR
  * create a kube CSR
  * aproove,deny a csr
* kubeconfig
  * know where is the default kubeconfig
  * set current context
* RBAC
  * check cluster authorization mode
  * list role
  * check role right
  * try to launch command as a specific user
  * create role and rolebinding to give right to an user
* ClusterRole
  * list sluster role
  * create and bind ClusterRole to give node administration to someone
  * check if a user have the right to do something without having the user in kubeconfig
* ServiceAccount
  * list sa
  * give custom service account to a deployment
* Image Security
  * create secret to authent registry
  * give registry auth to a deployment
* Security context
  * check with which user you launch a container
  * launch a pod with a specific user
* NetPol
  * list netpol
  * check all netpol target in one command
  * create netpol ingress
  * create netpol egress

Storage
*******

* configure a hostpath volume
* create a pv
* create a pvc
* add pvc to a pod
* know how work each reclaim policiy

Network
*******

* list internal node ip
* find the network interface which connect the cluster
* find a node s mac adresse from the master
* describe on which node port which service is connect
* find which port have the more client connection
* idenftify network plugin
* list all binary support by the plugin
* identify which CNI plugin is configured
* identify which binary will be execute by CNI plugin
* weave
  * Identify the name of the bridge network/interface created by the CNI Plugin
  * identify the ip range
* identify node ip range
* identify pod ip range
* identify svc ip range
* ingress
  * read an ingress configuration
  * write an ingress configuration

Install
*******

* install a cluster from kubeadm

Troubleshoot
************

Mock exam
*********

* Mock 1
  * Run a pod with specific image and label in a specific ns
  * Create ns
  * Format kubectl output
  * Expose a pod, inside the cluster, with nodeport
  * Create a deploy with specific image and number of replicas
  * Create Static pod with command
  * Fix pod deployment
  * Get node s osImage with jsonpath
  * Create a PV
* Mock 2
  * Backup etcd
  * Create pod with emptyDir volume
  * Create pod with specific capability
  * Create pod and a pvc to use a specific pv
  * Create a deploy and update it with rolling update
  * Create user give him right to get, list, edit pod in specific namespace
  * Lookup a pod and a service
  * Create static pod
* Mock 3
  * Create SA and give him right to list pv
  * Use a specific SA in a pod
  * List Node s InternalIP, format it 
  * Create multicontainer pod with env vars
  * Create pod run as specific user
  * Create a netpol ingress
  * Add taint to a node and create a pod with toleration
  * Run a pod with specific image and label in a specific ns
  * Fix a kubeconfig
  * Fix depoy scalling
