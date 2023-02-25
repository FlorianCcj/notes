k8s - Udemy - CKA - sum up
##########################

* manual scheduling: :code:`pod.spec.nodeName`

.. code-block:: yaml
  :name: change pod s node

  apiVersion: v1
  kind: Binding
  metadata:
    name: myapp-pod
  target:
    apiVersion: v1
    kind: Node
    name: node3

* in svc, :code:`spec.selector` do not take :code:`matchLabels`
* :code:`kubectl` filter:
  * :code:`kubectl get pods --selector app=App1`
  * :code:`kubectl get pods -l app=App1,tier=coucou`
* taint and toleration
  * * :code:`kubectl taint nodes node1 app=jenkins-worker:NoSchedule`
  * * :code:`kubectl taint nodes node1 app=jenkins-worker:NoSchedule-`
  * NoSchedule: will not be schedule on the node
  * PreferNoSchedule: will try to avoid to not schedule on this node
  * NoExecute: NoSchedule + if already existing, will be evicted (killed)

.. code-block:: yaml
  :name: tolerations in pod spec

  tolerations:
  - key: "app"
    operator: "Equal"
    value: "blue"
    effect: "NoSchedule"

* :code:`kubectl label nodes node1 size=Large`

.. code-block:: yaml
  :name: node selector in pod spec

  nodeSelector:
    size: Large

.. code-block:: yaml
  :name: node affinity in pod spec

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

* Namespace default resources

.. code-block:: yaml
  :name: limite range on ns

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

* custom static pod on kubelet setting
  * :code:`--pod-manifest-path=/etc/kubernetes/manifests`
  * :code:`staticPodPath: /etc/kubernetes/manifests`
* specify scheduler :code:`schedulerName: my-custom-scheduler`
* rolling update
  * :code:`kubectl rollout status deployment/myapp-deployment`
  * :code:`kubectl rollout history deployment/myapp-deployment`
  * :code:`kubectl rollout undo deployment/myapp-deployment`

.. code-block:: yaml
  :name: envvars

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

* configmap
  * :code:`kubectl create configmap app-config --from-literal=APP_CONFIG=blue --from-literal=APP_MODE=prod`
  * :code:`kubectl create configmap app-config --from-file=app_config.properties`

.. code-block:: yaml
  :name: app_config.properties

  APP_COLOR: blue
  APP_MODE: prod

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

* envvars from cm or secret

.. code-block:: yaml
  :name: env vars load from a file

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
      # or
      #- secretRef:
      #    name: app-secret

* volume from cm

.. code-block:: yaml
  :name: volume from cm

  # push a config map as a volume (as for conf file)
  apiVersion: v1
  kind: Pod
  metadata:
    name: simple-webapp-color
  spec:
    containers:
    - image: simple-webapp-color
      name: simple-webapp-color
      volumes:
      - name: app-config-volume
        configMap:
          name: app-config
      volumeMounts:
      - name: secret-volume
        readOnly: true
        mountPath: "/etc/secret-volume"

* kubeadm
  * don t forget to drain, cordon, uncordon
  * :code:`apt-get upgrade -y kubeadm=1.12.0-00`
  * :code:`kubeadm upgrade plan`
  * :code:`kubeadm upgrade apply v1.12.0`
  * :code:`apt-get upgrade -y kubelet=1.12.0-00`
  * :code:`systemctl restart kubelet`

* etcd
  * :code:`export ETCDCTL_API=3`
  * :code:`etcdctl snapshot save snapshot.db `
    * :code:`--endpoints=https://127.0.0.1:2379`
    * :code:`--cacert=/etc/etcd/ca.crt`
    * :code:`--cert=/etc/etcd/etcd-server.crt`
    * :code:`--key=/etc/etcd/etcd-server.key`
  * :code:`etcdctl snapshot restore --data-dir /var/lib/etcd-from-backup`
* TLS
* :code:`openssl genrsa -out my-bank.key 1024`
* :code:`openssl rsa -in my-bank.key -pubout > mybank.key`
* :code:`openssl req -new -key my-bank.key -out my-bank.csr -subj "/C=US/ST=CA/O=MyOrg, Inc./CN=my-bank.com"`
* certs:
  * who use server cert: apiserver, etcd, kubelet
  * who use client cert: admin user, scheduler, controller manager, proxy, api server
  * which CA do we have: control plane, etcd
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
  * kube-apiservier certificate
    * :code:`openssl genrsa -out apiserver.key 2048`
    * :code:`openssl req -new -key apiserver.key -subj "/CN=kube-apiserver" -out apiserver.csr`
    * :code:`openssl req -new -key apiserver.key -subj "/CN=kube-apiserver" -out apiserver.csr --config openssl.cnf`
    * :code:`openssl x509 -req -in adminserver.csr -CA ca.crt -CAkey ca.key -out apiserver.crt`: sign certificat

.. code-block:: yaml
  :name: kubeconfig with certificate

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

* CRS
  * :code:`kubectl certificate approve jane`
  * :code:`kubectl certificate deny jane`

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

* API Groups
  * :code:`curl https://kube-master:6443/version`
  * :code:`curl https://kube-master:6443/api/v1/pods`
  * :code:`curl https://kube-master:6443/api/v1/{namespaces, pods, rc, events, endpoints, nodes, bindings, PV, PVC, configmaps, secrets, services}`
  * :code:`kubectl proxy`: make a proxy on your computer to curl the apiserver

TODO RBAC command

* :code:`serviceAccountName: dashboard-sa`: precise pod s service account (in spec)
* :code:`automountServiceAccountToken: false`: do not mount serviceaccount in pod

.. code-block:: yaml
  :name: private registry authent

  imagePullSecrets:
  - name: regCred

* :code:`kubectl create secret docker-registry regcred --docker-server=private-registry.io --docker-username=registry-user --docker-password=registry-password --docker-email=registry-user@org.com`

.. code-block:: yaml
  :name: runasuser

  spec:
    securityContext:
      runAsUser: 1000
      # capabilities only at container lvl not pod lvl
      capabilities:
        add: ["MAC_ADMIN"]

TODO netpol

* Volume

.. code-block:: yaml
  :name: volume hostpath

  spec:
    containers:
    - name: alpine
      volumeMounts:
      - mountPath: /opt
        name: data-volume
    volumes:
    - name: data-volume
      # not recommand on multi node cluster ... data is not shared
      hostPath:
        path: /data
        type: Directory

.. code-block:: yaml
  :name: pv

  apiVersion: v1
  kind: PersistentVolume
  metadata:
    name: pv-vol1
  spec:
    accessModes:
      - ReadWriteOnce # value: ReadOnlyMany, ReadWriteOnce, ReadWriteMany
    capacity:
      storage: 1Gi
    # or replace with storage provider
    volumeMode: Filesystem
    hostPath:
      path: /tmp/data
    persistentVolumeReclaimPolicy: Retain # Delete, Recycle, default Retain

.. code-block:: yaml
  :name: pvc

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

.. code-block:: yaml
  :name: pvc in pod

  volumes:
  - name: mypd
    persistentVolumeClaim:
      claimName: myclaim

.. code-block:: yaml
  :name: storage class file

  apiVersion: storage.k8s.io/v1
  kind: StorageClass
  metadata.name: google-storage
  provisioner: kubernetes.io/gce-pd
  volumeBindingMode: WaitForFirstConsumer # not mandatory

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

TODO Networking
