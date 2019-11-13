Yaml is optional
****************

:source: https://www.cncf.io/webinars/yaml-is-optional-app-developers-k8s-options/
date: 11/06/2019
presentators use: Buildpacks

tech: what it solve

* brigade.js: Integrating  CI deeper zith k8s, and opens  the doors to `git push` workflow
* metaparticle: the need to learn Dockerfile and k8s YAML formats, lowering the learning curve
* isipod: configs are important part of code, and need testing. A single language used for Dockerfile, k8s resources, and pushing code
* Cloud Native Application Bundle: how to organize containers into a logical app ina platform and vendor neutral way
* Rudr (OAM): conway s Law. The communication structure  of your org can be reflected in YAML to improve collaboration between dev and ops roles.
* Buildpacks: the needs to learn about containers, or k8s resources. Git as the source of truth for your platform
* Tilt: the need for fast feedback loops as devs are writting new code, or debugging eisting code
* Admission controller: reduces the number of fields devs have to remember to fill in on their YAML files
* helm: providing a menu of options for devs to choose from, per org. Basic lifecycle
* ksonnet: how to manage multi-cluster, multi-env, multiplicatively complex config scenarios. Keep your configs DRY
* Kustomize: how to manage YAML complexity while still remaining Declarative. Keep your configs DRY

Sumary:
1. Kubernetes is a "space shuttle" design
2. There is a plethora of dev-focused tools
3. No one tool does it all
4. Some tools reduce the amount of YAML
5. Others obviate YAML all together
6. To make K8S approachable to devs we need to combine multiple approchas

The Do’s and Don’t for Securing Container and Cloud Native Technologies
***********************************************************************

:source: https://www.cncf.io/webinars/the-dos-and-dont-for-securing-container-and-cloud-native-technologies/
date: 10/31/2019

CIA Triad: confidenciality, Integrity, Availability
Service Mesh in the center of all

Secure Defaults - Native
========================

* Namespace: a way to divide resources
* Network policy: ingress and egress rules
* Pod security policy: min reqs to be accepted
* security context: applies to all container in the pod
* AppArmor: Protect and reduce attack surface
* Disable default services: Least Privilege
* Certificate Management: Self-signed w/ kubeadm
* Back-Ups: Encrypt Them!

Production access
=================

* Who needs ? why ?
* RBAC
* Risk Based Alerts: Event/Action or Time

Security Ecosystem
==================

* Trusted images (latest?)
* Security scanning (OS): Clair, Klar

Build time consideration
========================

* Application Security
    * Secure Coding Practices
    * SAST/DAST
* Image scanning on Build/Pull
    * Vuln Management
    * SCA - Software Composition Analysis
* Image Signing
* Attack Surface Reduction
    * Multi-Stage Builds

Deply time consideration
========================

* Image registries
* Vuln management
    * Regular scan
    * Maintain deployment info
* RBAC - Limit User Privileges
* Configure Manager
    * Open APIs
* Secret Management Integration
* Traffic Segregation

Run time concideration
======================

* Host Protecting
* Hardening
    * CIS Benchmarks
    * Container-Friendly Hosts
* Network Segregation
    * Protects APIs
* Container Firewalls
* Activity Monitoring, logging and Auditing
* Patching and Vuln Tracking

Tooling
=======

* Continius Integration
    * pre-commit: Real-time SAST in IDE pre-commit checks
    * commit: incremental SAST
    * build: SCA, SAST (deeper level)
* Continious Delivery and Deployment
    * Test: IAST, DAST, fuzz testing, hardening, checks
    * Staging: Stability, Perf, Reliability, an Secure Testing
    * Deploy/Production: Monitoring, pen testing, red teaming

anchore, openSCAP, sysdig falco, Clair, Snyk, LinkerD, Dagda

* DO
    * crejate immutable container
    * run images only from trusted sources
    * use container-native monitoring tools
* NOT DO
    * installing an OS inside a Docker Container 
    * running unnecesssary service
    * Storing critical data inside container
    * hard coded credential for accessing registry
    * hosting too many services inside a container

Container Native Development Tools Compared: Draft, Skaffold, and Tilt
**********************************************************************

:source: https://www.cncf.io/webinars/container-native-dev-tools-draft-skaffold-tilt/
date: 10/30/2019

Brigade: Scripting Container Workflows on Kubernetes
****************************************************

:source: https://www.cncf.io/webinars/brigade-scripting-container-workflows-on-kubernetes/
date: 10/28/2019

what is it ?

* framework for event-driven scripting in k8s
* extremely lightweigth, k8s native
* chain together containers to create workflow

Why JS (but eample in GO, NodejJS, Bash and Python)

* most popular language
* rich ecosystem of tools
* extremely flexible

Share data between containers

* pass to the container (command, env variable, files)
* get from the container (STDOUT, exit codes, files)

event

* webhook
* git/container registry event
* k8s event

..code-block:: javascript

    // 01-hello.js

    const { events, Job } = require("@brigadecore/brigadier");

    events.on("someEvent", (data) => {
        var program = Job("one", "alpine:3.5");
        program.tasks = ["echo hello", "echo goodbye"];
        program.env = { "Key": "value" };

        program.run();
    });

..code-block:: javascript

    // 02-hello.js

    const { events, Job } = require("@brigadecore/brigadier");

    events.on("someEvent", (data) => {
        var hello = new Job('hello', 'alpine', ['echo Hello', 'echo World']);
        var goodbye = new Job('hello', 'alpine', ['echo Goodbye', 'echo World']);

        hello.run();
        goodbye.run();
    });

..code-block:: javascript

    // 03-groups.js

    const { events, Job, Group } = require("@brigadecore/brigadier");

    events.on("someEvent", (data) => {
        var hello = new Job('hello', 'alpine', ['echo Hello', 'echo World']);
        var goodbye = new Job('hello', 'alpine', ['echo Goodbye', 'echo World']);

        Group.runEach([hello, goodbye]);
    });

..code-block:: javascript

    // 04-async.js

    const { events, Job } = require("@brigadecore/brigadier");

    events.on("exec", exec);
    
    async function exec(e, p) {
        let j1 = new Job('j1', 'alpine', ['echo hello']);
        let j2 = new Job('j2', 'alpine', ['echo goodbye']);

        await j1.run();
        await j2.run();

        console.log('done');
    }

..code-block:: javascript

    // 05-build-storage.js

    const { events, Job, Group } = require("@brigadecore/brigadier");

    events.on("exec", (e, p) => {
        var dest = 'mnt/brigade/share/hello.txt';
        var one = new Job('one', 'alpine', ['echo hello > ' + dest]);
        var two = new Job('two', 'alpine', ['echo world >> ' + dest]);
        var three = new Job('three', 'alpine', ['cat ' + dest]);

        one.storage.enabled = true;
        two.storage.enabled = true;
        three.storage.enabled = true;

        Group.runEach([one, two, three])
    });

..code-block:: javascript

    // 06-job-cache.js

    const { events, Job } = require("@brigadecore/brigadier");

    events.on("exec", (e, p) => {
        var job = new Job('cacher', 'alpine');
        job.cache.enabled = true;

        job.tasks = [
            'echo ' + e.buildID + ' >> /mnt/brigade/cache/jobs.txt',
            'cat /mnt/brigade/cache/jobs.txt'
        ];

        job.run();
    });

..code-block:: javascript

    // 07-return-values.js

    const { events, Job } = require("@brigadecore/brigadier");

    events.on("exec", (e, p) => {
        var one = new Job('one', 'alpine');
        var two = new Job('two', 'alpine');

        one.tasks = ['echo world'];
        onr.run().then(result -> {
            two.tasks = ['echo hello ' + result.toString()];
            two.run().then(result2 => {
                console.log(result2.toString());
            });
        });
    });
    
Uses cases

* foundation for opinated CICD systems
* application security scanning
* aggregation + analyzing data from multiple systems and building reports
* creating preview environments on K8S for pull requests
* processing orders, connecting to external services
* actual CICD, integration with Github Checks API, Bitbucket, Gitlab
* any potential container workflow on k8s that would benefit from actual language features (as opposed to being constrained by YAML)

docs.brigade.sh

TL; DR
* Brigade is a cluster scripting environment that allow you to chain multiple containers and create worflows and pipeline
* lightweight, and work on any K8s cluster
* write script in basic JS, bash, python, go
* brigade is a k8s application - you can manage and monitor it the same way as any other application
* Brigade is a CNCF Sandbox Project, stable at v1.2

Backup and Mobility for Kubernetes Applications
***********************************************

:source: https://www.cncf.io/webinars/backup-and-mobility-for-kubernetes-applications/
date: 10/23/2019

kasten-io

k8s stateful application

* application includes data services - all in k8s
* application and data services in k8s - separate namespace
* application uses outside of k8s

key:
* automation: automated discovery and operations. Avoiding manual actions that will not scale and error prone
* schedule and policies: retention schedules to ensure compliance and prevent storage costs from adding up
* security and encryption: Authentication, authoriation and encrypted at rest and in-flight keeping your data safe
* flexibility: support for all environment and data service types making your applications truly portable

oparate at scale: multi-cloud, òulti-cluster, multi-team, multi-app

https://blog.kasten.io/posts/flavors-of-data-management-in-kubernetes/

