# Nexus

Docker-compose which permit to have nexus on localhost

## before

### on computer

```bash
path_to_nxrm_data="data/opt/nxrm/data"
mkdir -p ${path_to_nxrm_data}
sudo chown -R ${USER}:200 ${path_to_nxrm_data}
```

### if you want to deploy on k8s

```yaml
# on k8s
securityContext:
  fsGroup: 200
```

## install

```bash
# after this command nexus will be accissible on nexus.localhost
docker-compose up -d
```

## exemple access

```bash
curl --fail --insecure https://localhos
```

```bash
curl -v -u admin:admin123 --insecure --header 'Content-Type: application/json' 'https://localhost/service/rest/v1/script' -d @nexus-repository/create-docker-proxy.json
```

```bash
curl -v -X POST -u admin:admin123 --insecure --header 'Content-Type: text/plain' 'https://localhost/service/rest/v1/script/CreateDockerProxy/run'
```
