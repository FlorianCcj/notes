Ansible - Molecule
##################

pip, pip install docker, pip install molecule

molecule init scenario --driver-name docker

$ molecule lint --verifier  # run linters in verifier scope
$ molecule lint --project  # run linters in project scope
molecule test


https://www.digitalocean.com/community/tutorials/how-to-test-ansible-roles-with-molecule-on-ubuntu-16-04
