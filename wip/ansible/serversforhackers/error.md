
## Too many authentication failures

ansible -i ./hosts --connection=local local -m ping

error:
Too many authentication failures

ansible -i ./hosts --ask-pass --ssh-extra-args='-o "PubkeyAuthentication=no"' all -m ping
