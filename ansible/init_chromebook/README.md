

sudo apt install python python3-pip
pip install ansible
export PATH=$PATH:/home/${USER}/.local/bin

ansible-playbook -i hosts.ini playbooks/install_laptop.yml

for dual screen 'launch' nvidia-detector
then install nvdia-driver-<number>

Problem with python apt ?
sudo ln -s /usr/lib/python3/dist-packages/apt_inst.cpython-38-x86_64-linux-gnu.so /usr/lib/python3/dist-packages/apt_inst.cpython-39-x86_64-linux-gnu.so

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
