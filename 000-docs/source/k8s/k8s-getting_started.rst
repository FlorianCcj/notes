k8s - Getting started
#####################

Command
*******

export KUBECONFIg=~/.kube/config:~/.kube/kubeconfig2
kubctl apply -f yaml1 -f yaml2
kubctl apply -R -f .
kubectl explain pods
kubectl explain crd

kubectl get apiservice
k api-resources

kubectl delete ns boring-ns --grace-period=0 --force

kubectl get boring-ns -o json > tmp.json
# remove kubernetes line
curl -k -H "Content-Type: application/json" -X PUT --data-binary @tmp.json https://kubernetes-cluster-ip/api/v1/namespaces/boring-ns/finalize

kubectl config set-context --current --namespace=<insert-namespace-name-here>
kubectl config view --minify | grep namespace:

Controle Plane
**************

* kube-apiserver
* kube-controller-manager
* kube-scheduler.

Non master node

* kubelet: which communicates with the Kubernetes Master.
* kube-proxy: a network proxy which reflects Kubernetes networking services on each node

Deployment
**********

How to rollback: :code:`kubectl rollout undo deployment.v1.apps/nginx-deployment`
Scale: kubectl scale deployment.v1.apps/nginx-deployment --replicas=10

K8S Object
**********

* clusterrole
* ingress
* daemonset
* statefull
* serviceaccount
* endpoint
* node
* networkpolicies
* podesecuritypolicy
* all
* rolebinding
* replicaset
* namespace
* deployement
* service
* crd

* k get apiservices
* k api-resources

Kubelet PLEG: Pod Lifecycle Event Generator
*******************************************

* https://github.com/kubernetes/community/blob/master/contributors/design-proposals/node/pod-lifecycle-event-generator.md

Labels
******

Recommanded:
https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/

Log
****

Audit: https://kubernetes.io/docs/tasks/debug-application-cluster/audit/

Rights
******

RBAC
Pod security policy
network policy
Image policy
Label policy

Network policies
================


TODO: note netpol doc
https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy/
https://kubernetes.io/docs/concepts/services-networking/network-policies/

RBAC
====

no negation, purely additional
scope:
* namespace, node, control plane
target:
* user,
* group of user,
* "extra",
* is the request is for API ressource
* the request path

object:
* Role, Cluster Role, RoleBinding, ClusterRoleBinding

.. code-block:: yaml

    kind: Role
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
      namespace: default
      name: pod-reader
    rules:
    - apiGroups: [""] # "" indicates the core API group
      resources: ["pods"]
      verbs: ["get". "watch", "list"]

.. code-block:: yaml

    # allow jane to read pods in ns default
    kind: RoleBinding
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
      meta: read-pods
      namespace: default
      subjects:
      - kind: User
        name: jane
        apiGroup: rbac.authorization.k8s.io
    roleRef:
      kind: role
      name: pod-reader
      apiGroup: rbac.authorization.k8s.io

.. code-block:: yaml

    kind: ClusterRole
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
      # "namespace" omitted since ClusterRoleare not namespace
      name: secret-reader
      rules:
        - apiGroup: [""]
          resources: ["secrets"]
          verbs: ["get", "watch", "list"]

.. code-block:: yaml

    # this role binding allow dave to read secret in ns dev
    kind: RoleBinding
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
      name: read-secret
      namespace: dev
    subjects:
    - kind: User
      name: Dave
      apiGroup: rbac.authorization.k8s.io
    roleRef:
      kind: ClusterRole
      name: secret-reader
      apiGroup: rbac.authorization.k8s.io

.. code-block:: yaml

    This clusterRoleBinding allows anyone in the manager group to read secrets in any namespace

TODO: note k8s auth
====================

* https://kubernetes.io/docs/reference/access-authn-authz/authorization/
* https://kubernetes.io/blog/2016/08/kubernetes-namespaces-use-cases-insights/

Tools
*****

https://kubezilla.com/tools/
http://dockerlabs.collabnix.com/kubernetes/kubetools/

https://www.codetogether.com/
https://repl.it
gitpod

kube alias
kubens kubectx
k9s
rsyslog
skafold
fio (sudo apt-get install fio)
fio --name TEST --eta-newline=5s --filename=temp.file --rw=randread --size=2g --io_size=10g --blocksize=4k --ioengine=libaio --fsync=1 --iodepth=1 --direct=1 --numjobs=32 --runtime=60 --group_reporting
https://fio.readthedocs.io/en/latest/fio_doc.html

.. code-block:: txt
  :name: fio job file

  ; Read 4 files with aio at different depths
  [global]
  ioengine=libaio
  buffered=0
  rw=randread
  bs=128k
  size=512m
  directory=/data1

  [file1]
  iodepth=4

  [file2]
  iodepth=32

  [file3]
  iodepth=8

  [file4]
  iodepth=16

.. code-block:: bash

    KUBECONFIG=~/.kube/config
    KUBECONFIG=${KUBECONFIG}:~/.kube/rancher-prod/kube_config_master_config_file.yaml

    export PATH=~/.kubectx:PATH
    export PATH=~/Software/bin:PATH

    alias k="kubectl "
    alias watch="watch "
    alias kctx="kubectx"
    alias kns="kubens"

    export https_proxy=http://internet.corp.thales:8080
    export http_proxy=http://internet.corp.thales:8080
    export proxy=internet.corp.thales:8080
    export no_proxy=.thales,10.111.0.0/16

* https://www.bing.com/videos/search?q=prometheus+operator+service+monitor&&view=detail&mid=F1E66C7A634304DF364BF1E66C7A634304DF364B&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Dprometheus%2Boperator%2Bservice%2Bmonitor%26qpvt%3Dprometheus%2Boperator%2Bservice%2Bmonitor%26FORM%3DVDRE
* https://kubernetes.io/fr/docs/reference/kubectl/cheatsheet/

Good to know
************

* https://caylent.com/50-useful-kubernetes-tools-for-2020-part-2

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2020.07.12 | V1.0    | Begin note                                                         |
+------------+---------+--------------------------------------------------------------------+
