Yaml is optional
****************

:source: https://www.cncf.io/webinars/yaml-is-optional-app-developers-k8s-options/
date: 11/06/2019
presentators use: Buildpacks

tech: what it solve

* brigade.js: Integrating  CI deeper zith k8s, and opens  the doors to `git push` w
orkflow
* metaparticle: the need to learn Dockerfile and k8s YAML formats, lowering the lea
rning curve
* isipod: configs are important part of code, and need testing. A single language u
sed for Dockerfile, k8s resources, and pushing code
* Cloud Native Application Bundle: how to organize containers into a logical app in
a platform and vendor neutral way
* Rudr (OAM): conway s Law. The communication structure  of your org can be reflect
ed in YAML to improve collaboration between dev and ops roles.
* Buildpacks: the needs to learn about containers, or k8s resources. Git as the sou
rce of truth for your platform
* Tilt: the need for fast feedback loops as devs are writting new code, or debuggin
g eisting code
* Admission controller: reduces the number of fields devs have to remember to fill
in on their YAML files
* helm: providing a menu of options for devs to choose from, per org. Basic lifecyc
le
* ksonnet: how to manage multi-cluster, multi-env, multiplicatively complex config
scenarios. Keep your configs DRY
* Kustomize: how to manage YAML complexity while still remaining Declarative. Keep
your configs DRY

Sumary:
1. Kubernetes is a "space shuttle" design
2. There is a plethora of dev-focused tools
3. No one tool does it all
4. Some tools reduce the amount of YAML
5. Others obviate YAML all together
6. To make K8S approachable to devs we need to combine multiple approchas
