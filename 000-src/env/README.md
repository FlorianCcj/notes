Check style:

ansible-playbook mlf.yml --syntax-check; ansible-playbook mlf.yml --syntax-check

dry-run:

ansible-playbook install.yml --check; ansible-playbook service-deploy.yml --check




ansible-playbook mlf.yml --tags "ldap-server"

- vsm
- ci
- stock
- proxy
- cli pour gerer
- scrap
    - log
    - metric
- certificat manager
- dhcp
- gestion de doc
- dns
- chat (zullip, mattermost, ...)
