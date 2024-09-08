# My Playbook

## Auto install

### Test Rdme

```sh
echo 'hey guy you succeed using rdme'
```

### Prerequisite

```sh {name=prerequisite}
# prerequisite
sudo apt-get install -y git python3 python3-pip
python -m pip install ansible
mkdir data
cd data
git clone https://github.com/FlorianCcj/notes.git
export PATH=$PATH:/home/${USER}/.local/bin
```

### Deploy

```sh {name=deploy_all}
ansible-playbook -i hosts.ini playbooks/install_laptop.yml -K
```

### Deploy to one machine

```sh {name=deploy_x515}
ansible-playbook -i hosts.ini playbooks/install_laptop.yml -l florianccj_asus_x515 -K
```

```sh {name=deploy_x515_tags}
ansible-playbook -i hosts.ini playbooks/install_laptop.yml -l florianccj_asus_x515 -t go_cgoban -K
```

## Still manual

- git confidential
  - pinacolada

- Firefx account
- firefox gmail
- firefox 1Password
- firefox download helper client app: https://www.downloadhelper.net/install-coapp?browser=firefox
- Slack saloon
  - prologism
  - befree

## TODO: roles to create

tfenv
pre-commit
direnv


## Old doc

for dual screen 'launch' nvidia-detector
then install nvdia-driver-<number>

Problem with python apt ?

```sh
sudo ln -s /usr/lib/python3/dist-packages/apt_inst.cpython-38-x86_64-linux-gnu.so /usr/lib/python3/dist-packages/apt_inst.cpython-39-x86_64-linux-gnu.so
```

need
<user> ALL=(ALL:ALL) NOPASSWD: ALL
------------------------------
echo -e "<user>\tALL=ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/
ubuntu \
et dans /etc/sudoers.d/ verifier qu il y a `includedir /etc/sudoers.d`
&& chmod 0400 /etc/sudoers.d/<user>

install https://github.com/bmwant/podmena

sudo apt-get install ubuntu-restricted-extras

permet de recuperer quelque codec video


```
#!/bin/bash
# to rsync 0 */2 * * * rsync -az --exclude-from '/home/florianccj/Document/exclude-list.txt' /home/florianccj/Document /media/removable/SD\ Card/

rsync -az --exclude-from '/home/florianccj/Document/exclude-list.txt' /home/florianccj/Document /media/removable/SD\ Card/
```

```
#!/bin/bash

cd
mkdir Document
cp -fr /media/removable/SD\ Card/Document/exclude-list.txt ~/Document/exclude-list.txt

rsync -az /media/removable/SD\ Card/Document /home/florianccj/
```
