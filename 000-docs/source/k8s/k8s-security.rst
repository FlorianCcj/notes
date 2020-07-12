k8s - security
##############

Vuln scan
*********

Classical image scan
=====================

* scan in regeistry or in pipeline
* pre detection
* fast return to developer
* pipeline auto return that dev mustn t use some images
* prevent vulnerable pods from being delpoyed

but

* require preliminary integrations
* external repository & sidecars
* inefficient process
* new vuln can be found after deployment
* k8s infra may be vulnerable too

Portshift/Kubei ?

* Scan all runtime images
* detect malicious pods and provide an extra layer of security to your cluster
* scan public images you use that are not hostet in your registry
* gain visibility into k8s elements which suffer from occasional vuln
* get accurate, real-time status of your cluster s health

Role Based Acces Control
************************

* security context: root ? priviledge ?
* role/perm: the few perm is the better
* secret

RBAC:

* subjects
* API Resources
* Operations (Verbs)

* Role: API resources, Verbs
* Role binding: Subejct, Role

Pod Security Policy
*******************

Attack anatomy:

* Upon vuln exploit, attacker will check what perm/actions can be made on what resources
* attackers will move from the breached container to the host in order to get eposure to more containers sharing the same host
* attacker will try to move additional nodes or cluster resource to maximize the exhilaration potential

Pods Security Policy: Controls security sensitive aspects of pod specifitation, define a set of condition that a pod MUST run with in order to be accepted

Network policies: Life Outside the cluster
******************************************

Manage

* which pods can accesd outside resource
* inter cluster communication

See service mesh

Master
******


Service Mesh
************

Service mesh permit to extend cluster to non-kubernetes elements

tips
* Create a virtual pod within a existing nnamespace (for mTLS)
* Create installer that copies the certificatite and additional settings to the VM
* the installer install SM expansion and proxy sidecar on the VM
* Be sure that the new service can be access by the cluster services

LinkerD
=======

Cover

* Observability: success rates, latencies, throuput, service topologies, distributed and ad-hoc tracing
* Connectivity: Load balancingm retries, timeouts, multi-cluster
* Security: Transparant mTLS, cert management and rotationm policy

Designed

* 0-config
* minimal latency and resource overhead
* k8s first
* Controle plane ~200mb RSS (excuding prometheus)
* Data plane < 20mb RSS
* /!\ Really fast. Not as fast as 'no service mesh'

Peak-EWMA HTTP/gRPC Balancing

* bypassess kube8proxy
* efficiently distributes requests accross
* client-side: no centrilized balancer state
* Latency aware: Automatically optimizes for locality
* \backed by k8s Services
* No app changes

Service Mesh Interface: SMI is a spec that covers the most common service mesh capabilities

* Traffic policy: apply policies like identity and transport encryption accross services
* Trafic telemetry: capture key metrics like error rate and latency between svc
* Traffic management: shift traffic etween different svc

Source
******

* https://www.cncf.io/webinars/stay-on-top-of-ongoing-kubernetes-security-hygiene/
* https://www.youtube.com/watch?time_continue=1&v=OfoppsRb7dE&feature=emb_logo

Go futher
=========

https://portshift.io/runtime-kubernetes-scanning-kubei
https://www.portshift.io/blog/kubernetes-multi-cluster-service-mesh
https://www.portshift.io/blog/psp-kubernetes-security/


Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2020.07.12 | V1.0    | Begin note                                                         |
+------------+---------+--------------------------------------------------------------------+
