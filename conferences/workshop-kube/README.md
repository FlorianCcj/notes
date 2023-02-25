https://ibm.biz/kubecon-secure-deployment
Step1:
    chart helm make following https://github.com/goharbor/harbor-helm/tree/1.0.0
    `kubectl apply -f harbor.yml`
    `kubectl get pods -w`
    go to harbor tab
    log: admin
    pwd: kubecon1234
Step2:
    vuln scan:
        ihm -> library -> configuration -> Prevent vulnerable images from running
    init vuln db -> deploy_db.sh
    make vuln image:
        docker login -u admin -p kubecon1234 127.0.0.1:30002
        docker build . -t 127.0.0.1:30002/library/demo-api:vulnerable
        docker push 127.0.0.1:30002/library/demo-api:vulnerable
    deploy it:
        kubectl apply -f demo-api.yaml
        `kubectl get pods -w`
        kubectl describe pods #pod-name
        correct you dockerfile with version 3.4
        FROM sublimino/alpine-base:insecure => FROM alpine:3.4
        build and push
        docker build . -t 127.0.0.1:30002/library/demo-api:secure
        docker push 127.0.0.1:30002/library/demo-api:secure
        change the chart vulnerable => secure
    image signing:
        enable content trust
             export DOCKER_CONTENT_TRUST=1
             export DOCKER_CONTENT_TRUST_SERVER=https://127.0.0.1:30004
        push signed:
            docker tag 127.0.0.1:30002/library/demo-api:secure 127.0.0.1:30002/library/demo-api:signed
            docker push 127.0.0.1:30002/library/demo-api:signed
            will ask you to signed your image and repo
            docker trust inspect --pretty 127.0.0.1:30002/library/demo-api:signed
            check image
        Verifiable trust
            create private key:
                 docker trust key generate portierisdemo
            add in notary:
                docker trust signer add --key=portierisdemo.pub portierisdemo 127.0.0.1:30002/library/demo-api:signed
                will ask the key you enter before (don t know which one, suppoed repository one)
            push:
                 docker push 127.0.0.1:30002/library/demo-api:signed
                 will ask your private key
            check:
                docker trust inspect --pretty 127.0.0.1:30002/library/demo-api:signed
                docker trust inspect --pretty 127.0.0.1:30002/library/demo-api:secure
            see trusted files
                 tree ~/.docker/trust
            enforcing content trust
                harbor ui -> project -> config
                select Enable content trust
                uncheck Present vulnerable image form running
                save
    kubesec:
        git clone https://github.com/stefanprodan/kubesec-webhook
        cd kubesec-webhook
