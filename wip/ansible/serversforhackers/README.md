https://serversforhackers.com/c/an-ansible-tutorial

similar to Chef, Puppet or Salt.

## install

### bash

```bash
sudo apt-add-repository -y ppa:ansible/ansible
sudo apt-get update
sudo apt-get install -y ansible
```

### python

```bash
sudo apt-get install -y python2.7 python-pip
sudo pip install -U virtualenv

cd ~/
mkdir ansible-play
cd ansible-play

# Create a python virtual environment
virtualenv .venv
# Enable the virtual environment
source .venv/bin/activate

# Then anything we intall with pip will be
# inside that virtual environment
pip install ansible
pip install -U ansible

# to stop virtualenv use command deactivate
deactivate
```

## Config and first run

```bash
# host.ini
[local]
127.0.0.1

[remote]
192.168.1.2
```

try

```bash
# Run against localhost
ansible -i ./hosts --connection=local local -m ping

# Run against remote server
ansible -i ./hosts remote -m ping
```

options:

* -i ./hosts - Set the inventory file, the one named hosts
* remote, local, all - Use the servers defined under this label in the hosts inventory file. "all" is a special keyword to run against every server defined in the file
* -m ping - Use the "ping" module, which simply runs the ping command and returns the results
* -c local | --connection=local - Run commands on the local server, not over SSH

## module

not bad but launch only one task

```bash
# Run against a local server
ansible -i ./hosts local --connection=local -b --become-user=root \
    -m shell -a 'apt-get install nginx'

# Run against a remote server
ansible -i ./hosts remote -b --become-user=root all \
    -m shell -a 'apt-get install nginx'
```

options:


* -b - "become", tell Ansible to become another user when running the command. This is how you run as different users or promote yourself to the root user.
* --become-user=root - Run the following commands as user "root" (e.g. use "sudo" with the command). We can define any existing user here.
    * -a used to pass any arguments to the module defined with -m

```bash
# Run against a local server
ansible -i ./hosts local --connection=local -b --become-user=root \
    -m apt -a 'name=nginx state=installed update_cache=true'

127.0.0.1 | success >> {
    "changed": false
}

# Run against a remote server
ansible -i ./hosts remote -b --become-user=root \
    -m apt -a 'name=nginx state=installed update_cache=true'

127.0.0.1 | success >> {
    "changed": false
}
```

options:


* -i ./hosts - Set the inventory file, the one named hosts
* -b - "become", tell Ansible to become another user to run the command
* --become-user=root - Run the following commands as user "root" (e.g. use "sudo" with the command)
* local | remote - Run on local or remote defined hosts from the inventory file
* -m apt - Use the apt module
* -a 'name=nginx state=installed update_cache=true' - Provide the arguments for the apt module, including the package name, our desired end state and whether to update the package repository cache or not

## playbook

launch multiple task

```yaml
# nginx-local.yml
---
# hosts could have been "remote" or "all" as well
- hosts: local
  connection: local
  become: yes
  become_user: root
  tasks:
   - name: Install Nginx
     apt:
       name: nginx
       state: installed
       update_cache: true
```

```yaml
# nginx-remote.yml
---
- hosts: remote
  become: yes
  become_user: root
  tasks:
   - name: Install Nginx
     apt:
       name: nginx
       state: installed
       update_cache: true
```

```bash
$ ansible-playbook -i ./hosts nginx-local.yml
```

### handler

A Handler is exactly the same as a Task (it can do anything a Task can), but it will only run when called by another Task.

```yaml
---
# Example shows using the local machine still
# Remove 'connection' and set hosts to 'remote' for a remote connection
- hosts: local
  connection: local
  become: yes
  become_user: root
  tasks:
   - name: Install Nginx
     apt:
       name: nginx
       state: installed
       update_cache: true
     notify:
      - Start Nginx

  handlers:
   - name: Start Nginx
     service:
       name: nginx
       state: started
       # can start, stop, restart, reload
```

### More task

```yaml
---
# Example shows using the local machine still
# Remove 'connection' and set hosts to 'remote' for a remote connection
- hosts: local
  connection: local
  become: yes
  become_user: root
  vars:
   - docroot: /var/www/serversforhackers.com/public
  tasks:
   - name: Add Nginx Repository
     apt_repository:
       repo: ppa:nginx/stable
       state: present
     register: ppastable

   - name: Install Nginx
     apt:
       pkg: nginx
       state: installed
       update_cache: true
     when: ppastable|success
     notify:
      - Start Nginx

   - name: Create Web Root
     file:
      path: '{{ docroot }}'
      mode: 775
      state: directory
      owner: www-data
      group: www-data
     notify:
      - Reload Nginx

  handlers:
   - name: Start Nginx
     service:
       name: nginx
       state: started

    - name: Reload Nginx
      service:
        name: nginx
        state: reloaded
```


* Add Nginx Repository - Add the Nginx stable PPA to get the latest stable version of Nginx, using the apt_repository module.
* Install Nginx - Installs Nginx using the Apt module.
* Create Web Root - Finally, create a web root directory.

* register: register the results of a modules action
* when: conditionally perform actions based on the registered variables values.

## Roles

Within each directory, Ansible will search for and read any Yaml file called main.yml automatically.

```yaml
# structure
roles
  rolename
   - files
   # files we want to copy
   - handlers
   - meta
   # role metadata (include dependencies)
   - templates
   # based on jinja2 (http://jinja.pocoo.org/docs/dev/)
   # will call variables from vars/main.yml
   - tasks
   - vars
```

### Create a role

```bash
cd ~/ansible-play
source .venv/bin/activate
mkdir roles
cd roles
ansible-galaxy init nginx
```

see handles, tasks, templates vars

### Running the role

```yaml
---
# run locally here, yadda yadda yadda
- hosts: local
  connection: local
  roles:
    - nginx

```

ansible-playbook -i ./hosts server.yml

## Facts

## Vault
