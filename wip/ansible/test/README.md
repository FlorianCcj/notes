# test

virtualenv .venv
source .venv/bin/activate
pip install ansible
pip install -U ansible
deactivate

## creer un role

```
cd roles
ansible-galaxy init <nom-role>
```
