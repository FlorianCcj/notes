Notes Exo
#########

CKAD
****

Lighting Lab 1
==============

Exo1
----

po, pv, pvc, volume

Create a Persistent Volume called logger-volume. It should make use a storage class name host-data. It should use RWX as the access mode and have a size of 500Mi. The volume should use the hostPath /opt/volumes/log
Next, create a PVC called logger-claim requesting a minimum of 200Mi of storage. This PVC should bind to logger-volume.
Mount this in a pod called logger at the location /var/www/nginx. This pod should use the image nginx:alpine.

Exo2
----

netpol

After deploying a pod, nobody can access it. Troubleshoot it

Make sure that incoming connection from the pod webapp-color are successful.

Exo3
----

cm, command, ns, po, volume

Create a pod called time-check in the timer-ns namespace. This pod should run a container called checker that uses the busybox image.
Create a config map called check-config with the data TIME_FREQ=10 in the same namespace.
The checker container should run the command: while true; do date; sleep $TIME_FREQ;done and write the result to the location /opt/time/time-check.log.
The path /opt/time on the pod should mount a volume that lasts the lifetime of this pod.

Exo4
----

deploy, RollingUpdate

Create a new deployment called nginx-deploy, with a container called nginx, image nginx:1.16 and 3 replicas. The deployment should use RollingUpdate strategy with maxSurge=1, and maxUnavailable=1.
Next upgrade the deployment to version 1.17.
Finally, once all pods are updated, undo the update and go back to the previous version.

Exo5
----

cm, deploy, multicontainer, resources, svc, volume

Create a redis deployment with the following parameters:
Name of the deployment should be redis using the redis:alpine image. It should have exactly 1 replica.
The container should request for .2 CPU. It should use the label app=redis.
It should mount exactly 2 volumes.

a. An Empty directory volume called data at path /redis-master-data.
b. A configmap volume called redis-config at path /redis-master.
c. The container should expose the port 6379.

Lighting Lab 2
==============

Exo1
----

livenessprobe, ns, readynessprobe

We have deployed a few pods in this cluster in various namespaces. Inspect them and identify the pod which is not in a Ready state. Troubleshoot and fix the issue.

Next, add a check to restart the container on the same pod if the command ls /var/www/html/file_check fails. This check should start after a delay of 10 seconds and run every 60 seconds.

Exo2
----

cj

Create a cronjob called dice that runs every one minute. Use the Pod template located at /root/throw-a-dice. The image throw-dice randomly returns a value between 1 and 6. The result of 6 is considered success and all others are failure.
The job should be non-parallel and complete the task once. Use a backoffLimit of 25.
If the task is not completed within 20 seconds the job should fail and pods should be terminated.

Exo3
----

command, nodeSelector, ns, po, secret, volume

Create a pod called my-busybox in the dev2406 namespace using the busybox image. The container should be called secret and should sleep for 3600 seconds.

The container should mount a read-only secret volume called secret-volume at the path /etc/secret-volume. The secret being mounted has already been created for you and is called dotfile-secret.

Make sure that the pod is scheduled on controlplane and no other node in the cluster.

Exo4
----

ing

Create a single ingress resource called ingress-vh-routing. The resource should route HTTP traffic to multiple hostnames as specified below:
* The service video-service should be accessible on http://watch.ecom-store.com:30093/video
* The service apparels-service should be accessible on http://apparels.ecom-store.com:30093/wear
* Here 30093 is the port used by the Ingress Controller

Exo5
----

log

A pod called dev-pod-dind-878516 has been deployed in the default namespace. Inspect the logs for the container called log-x and redirect the warnings to /opt/dind-878516_logs.txt on the controlplane node

Mock Exam 1
===========

Exo01
-----

po

Deploy a pod named nginx-448839 using the nginx:alpine image.

Exo02
-----

ns

Create a namespace named zertyuiopoiuytreza

Exo03
-----

deploy

Create a new Deployment named httpd-frontend with 3 replicas using image httpd:2.4-alpine

Exo04
-----

deploy

Deploy a messaging pod using the redis:alpine image with the labels set to tier=msg.

Exo05
-----

rs, troubleshoot

A replicaset rs-d2 is created. However the pods are not coming up. Identify and fix the issue.

Once fixed, ensure the ReplicaSet has 4 Ready replicas.

Exo06
-----

svc

Create a service messaging-service to expose the redis deployment in the marketing namespace within the cluster on port 6379.

Use imperative commands

Exo07
-----

envvars

Update the environment variable on the pod webapp-color to use a green background.

Exo08
-----

cm

Create a new ConfigMap named cm-3392845. Use the spec given on the below.

* ConfigName Name: cm-xxx
* Data: DB_NAME=SQLxxx
* Data: DB_HOST=sqlxxx.mycompany.com
* Data: DB_PORT=3306

Exo09
-----

secret

Create a new Secret named db-secret-xxdf with the data given (on the below).

* Secret Name: db-secret-xxdf
* Secret 1: DB_Host=sql01
* Secret 2: DB_User=root
* Secret 3: DB_Password=password123

Exo10
-----

securityContext

Update pod app-sec-kff3345 to run as Root user and with the SYS_TIME capability.

Exo11
-----

logs

Export the logs of the e-com-1123 pod to the file /opt/outputs/e-com-1123.logs

Exo12
-----

pv

Create a Persistent Volume with the given specification.

* Volume Name: pv-analytics
* Storage: 100Mi
* Access modes: ReadWriteMany
* Host Path: /pv/data-analytics

Exo13
-----

deploy, netpol, svc

Create a redis deployment using the image redis:alpine with 1 replica and label app=redis. Expose it via a ClusterIP service called redis on port 6379. Create a new Ingress Type NetworkPolicy called redis-access which allows only the pods with label access=redis to access the deployment.

Exo14
-----

po, command, envvars

Create a Pod called sega with two containers:

Container 1: Name tails with image busybox and command: sleep 3600.
Container 2: Name sonic with image nginx and Environment variable: NGINX_PORT with the value 8080.

Mock Exam 2
===========

Exo01
-----

deploy, svc

Create a deployment called my-webapp with image: nginx, label tier:frontend and 2 replicas. Expose the deployment as a NodePort service with name front-end-service , port: 80 and NodePort: 30083

Exo02
-----

taint, toleration

Add a taint to the node node01 of the cluster. Use the specification below: key: app_type, value: alpha and effect: NoSchedule
Create a pod called alpha, image: redis with toleration to node01.

Exo03
-----

nodeAffinity

Apply a label app_type=beta to node controlplane. Create a new deployment called beta-apps with image: nginx and replicas: 3. Set Node Affinity to the deployment to place the PODs on controlplane only.

Exo04
-----

ing

Create a new Ingress Resource for the service: my-video-service to be made available at the URL: http://toto.com:33000/pay.

Exo05
-----

readinessProbe

We have deployed a new pod called pod-with-rprobe. This Pod has an initial delay before it is Ready. Update the newly created pod pod-with-rprobe with a readinessProbe using the given spec

Exo06
-----

po, livenessProbe

Create a new pod called nginx1401 in the default namespace with the image nginx. Add a livenessProbe to the container to restart it if the command ls /var/www/html/probe fails. This check should start after a delay of 10 seconds and run every 60 seconds.

Exo07
-----

job

Create a job called whalesay with image docker/whalesay and command "cowsay I am going to ace CKAD!".
* completions: 10
* backoffLimit: 6
* restartPolicy: Never

Exo08
-----

command, envvars, multicontainer, po

Create a pod called multi-pod with two containers.
* Container 1:
  * name: jupiter, image: nginx
* Container 2:
  * name: europa, image: busybox
  * command: sleep 4800

Environment Variables:
* Container 1:
  * type: planet
* Container 2:
  * type: moon

Exo09
-----

pv

Create a PersistentVolume called custom-volume with size: 50MiB reclaim policy:retain, Access Modes: ReadWriteMany and hostPath: /opt/data

CKA
****

Lighting Lab 1
==============

Exo1
----

cluster upgrade

Upgrade the current version of kubernetes from 1.19 to 1.20.0 exactly using the kubeadm utility. Make sure that the upgrade is carried out one node at a time starting with the master node. To minimize downtime, the deployment gold-nginx should be rescheduled on an alternate node before upgrading each node.

Upgrade controlplane node first and drain node node01 before upgrading it. Pods for gold-nginx should run on the controlplane node subsequently.

Exo2
----

custom columns, jsonpath

Print the names of all deployments in the admin2406 namespace in the following format:
DEPLOYMENT CONTAINER_IMAGE READY_REPLICAS NAMESPACE
<deployment name> <container image used> <ready replica count> <Namespace>
. The data should be sorted by the increasing order of the deployment name.

Write the result to the file /opt/admin2406_data.

Exo3
----

kubeconfig, troubleshoot

A kubeconfig file called admin.kubeconfig has been created in /root/CKA. There is something wrong with the configuration. Troubleshoot and fix it.

Exo4
----

deploy, RollingUpdate

Create a new deployment called nginx-deploy, with image nginx:1.16 and 1 replica. Next upgrade the deployment to version 1.17 using rolling update

Exo5
----

troubleshoot, pv, pvc, volume

A new deployment called alpha-mysql has been deployed in the alpha namespace. However, the pods are not running. Troubleshoot and fix the issue. The deployment should make use of the persistent volume alpha-pv to be mounted at /var/lib/mysql and should use the environment variable MYSQL_ALLOW_EMPTY_PASSWORD=1 to make use of an empty root password.

Exo6
----

etcd

Take the backup of ETCD at the location /opt/etcd-backup.db on the controlplane node.

Exo7
----

po, secret, volume

Create a pod called secret-1401 in the admin1401 namespace using the busybox image. The container within the pod should be called secret-admin and should sleep for 4800 seconds.

The container should mount a read-only secret volume called secret-volume at the path /etc/secret-volume. The secret being mounted has already been created for you and is called dotfile-secret.

Mock Exam 1
===========

Exo01
-----

po

Deploy a pod named nginx-pod using the nginx:alpine image.

Exo02
-----

po, label

Deploy a messaging pod using the redis:alpine image with the labels set to tier=msg.

Exo04
-----

kubectl output format

Get the list of nodes in JSON format and store it in a file at /opt/outputs/nodes-z3444kd9.json.

Exo05
-----

svc

Create a service messaging-service to expose the messaging application within the cluster on port 6379.

Use imperative commands.

Exo06
-----

deploy

Create a deployment named web-app using the image kodekloud/webapp-color with 2 replicas.

Exo07
-----

static pod, command

Create a static pod named static-busybox on the controlplane node that uses the busybox image and the command sleep 1000.

Exo08
-----

po, ns

Create a POD in the finance namespace named temp-bus with the image redis:alpine.

Exo09
-----

troubleshoot

A new application orange is deployed. There is something wrong with it. Identify and fix the issue.

Exo10
-----

svc

Expose the web-app as service web-app-service application on port 30082 on the nodes on the cluster.

The web application listens on port 8080.

Exo11
-----

kubectl output format

Use JSON PATH query to retrieve the osImages of all the nodes and store it in a file /opt/outputs/nodes_os.txt.

The osImages are under the nodeInfo section under status of each node.

Exo12
-----

pv

Create a Persistent Volume with the given specification.
* Volume Name: pv-analytics
* Storage: 100Mi
* Access modes: ReadWriteMany
* Host Path: /pv/data-analytics

Mock Exam 2
===========

Exo01
-----

Take a backup of etcd cluster and save it to /opt/etcd-backup.db.

Exo02
-----

Create a Pod called redis-storage with image: redis:alpine with a Volume of type emptyDir that lasts for the life of the Pod and mount on /data/redis

Exo03
-----

Create a new pod called super-user-pod with image busybox:1.28. Allow the pod to be able to set system_time.

The container should sleep for 4800 seconds.

Exo04
-----

A pod definition file is created at /root/CKA/use-pv.yaml. Make use of this manifest file and mount the persistent volume called pv-1. Ensure the pod is running and the PV is bound.

* mountPath: /data
* persistentVolumeClaim Name: my-pvc

Exo05
-----

Create a new deployment called nginx-deploy, with image nginx:1.16 and 1 replica. Next upgrade the deployment to version 1.17 using rolling update.

Exo06
-----

Create a new user called john. Grant him access to the cluster. John should have permission to create, list, get, update and delete pods in the development namespace . The private key exists in the location: /root/CKA/john.key and csr at /root/CKA/john.csr.

Exo07
-----

Create a nginx pod called nginx-resolver using image nginx, expose it internally with a service called nginx-resolver-service. Test that you are able to look up the service and pod names from within the cluster. Use the image: busybox:1.28 for dns lookup. Record results in /root/CKA/nginx.svc and /root/CKA/nginx.pod

Exo08
-----

Create a static pod on node01 called nginx-critical with image nginx and make sure that it is recreated/restarted automatically in case of a failure.

Mock Exam 3
===========
