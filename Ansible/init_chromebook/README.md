ansible-playbook -i hosts.ini playbooks/playbook.yml

need 
<user> ALL=(ALL:ALL) NOPASSWD: ALL
------------------------------
echo -e "<user>\tALL=ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/
ubuntu \
et dans /etc/sudoers.d/ verifier qu il y a `includedir /etc/sudoers.d`
&& chmod 0400 /etc/sudoers.d/<user>

install https://github.com/bmwant/podmena

ansible-galaxy install -r requirements.yml

 OK - install-basics.sh - 1 - base
 OK - install-basics.sh - 2 - omz
 OK - install-basics.sh - 3 - z.sh
 OK - install-basics.sh - 4 - git
 OK - install-basics.sh - 5 - gitconfig
 OK - install php
NOK - install composer
NOK - install npm
NOK - install python
NOK - install discord
NOK - install atom
NOK - install vscode


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
