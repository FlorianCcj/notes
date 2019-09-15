Check style:

ansible-playbook install.yml --syntax-check; ansible-playbook service-deploy.yml --syntax-check

dry-run:

ansible-playbook install.yml --check; ansible-playbook service-deploy.yml --check




ansible-playbook mlf.yml --tags "ldap-server"
