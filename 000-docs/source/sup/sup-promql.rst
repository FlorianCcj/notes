Sup - promql
############

request
*******

<metric name>: affiche la metric
<metric name>{<label_name>="<label_value>"}

node_network_receive_bytes_total
node_network_receive_bytes_total{device="eth0"}
node_network_receive_bytes_total{device!="eth1"}
node_network_receive_bytes_total{device=~"eth.+"}
node_network_receive_bytes_total{instance="node42:9100", device=~"eth.+"}: Filtering by multiple labels
node_network_receive_bytes_total{device=~"eth1|lo"}: Filtering by multiple labels
{__name__=~"node_network_(receive|transmit)_bytes_total"}: Filtering by regexps on metric name
rate(node_network_receive_bytes_total[5m])


Function
********

sum(rate(http_requests_total[5m]))
sum, rate
You can also use min, max, avg, count, and quantile
sum by (status_code) (rate(http_requests_total[5m]))
sum(rate(http_requests_total[5m] offset 5m))

cpu usage by instance: :code:`100 * (1 - avg by(instance)(irate(node_cpu{mode='idle'}[5m])))`
memory_usage: :code:`node_memory_Active / on (instance) node_memory_MemTotal`
disk space: :code:`node_filesystem_avail{fstype!~"tmpfs|fuse.lxcfs|squashfs"} / node_filesystem_size{fstype!~"tmpfs|fuse.lxcfs|squashfs"}`

Sources
*******

* https://timber.io/blog/promql-for-humans/
* https://medium.com/@valyala/promql-tutorial-for-beginners-9ab455142085
