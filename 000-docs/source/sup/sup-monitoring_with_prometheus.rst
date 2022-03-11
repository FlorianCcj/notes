Sup - Monitoring with Prometheus
################################

Monitoring Why
**************

* Analyzing long-term trends
* Comparing over time or experiment groups
* Alerting
* Building dashboards
* Conducting ad hoc retrospective analysis (i.e., debugging)

USE Method
**********

* Utilization, Saturation and Errors
  * utilization: as a percent over a time interval. eg, "one disk is running at 90% utilization".
  * saturation: as a queue length. eg, "the CPUs have an average run queue length of four".
  * errors: scalar counts. eg, "this network interface has had fifty late collisions".

* Server Ressources
  * CPUs: sockets, cores, hardware threads (virtual CPUs)
  * Memory: capacity
  * Network interfaces
  * Storage devices: I/O, capacity
  * Controllers: storage, network cards
  * Interconnects: CPUs, memory, I/O
* Sorftware ressources
  * mutex locks: utilization may be defined as the time the lock was held; saturation by those threads queued waiting on the lock.
  * thread pools: utilization may be defined as the time threads were busy processing work; saturation by the number of requests waiting to be serviced by the thread pool.
  * process/thread capacity: the system may have a limited number of processes or threads, the current usage of which may be defined as utilization; waiting on allocation may be saturation; and errors are when the allocation failed (eg, "cannot fork").
  * file descriptor capacity: similar to the above, but for file descriptors.

Google s Four Golden signal
***************************

* Latency
* Traffic
* Errors
* Saturation

Prometheus
**********

* time serieus nomenclature: :code:`<time series name>{<label name>=<label value>, ...}`
* example :code:`total_website_visits{site="MegaApp", location="NJ", instance="webserver",job="web"}`
* retention: default 15 days, if you need more, add it in a third-party platform
* recomend to add on an SSD platform
* HA:
  * prometheus: for an HA platform, all prometheus will scrap all data
  * alertmanager: will do the same ... so double alert ... will see later
* https://github.com/danguita/prometheus-monitoring-stack
* :code:`docker run -p 9090:9090 -v /tmp/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus`
* https://prometheus.io/docs/prometheus/latest/installation/#using-docker
* acces to :code:`http://localhost:9090/graph`

Config
======

.. code-block:: YAML

    global:
      scrape_interval:15s
      evaluation_interval: 15s

    alerting:
      alertmanagers:
      - static_configs:
        - targets:
          # - alertmanager:9093

    rule_files:
      # - "first_rules.yml"
      # - "second_rules.yml"

    scrape_configs:
      - job_name: 'prometheus'
        static_configs:
          - targets: ['localhost:9090']

PromQl
======

* just type :code:`{__name__:<time series name>}` to get the metric of this name
* then you can filter :code:`<time series name>{<label name>=<label value>, ...}`
* example :code:`go_gc_duration_seconds{instance="localhost:9090",job="prometheus",quantile="0.5"}`
* :code:`quantile="0.5"` permit to get 50% of the data ???

* operators:
  * :code:`=`: Select labels that are exactly equal to the provided string.
  * :code:`!=`: Select labels that are not equal to the provided string.
  * :code:`=~`: Select labels that regex-match the provided string.

    * example: :code:`http_requests_total{environment=~"staging|testing|development",method!="GET"}`
    * it shouldnt be empty :code:`{job=~".*"}` is invalide but :code:`{job=~".+"}` is valid

  * :code:`!~`: Select labels that do not regex-match the provided string.

* function:
  * sum

    * example :code:`sum(promhttp_metric_handler_requests_total)`
    * example :code:`sum(rate(promhttp_metric_handler_requests_total[5m])) by (job)`

Monitoring Node and container

1. CPU
2. Memory
3. Disk
4. Availability

* exporter: permit to access to metric of an host
* There is a lot of exporter
* Here we will see :code:`node exporter`

Monitoring Docker

recommand Google cAdvisor, running as a docker container and export metric

.. code-block:: bash

  docker run \
    --volume=/:/rootfs:ro \
    --volume=/var/run:/var/run:rw \
    --volume=/sys:/sys:ro \
    --volume=/var/lib/docker/:/var/lib/docker:ro \
    --volume=/dev/disk/:/dev/disk:ro \
    --publish=8080:8080 \
    --detach=true \
    --name=cadvisor \
    google/cadvisor:latest

.. code-block:: yaml

  scrape_configs:
    - job_name: 'prometheus'
      static_configs:
        - targets: ['localhost:9090']
    - job_name: 'node'
      static_configs:
        - targets: ['138.197.26.39:9100', '138.197.30.147:9100', '138.197.30.163:9100']
    - job_name: 'docker'
      static_configs:
        - targets: ['138.197.26.39:8080', '138.197.30.147:8080', '138.197.30.163:8080']

p96

Note for later
**************

Sumary

Chapter 1: This introduction.
Chapter 2: Introducing Prometheus.
Chapter 3: Installing Prometheus.
Chapter 4: Monitoring nodes and containers.
Chapter 5: Service discovery.
Chapter 6: Alerting and AlertManager.
Chapter 7: Scaling.
Chapter 8: Instrumenting an application.
Chapter 9: Logging as instrumentation.
Chapter 10: Probing.
Chapter 11: Pushgateway.
Chapter 12: Monitoring a stack - Kubernetes.
Chapter 13: Monitoring a stack - Application.

source
******

* http://www.brendangregg.com/usemethod.html
* https://landing.google.com/sre/sre-book/chapters/monitoring-distributed-systems/#xref_monitoring_golden-signals
* https://prometheus.io/docs/prometheus/latest/querying/basics/
