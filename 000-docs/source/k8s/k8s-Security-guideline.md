# k8s - Security - guideline

## Code security

### Software Composition Analysis

SCA is an automated process that identifies the open source software in a codebase. This analysis is performed to evaluate security, license compliance, and code quality.

Multiple application permit to analyze:

- Checkmarx
- Dependency Track
- npm-audit
- OWASP
- SNYK
- Sonatype
- Trivy
- VeraCode

### Static Application Security Testing

SAST, or static analysis, also known as white box testing, is a testing methodology that analyzes source code to find security vulnerabilities

Multiple application permit to analyze:

- Checkmarx
- Codacy
- Find Security Bug
- Grammatech
- Phpcs-security-audit
- PMD
- SNYK
- Sonarqube
- Trivy
- Veracode

## Container Security

If you build a container, there is multiple security good practice to follow

- One only process in the container
- Process not running as root
- [OCI annotations]
- Check container installed package (anchore, trivy, tuf, snyk)

### Container Static Analyze

To check if rules are followed. I do not know if there tools which do it on static image

### Container Signing

After Scanning your container there is application which will sign to certify that your container is safe

- Sigstore
- Notary

### Cluster protection

To check security rules, you can use [admission controllers].
I am sorry I only know

- Webhook (MutatingAdmissionWebhook, ValidatingAdmissionWebhook)
- and Open Policy Agent
- Kyverno

## Kubernetes cluster

### Hardware

For each system there is [CIS guideline]. It is recommend to follow recommendation to hardened support OS

You have also tools to check CIS recommendation:

- CIS-CAT Lite

Be sure to do not have people who shouldn't access to your cluster

### Kubernetes

A CIS guideline have been done also for Kubernete ([Securing Kubernetes])

To check respecting guiline:

- Kube Bench from Aqua Security

Be sure to stay up to date: Kubernetes only suporte the 3 last major: Today, last major is 1.25, supported version are: 1.25, 1.24 and 1.23

#### Role

Manage your cluster with the least privilege principle. Only add the role that people/service account need.

#### Kubelet

- Remove anonymous request
- Activate certificate authentication
- Switch authorization mode to webhook
- Disable kubelet read only port

#### Namespace

AKS-MD004 A separate Namespace must be created and used for each project/application.

## Application in K8S

### Network Policies

If you are not exposed on public, you should filter which pod/service/ip acceed to your Application.
Network Policies permit to filter incomming and outgoing trafic

### Syscall

Only Authorise needed syscall for each pod

You can use some binary which help you to know which syscall are needed

- Aquasec/Tracee
- strace

### Capability

Only authorize needed capabillity

You can use

- AppArmor
- Cgroup

AKS-MD011 Must limit the amount of resources each container can consume within a Pod (use cgroups).

### Resiliency

AKS-MD014 Pods must be rescheduled each week at maximum

## Additionnal tools

- Portshift
- kube-hunter
- Kyverno

## Glosary

- CIS: Center for Internet Security
- DAST: Dynamic Application Security Testing
- IAST: Interactive Application Security Testing solutions help organizations identify and manage security risks associated with vulnerabilities discovered in running web applications using dynamic testing (often referred to as runtime testing) techniques
- K8S: Kubernetes
- OS: operating system
- SAST: Static Application Security Testing
- SCA: Software Composition Analysis

## Sources

- [synopsys.com]
- [kubernetes.io]

[admission controllers]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#validatingadmissionwebhook
[kubernetes.io]: https://kubernetes.io/docs/home/
[OCI annotations]: https://github.com/opencontainers/image-spec/blob/main/annotations.md
[synopsys.com]: https://www.synopsys.com/glossary/what-is-sast.html
[CIS guideline]: https://www.cisecurity.org/benchmark
[Securing Kubernetes]: https://www.cisecurity.org/benchmark/kubernetes

## A trier

### Container Namespace in k8s

:source: https://www.youtube.com/watch?v=uRp0YltujVE

Si k8s > 1.25
CRI-O 1.25
containderd 1.7
docker 11.11.2022 not available

in Pod definition
spec.hostUsers: false

can't be mixed with host{Network, PC, PID}: true
only on stateless pod, no PV
but secret, configmap, downwardAPI, projeted, emptydir are ok
Mounted file need the permission on the group

## Devops moebius strip

### Phases

- Development
  - Code
  - Build
- Continuous Integration
  - {Development}
  - Integrate
  - Test
- Continous Delivery
  - {Continuous Integration}
  - Release
- Continous Deployment
  - {Continous Delivery}
  - Deploy
- Devops
  - {Continous Deployment}
  - Operate
  - Scanning
  - Testing
  - Report Generation

### CI

#### Plan

#### Code

- Code Static Analysis (Sonarque) (test unitaire)
- Code Quality (pretier, lint)

- Static Application Security Testing (SAST) (Sonarqube, Phpcs, SNYK, ...)
- Software Composition Analysis (SCA) (npm-audit, maven, OWASP, Trivy, SNYK, ...)

#### Build (Can be Integration or Packaging)

- Code review (JP)
- Code Static Analysis (Sonarque)
- Code Quality (pretier, lint)

- Image Security Scanning (Anchore, Trivy, TUF, SNYK, ...)
- Static Application Security Testing (SAST) (SNYL, Sonarqube, Phpcs, ...)
- Software Composition Analysis (SCA) (npm-audit, maven, OWASP, Trivy, SNYK, ...)

#### Test (or verify)

- Static Application Security Testing (SAST) (SNYL, Sonarqube, Phpcs, ...)
- Dynamic Application Security Testing (DAST)
- Interactive Application Security Testing (IAST)
- Pen Testing
- Fuzz Testing: Fuzz testing or fuzzing is an automated software testing method that injects invalid, malformed, or unexpected inputs into a system to reveal software defects and vulnerabilities
- Hardening Check (BIOS, HD Encrypt, USB, Sys package, port, SSH, SELinux, pwd policies) (SBom)

- Load/Penformance test
- Chaos Monkey

### CD

#### Release (Can be Versionning)

- Secure Configuration

- Packaging for development

#### Deploy

- PenTest
- Vulnerability Scanning
- Perf ?

- Log
- Audit
- Metric

#### Operate

- Continious Scanning
- Runtime Application Self-Protection (RASP) View Report
- Threat intelligence

- Monitor, Detect, Response, Recover

- Red Teaming: mise a dispo d'une instance pour se faire attaquer

#### Measure (can be Monitor)

- Static Application Security Testing (SAST) (SNYL, Sonarqube, Phpcs, ...)
- Dynamic Application Security Testing (DAST)
- Interactive Application Security Testing (IAST)
- Runtime Application Self-Protection (RASP)

## K8S

### Cluster

#### Preco

- CIS (Kube Bench)
- Intrusion/container comportement (Falco)

#### Right

- Role (ns, resource, resource name, verb)
- ClusterRole

### Namespace

### Netpol

### Entry

- Admission controller
- Webhook (MutatingAdmissionWebhook, ValidatingAdmissionWebhook)
- and Open Policy Agent
- Kyverno

### Hardware

- CIS recommendation (CIS-CAT Lite)
- Kubelet
- Syscall (aquasec/tracee, strace, seccomp)
- Capability (AppArmor, Cgroup) (apparmor = file, Cgroup = CPU ???)

### Add

``` yaml
    securityContext:
      allowPrivilegeEscalation: false
```
