Cloud Native - Security 101
###########################

:source: https://cdn2.hubspot.net/hubfs/1665891/1%20-%20Videos%20and%20Webinar%20MP4/Cloud%20Native%20Security%20101.mp4

Lifecycle
*********

Build: Develop, build and package 
    => Find and manage vuln and risk thru the dev pipeline

Ship: Code flows only one way, continuously
    => Only run secure and approved image containers

Run: Orchestrated runs anywhere
    => Protect workloads in runtime against known and unknown attack

Shared responsibility = Platform Owner + Platform Provider
Platform Owner = Images + Infra + Worload
3 domains:
    1. vuln and risk management
    2. Compliance
    3. Runtime

Best Practice
*************

1. scan
    * what for
        * CVE
        * exposed secrets
        * malware
        * risky conf
    * when and where
        * ci/cd pipeline
        * registries
2. infrastructure
    * CIS
    * CVE, secret, malware
    * schedule to run continuously
    * audit login + su/sudo
    * file integrity monitoring (FIM)


    * find risk and vuln on host conf
    * provide a scored report
    * schedule to run continuously
3. runtime
    * risk and vuln
4. Force Container Immutabillity (aka drift prevention)
    * immutable containers are easier to Protect
    * any change in runtime is not legitimate
    * if a cahange is detected, it is blocked
5. Granular Access Control Between Micro-services (aka micro-segmentation)
    * Control access to and from micro-services
    * Enable application zones on the same node
    * Increase container density
6. Manage Secrets Effectively and Securely
    * Injects secret into container at runtime with no downtime
    * Encrypts secrets in transit and in memory, no write to disk
    * Secret visible only inside the container, not visible via host or orchestrator
    * Monitos and audits running container access to secrets
    * Integrates with key management tool of choice for centralized lifecycle management and storage of secrets
7. Manage virtual patcing at scale (compensating security mechanism)
    * detecs and prevents exploitation of known vuln
    * does not change image code nor require any developper intervention
    * acts as a compensating control for containers during runtime

recommend
*********

* trivy (github.com/aquasecurity/trivy)
* kube-bench (github.com/aquasecurity/kube-bench)
* kube-hunter (github.com/aquasecurity/kube-hunter)
