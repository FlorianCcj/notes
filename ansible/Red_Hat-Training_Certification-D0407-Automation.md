# Red_Hat-Training+Certification-D0407-Automation_with_Ansible

## 01. install and host managing

sudo apt-egt install -y ansible

creer un fichier

```yaml
# ./inventory
[dev]
servera.lab.example.com
```

`ansible dev -i inventory --list-host`: liste les serveurs du group designer

## 02. Deploying Ansible 15-57

group:

* all: every explicitly host
* ungrouped

### nested group

```yaml
[usa]
washington1.exemple.com
washington2.exemple.com

[canada]
ontario01.exemple.com
ontario02.exemple.com
ontario[04:20].exemple.com
192.168.[4:7].[1:255]

[north-america]
here.example.com

[north-america:children]
canada
usa
```

### Dynamic inventory

not a lot of info ... go and see https://docs.ansible.com/ansible/intro_inventory.html

### Config

1. `$ANSIBLE_CONFIG`
2. `./ansible.cfg`
3. `~/.ansible.cfg`
4. `/etc/ansible/ansible.cfg`

`ansible servers --list-hosts -v`

`cat /etc/ansible/ansible.cfg`

`grep "^\[" /etc/ansible/ansible.cfg`: show all config category

### Inventory

can manage:

* where is that lists the managed hosts and host group
* which connexion protocol to use to communicate with the managed hosts (default: ssh), and whether a non-standard network port is needeed to connect to the server
* Which remote user to use on the managed hosts; this could be root or it could be an unprivileged user
* If the remote user is unprivileged, Ansible needs to know wheter it should try to escalate privileges to root and how to do it (for example, by using sudo)
* Whether or not to prompt for an SSH password or sudo password to log in or gain privileges

```yaml
[defaults]
inventory = ./inventory
```

#### user

by default: same user as local, else edit `remote_user: <user>`

if password: `ask_pass: true`

```yaml
[defaults]
inventory = ./inventory
remote_user: root
ask_pass: true
```

### Config key

`ssh-keygen`

`ssh-copy-id <user>@<server>    `

```yaml
- name: Public key is deployed to managed hosts for Ansible
  hosts: all
  tasks:
    - name: Ensure key is in root's ~/.ssh/authorized_hosts
      authorized_key:
        user: root
        state: present
        key: '{{item}}'
      with_file:
        - ~/.ssh/id_rsa.pub
```


```yaml
# ansible.cfg

[defaults]
inventory = ./inventory
remote_user = someuser
ask_pass = false

[privilege_escalation]
become = true
become_method = sudo
become_user = root
become_ask_pass = false
```

### Var for spesific group

```yaml
# group_var/my_super_group_for_windobe
ansible_connection: winrm
ansible_port: 5986
```

### guided exercise : managing ansible conf file

```yaml
# ansible.cfg
# ansible.cfg
[defaults]
inventory = ./inventory

[privilege_escalation]
become = true
become_method = sudo
become_user = root
```

```yaml
# inventory
[myself]
localhost

[intranetweb]
servera.lab.example

[everyone:children]
intranetweb
myself
```

`ansible <group> --list-hosts`

`ansible <group> --list-hosts -v`

### Ad Hoc Command

`ansible everyone -m ping`

`ansible host-pattern -m module [-a 'module arguments'] [-i inventory]`

`ansible-doc -l`: get module list

`ansible-doc ping`: get module detail

http://docs.ansible.com/ansible/modules_by_category.html

some usefull module:

* file module
    * copy: copy a local file to the managed host
    * get_url: dwl a file to the managed host
    * synchronize: like rsync
    * file: set perm and other prop of a file
    * line in file: make sure a certain line isn't in a file
* soft package manager
    * yum
    * dnf
    * apt
    * pip
    * gem
* admin tools
    * service
    * user
* uri, which interacts with a web server and can test functionality or issue API request

`ansible -m user`

`ansible -m user -a 'name=florianccj uid=4000 state=present'` localhost

`ansible localhost -m command -a hostname`

`ansible localhost -m command -a set`

`ansible localhost -m shell -a set`

don t understand diff between `shell` and `command` ...

`command` and `shell` launch in python, to launch without, use `raw` module

`ansible localhost -m copy -a 'content="Managed by Ansible\n" dest=/etc/motd' -u devops`: create a file with the content in

`ansible localhost -m copy -a 'content="Managed by Ansible\n" dest=/etc/motd' -u devops --become`: pass root to do it

#### Ad hoc option

setting: command-line option
inventory       : -i
remote-user     : -u
become          : -b, --become
become_method   : --become-method
become_user     : --become-user
become_ask_pass : -K, --ask-become-pass

### dynamic inventory

p43 (p62/425)

https://github.com/ansible/ansible/tree/devel/contrib/inventory

* need to have the shebang (#!/usr/bin/python)
* --list: need to return a json with a JSON-encoded hash/dictionary off all host and group

Ex:
https://materials.example.com/dynamic/inventoryw.py

## 03. Implements Playbook 59-93

```yaml
---
- name: test if newbie is in localhost
  hosts: localhost
  tasks:
    - name: newbie exists with UID 4000; description of task
      user: ; module to use in task
        name: newbie
        uid: 4000
        state: present
```

`ansible-playbook test.yml`: launch playbook

`ansible-playbook --syntax-check test.yml`: check synthax

`ansible-playbook -c test.yml`: dry run

```yaml
# site.yml
---
- name: Install and start Apache HTTP
  hosts: web

  tasks:
    - name: http package is present
      yum:
        name: httpd
        state: present
    - name: correct index.html is present
      copy:
        src: files/index.html
        dest: /var/www/html/index.html
    - name: httpd is started
      service:
        name: httpd
        state: started
        enabled: true
```

```yaml
- name: /etc/hosts is up to date
  hosts: datacenter-west
  remote_user: automation
  become: yes

  tasks:
    - name: server.example.com in /etc/hosts
      lineinfile:
        path: /etc/hosts
        line: '192.0.2.42 server.example.com server'
        state: present
```

STAY IDEMPOTENT !!!

```yaml
- name: Non-idempotent approach with shell module
  shell: echo "namespace 192.0.2.1" > /etc/resolv.conf
```

```yaml
- name: Idempotent approach with copy module
  copy:
    dest: /etc/resolv.conf
    content: "nameserver 192.0.2.1\n"
```

good practice

```yaml
# do not use
tasks:
  - name: shortand form
    service: name=httpd enabled=true state=started
```

```yaml
# use instead
tasks:
  - name: normal form
    service:
      nmae: httpd
      enabled: true
      state: started
```

### Exo

```yaml
- name: Enable intranet services
    host: servera.lab.example.com
    become: yes

    tasks:
        - name: latest version of httpd and firewalld installed
            yum:
                name:
                - httpd
                - firewalld
                state: latest
        - name: firewalld enabled and running
            service:
                name: firewalld
                enabled: true
                state: started
        - name: firewalld permits http service
            firewalld:
                service: http
                permanent: true
                state: enabled
                immediate: yes
        - name: httpd enable and running
            service:
                name: httpd
                enabled: true
                state: started
        - name: test html page is installed
            copy:
                content: "Welcome to the example.com intranet! \n"
                dest: /var/www/html/index.html
- name: Test intranet web server
    host: localhost
    become: no

    tasks:
        - name: connect to intranet web server
            uri:
                url: http://servera.lab.example.com
                status_code: 200
```

```yaml
---
- name: Enable internet services
    hosts: serverb.lab.example.com
    become: yes

    tasks:
        - name: latest version of all required packages installed
            yum:
                name:
                    - firewalld
                    - httpd
                    - mariadb-server
                    - php
                    - php-mysql
                state: latest
        - name: firewalld enabled and running
            service:
                name: firewalld
                enabled: true
                state: started
        - name: firewalld permits http service
            firewalld:
                service: http
                permanent: true
                state: enabled
                immediate: yes
        - name: httpd enable and running
            service:
                name: httpd
                enabled: true
                state: started
        - name: mariadb enabled and running
            service:
                name: mariadb
                enabled: true
                state: started
        - name: test php page is intalled
            get_url:
                url: "http://materials.exemple.com/grading/var/www/html/index.php"
                dest: /var/www/html/index.php
                mode: 0644
- name: Test internet web server
    host: localhost
    become: no

    tasks:
        - name: connect to intranet web server
            uri:
                url: http://serverb.lab.example.com
                status_code: 200
```

p78 (97/495)

## 04. Managing variables and inclusion 95-146

Different scope

* global: from command line or ansible config
* play: in the play and related struct
* host: by the inventory, fact or task

### in playbook

```yaml
- hosts: all
    vars:
        user: joe
        home: /home/joe
```

to stock them in a different file


```yaml
# playbook
- hosts: all
    vars_files:
        - vars/users.yml

# vars/users.yml
user: joe
home: /home/joe
```

use it

```yaml
vars:
    user: joe
tasks:
    - name: Create the user {{ user }}
        user:
            name: "{{ user }}"
```

### in inventory

```yaml
[servers]
demo.example.com
demo2.example.com ansible_user=tom
demo3.example.com ansible_user=chloe

[servers:vars]
user=joe
```

for inventory in a different file

```yaml
# for group servers
# group_vars/servers
package: httpd
```

```yaml
# for host google.fr
# group_vars/google.fr
package: mysql-server
```

### variable to register and dump

```yaml
tasks:
    - name: install the package
        yum:
            name: httpd
            state: installed
        register: install_result
    - debug: var=install_result
```

### exo

```yaml
# hosts
[webservers]
servera.lab.example.com

[dbservers]
servera.lab.example.com

[servers:children]
dbservers
webservers

[servers:vars]
ansible_user=devops
ansible_become=yes
package=httpd
```

```yaml
# playbook.yml
---
- hosts: all
    tasks:
        - name: Installs the "{{ package}}" package
            yum:
                name: "{{ package }}"
                state: latest
```

```yaml
# group_vars/dbserver
package: mariadb-server
```

```yaml
# group_vars/servera.lab.example.com
package: screen
```

```yaml
- name: Deploy and start Apache HTTPD service
    hosts: webserver
    vars:
        web_pkg: httpd
        firewall_pkg: firewalld
        web_service: httpd
        firewall_service: firewalld
        python_pkg: python-httplib2
        rule: http

    tasks:
        - name: Required packages are installed and up to date
            yum:
                name:
                    - "{{ web_pkg }}"
                    - "{{ firewall_pkg }}"
                    - "{{python_pkg }}"
                state: latest
        - name: The {{ firewall_service }} service is started and enabled
            service:
                name: "{{ firewall_service }}"
                enabled: true
                state: started
        - name: the {{ web_service }} service is started and enabled
            service:
                name: "{{ web_service }}"
                enabled: true
                state: started
        - name: Web content is in place
            copy:
                content: "Exemple web content"
                dest: /var/www/html/index.html
        - name: The firewall port for {{ rule }} is open
            firewalld:
                service: "{{ rule }}"
                permanent: true
                imediate: true
                state: enabled
        - name: Verify the Apache service
            hosts: localhost
            become: false
            tasks:
                -name: Ensure the webserver is reachable
                    uri:
                        url: http://servera.lab.example.com
                        status_code: 200
```

### Managing facts

`ansible demo1.example.com -m setup`

`ansible demo1.example.com -m setup -a 'filter=ansible_eth0'`

`ansible demo1.example.com -m setup -a 'filter=ansible_local'`: will read in /etc/ansible/facts.d/custom.fact

```yaml
---
- hosts: all
    tasks:
        - name: Prints various Ansible facts
            debug:
                msg: >
                    The default IPv4 address of {{ ansible_fqdn }}
                    is {{ ansible_default_ipv4.address }}
        - name: this play gathers no facts
            debug:
                msg: coucou
```

you can create custom facts

```yaml
# /etc/ansible/facts.d/custom.fact
[packages]
web_package = httpd
db_package = mariadb-server

[users]
user1 = joe
user2 = jane
```

then in playbook {{ ansible_local.custom.users.user1 }}

create dir
```yaml
---
- name: Install remote facts
    hosts: webserver
    vars:
        remote_dir: /etc/ansible/facts.d
        facts_file: custom.fact
    tasks:
        - name: create the remote dir
            file:
                state: directory
                recurse: yes
                path: {{ remote_dir }}
        - name: Install the new facts
            copy:
                src: "{{ facts_file }}"
                dest: "{{ remote_dir }}"
```

check with `ansible webserver -m setup -a 'filter=ansible_local'`

### Managing Inclusion

```yaml
tasks:
    - name: Include tasks to install the db server
        include: tasks/db_server.yml
    - name: Include the variables from a YAML or JSON file
        include_vars: vars/variables.yml
```

```yaml
# variables.yml
---
packages:
    web_package: httpd
    db_package: mariadb-server
```

```yml
---
- name: Installweb app packages
    host: all
    tasks:
        - name: Includes the tasks file and defines the variables
            include_vars: variables.yml
        - name: Debugs the variables imported
            debug:
                msg: >
                    "{{package['web_package']}} and {{package.db_package}}
                    have been imported"
```

### Demo: inclusion

```yaml
# paths.yml
---
paths:
    fileserver: /home/student/srv/filter/{{ ansible_fqdn }}
    dbpath: /home/student/srv/database/{{ ansible_fqdn }}
```

```yaml
# fileservers.yml
---
- name: Configure fileserver
    host: fileservers
    tasks:
        - name: Imports the variable file
            include_vars: paths.yml

        - name: Create the remote directory
            file:
                path: "{{ paths.fileserver }}"
                state: directory
                mode: 0755
            register: result

        - name: debug the result
            debug:
                var: result
```

```yaml
# dbservers.yml
---
- name: Configure fileserver
    host: dbservers
    tasks:
        - name: Imports the variable file
            include_vars: paths.yml

        - name: Create the remote directory
            file:
                path: "{{ paths.dbpah }}"
                state: directory
                mode: 0755
            register: result

        - name: debug the result
            debug:
                var: result
```

```yaml
# package.yml
packages:
    web_pkg: httpd
```

```yaml
# install_package.yml
---
- name: Installs {{ packages.web_pkg }}
    yum:
        name: "{{ packages.web_pkg }}"
        state: latest
```

```yaml
# playbook.yml
---
- name: Install fileserver packages
    host: fileservers
    tasks:
        - name: Include variable
            include_vars: package.yml

        - name: Installs the package
            include: install_package.yml
            # to surcharge vars
            vars:
                packages:
                    web_pkg: tomcat
```

### exercice

```yaml
# tasks/environment.yml
---
    - name: Install the {{ package }} package
        yum:
            name: "{{ package }}"
            state: latest
    - name: Start the {{ service }} service
        service:
            name: "{{ service }}"
            state: "{{ svc_state }}"
```

```yaml
# vars/variables.yml
---
firewall_pkg: firewalld
```

```yml
# playbook.yml
---
- name: Configure web server
    host: webserver
    vars:
        rule: http
    tasks:
        - name: Include the variables from the YAML file
            include_vars: vars/varibales.yml

        - name: Include the environment file and set the variable
            include: task/environment.yml
            vars:
                package: httpd
                service: httpd
                svc_state: started

        - name: Install the firewall
            yum:
                name: "{{ firewall_pkg }}"
                state: latest
        - name: Start the firewall
            service:
                name: firewall
                state: started
                enabled: true

        - name: Open the port for {{ rule }}
            firewalld:
                service: "{{ rule }}"
                immediate: true
                permanent: true
                state: enable

        - name: create index.html
            copy:
                content: "{{ ansible_fqdn }} has been customized using Ansible on the {{ ansible_date_time.date }}\n"
                dest: /var/www/html/index.html
```

### LAb

```yml
# custom.fact
[packages]
db_package = mariadb_server
web_package = httpd

[services]
db_service = mariadb
web_service = httpd
```

```yml
# setup_facts.yml
---
- name: Install remote facts
    hosts: lamp
    vars:
        remote_dir: /etc/ansible/facts.d
        facts_file: custom.fact
    tasks:
        - name: create the remote dir
            file:
                state: directory
                recurse: yes
                path: {{ remote_dir }}
        - name: Install the new facts
            copy:
                src: "{{ facts_file }}"
                dest: "{{ remote_dir }}"
```

```yml
# vars/main.yml
---
web_root: /var/www/html
```

```yml
# tasks/main.yml
---
    - name: Install and start the db and web server
        yum:
            name:
                - "{{ ansible_local.custom.packages.db_package }}"
                - "{{ ansible_local.custom.packages.web_package }}"
            state: latest

    - name: Start the db service
        service:
            name: "{{ ansible_local.custom.services.db_service }}"
            state: started
            enabled: true

    - name: Start the web service
        service:
            name: "{{ ansible_local.services.web_service }}"
            state: started
            enabled: true
```

```yml
# playbook.yml
---
- name: Install and configure lamp
    hosts: lamp
    vars:
        firewall: firewalld
    tasks:
        - name: Include the variable file
            include_vars: vars/main.yml
        - name: Include the tasks
            include: tasks/main.yml

        - name: Install the firewall
            yum:
                name: "{{ firewall }}"
                state: latest

        - name: Start the firewall
            service:
                name: "{{ firewall }}"
                state: started
                enabled: true

        - name: Open the port for the web
            firewalld:
                service: http
                state: enable
                immediate: true
                permanent: true
        - name: Create index.html
            copy:
                content: "{{ ansible_fqdn }}({{ ansible_default_ipv4.address }}) has been customized by Ansible \n"
                dest: "{{ web_root }}/index.html"

```

```yml
# tasks/firewall
    - name: Install the firewall
        yum:
            name: "{{ firewall }}"
            state: latest

    - name: Start the firewall
        service:
            name: "{{ firewall }}"
            state: started
            enabled: true

    - name: Open the port for the web
        firewalld:
            service: http
            state: enable
            immediate: true
            permanent: true
    - name: Create index.html
        copy:
            content: "{{ ansible_fqdn }}({{ ansible_default_ipv4.address }}) has been customized by Ansible \n"
            dest: "{{ web_root }}/index.html"
```

## 05. Implementing Task Control 147-204

### Task with loop

```yml
- name: Postfix and Dovecot are running
    service:
        name: "{{ item }}"
        state: started
    with_items:
        - postfix
        - dovecot
```

```yml
vars:
    mail_services:
        - postfix
        - dovecot
- name: Postfix and Dovecot are running
    service:
        name: "{{ item }}"
        state: started
    with_items: "{{ mail_services }}"
```

```yml
- name: Users exist and are in the correct groups
    user:
        name: "{{ item.name }}"
        state: present
        groups: "{{ item.groups }}"
    with_items:
        - { name: 'jane', groups: 'wheel' }
        - { name: 'joe', groups: 'root' }
```

Nested group

```yml
tasks:
    - name: All Db users have privilleges on all Db
        mysql_user:
            name: "{{ item[0] }}"
            priv: "{{ item[1] }}.*:ALL"
            append_privs: yes
            password: redhat
        with_nested:
            - [ 'joe', 'jane']
            - [ 'clientdb', 'employeedb', 'providerdb' ]
```

other loop:
* with_file
* with_fileglob
* with_random_choice

### When statement

```yml
---
- host: all
    vars:
        run_my_task: true
    tasks:
        - name: httpd package is installed
            yum:
                name: httpd
            when: run_my_task
```

```yml
---
- host: all
    vars:
        service: httpd
    tasks:
        - name: "{{ service }} package is installed"
            yum:
                name: "{{ service }}"
            when: service is defined
```

Conditionals:

* ==
* <
* >
* >=
* <=
* !=
* is defined
* is not defined
* <nom de la variable>
* not <nom de la variable>
* a in b
* and
* or

```yml
- name: install mariadb-server if enough space  on root
    yum:
        name: mariadb-server
        state: latest
    with_items: "{{ ansible_mounts }}"
    when: item.mount == "/" and item.size_available > 300000000
```

```yml
- hosts: all
    tasks:
        - name: Postfix server
            command: /usr/bin/systemctl is-active postfix ; postfix is running or not ?
            ignore_errors: yes
            register: result
        - name: Restart apache HTTPD if Postfix running
            service:
                name: httpd
                state: restarted
            when: result.rc == 0
```

### Handler

```yml
tasks:
    - name: copy demo.example.conf configuration template
        copy:
            src: /var/lib/templates/demo.example.conf.template
            dest: /etc/httpd/conf.d/demo.example.conf
        notify:
            - restart_mysql
            - restart_apache
handlers:
    - name: restart_mysql
        service:
            name: mariadb
            state: restarted
    - name: restart_apache
        service:
            name: httpd
            state: restarted
```

* handler are executed in order they are listed in handler section not in notify
* handler are called after all task
* if 2 handler with the same name, only one called
* handler defined in an include cannot be notified
* multiple task notify one handler -> one call
* if a task is skipped (not changed), notify don't hapened

### Exercise

```yml
# configure_db.yml
---
- name: Installing Mariadb server
    hosts: databases
    vars:
        db_packages:
            - mariadb-server
            - MySQL-python
        db_service: mariadb
        scr_file: "http://materials.example.com/task_control/my.cnf.template"
        dst_file: /etc/my.cnf
    tasks:
        - name install {{ db_packages }} package
            yum:
                name: "{{ item }}"
                state: latest
            with_items: "{{ db_packages }}"
            notify:
                - start_service
        - name: Download and install {{ dst_file }}
            get_url:
                url: "{{ src_file }}"
                dest: "{{ dst_file }}"
                owner: mysql
                group: mysql
                force: yes
            notify:
                - restart_service
                - set_password
    handlers:
        - name: start_service
            service:
                name: "{{ db_service }}"
                state: started
        - name: restart_service
            service:
                name: "{{ db_service }}"
                state: restarted
        - name: set_password
            mysql_user:
                name: root
                password: redhat
```

### Implementing Tags

Tag permit to launch only a subset of the playbook

```yml
- name: Example play using tagging
    hosts:
        - servera.lab.example.com
        - serverb.lab.example.com
    tasks:
        - name: httpd is installed
            yum:
                name: httpd
                state: latest
            tags: webserver
    tasks:
        - name: postfix is installed
            yum:
                name: postfix
                state: latest
```

```yml
# tag include and role
roles:
    - { role: databases, tags: ['prodcution', 'staging']}
```

`ansible-playbook main.yml --tags 'webserver`: only call webserver tagged task
`ansible-playbook main.yml --skip-tags 'webserver`: call all but ...

specail tags:
* tagged: call all task with tag
* untagged
* all (default)

### tags demo

```yml
---
- name: install database packages
    yum:
        name: "{{ item }}"
        state: latest
    with_items: "{{ db_packages }}"
    tags:
        - dev
    notify:
        - start_db
- name: Get small config file
    get_url:
        url: "{{ db_config_src_path_small }}"
        dest: "{{ db_config_path }}"
    when: db_config_src_path_small is defined
    notify:
        - restart_db
    tags:
        - dev
- name: Get large config file
    get_url:
        url: "{{ db_config_src_path_large }}"
        dest: "{{ db_config_path }}"
    when: db_config_src_path_large is defined
    notify:
        - restart_db
    tags:
        - prod
- name: Update motd for development
    copy:
        content: "this is development server"
        dest: /etc/motd
    tags:
        - dev
- name: update motd for a production
    copy:
        content: "This is a production server"
        dest: /etc/motd
    tags:
        - prod
```

```yml
- host: all
    vars:
        db_packages:
            - mariadb_server
            - MySQL-python
        db_config_url: http://materials.example.com/task_control
        db_config_src_path_small: "{{ db_config_url }}/my.conf.small"
        db_config_src_path_large: "{{ db_config_url }}/my.conf.large"
        db_config_path: /etc/my.cnf
        db_service: mariadb
    tasks:
        - include:
            prepare_db.yml
        when: inventory_hostname in groups['databases']
    handlers:
        - name: start_db
            service:
                name: "{{ db_service }}"
                state: started
        - name: restart_db
            service:
                name: "{{ db_service }}"
                state: restarted
```

### exo

```yml
---
- name: Install postfix
    yum:
        name: postfix
        state: latest
    tags:
        - server
    notify:
        - start_postfix

- name: Install dovecot
    yum:
        name: dovecot
        state: latest
    tags:
        - client
    notify:
        - start_dovecot

- name: Dowload main.cf configuration
    get_url:
        url: http:// materials.exmaple.com/task_control/main.cf
        dest: /etc/postfix/main.cf
    tags:
        - server
    notify:
        - restart_postfix
```

```yml
---
- hosts: all
    tasks:
        - name: Include configure_mail.yml
            include: configure_mail.yml
            when: inventory_hostname in groups['mailservers']
    handlers:
        - name: start_postfix
            service:
                name: postfix
                state: started
        - name: start_dovecot
            service:
                name: dovecot
                state: started
        - name: restart_postfix
            service:
                name: postfix
                state: restarted
```

### Handling errors

```yml
- yum
    name: notapkg
    state: latest
ignore_errors: yes
```

```yml
---
- hosts: all
    force_handlers: yes
    tasks:
        - name: a task which always notifies its handler
            command: /bin/true
            notify: restart the database
        - name: a task which fails becausse the package doesn't exist
            yum:
                name: notapkg
                state: latest
    handlers:
        - name: restart the database
            service:
                name: mariadb
                state: restarted
```

Specifying task faillure condition

```yml
tasks:
    - shell: /usr/local/bin/create_users.sh
        register: command_result
        failed_when: "'Password missing' in command_result.stdout"
```

Specifying when a task report "changed" result

```yml
- name: get Kerberos credentials as "admin"
    shell: echo "{{ krb_admin_pass }}" | kinit -f admin
    changed_when: false
```

Ansible block

rescue and always are optionnal

```yml
- name: block example
    host: all
    tasks:
        - block
            - name: upgrade the database
                shell:
                    cmd: /usr/local/lib/upgrade-database
            rescue:
                - name: revert the database upgrade
                    shell:
                        cmd: /usr/local/lib/revert-database
            always:
                - name: always restart the database
                    service:
                        name: mariadb
                        state: restarted
            when: ansible_distribution == "RedHat"
```

## 06. Implementing Jinja2 template 205-223

### Intro

{% expror logic %}
{{ output }}
{# comment #}

{% for user in users %}
    {{ user }}
{% endfor %}

{% for myuser in users if not myuser == "Snoopy" %}
{{loop.index}} - {{myuser}}
{% endfor %}

{% if finished %}
    {{result}}
{% endif %}

{{output | to_json}}
{{output | to_yaml}}

exist: to_nice_json, to_nice_yaml, from_yaml, from_json

in when clauses:
* when: returnvalue | failed
* when: returnvalue | changed
* when: returnvalue | succeeded
* when: returnvalue | skipped

### build jinja2 template

### use jinja2 in playbook

```yml
tasks:
    - name: template render
        template:
            src: /rmp/j2-template.j2
            dest: /tmp/dest-config-file.txt
```

### demo

```jinja2
This system is base on {{ ansible_distribution }} {{ ansible_distribution_version }} deployed on {{ ansible_architecture }} architecture.
```

```yml
---
- hosts: all
    user: devops
    become: true
    tasks:
        - template:
            src: motd-facts.j2
            dest: /etc/motd
            owner: root
            group: root
            mode: 0644
```

### exo

```jinja2
This system {{ ansible_hostname }}
Today's date is: {{ ansible_date_time.date }}
Only use this system with permission
You can ask {{ system_owner }} for access.
```


```yml
---
- hosts: all
    user: devops
    become: true
    vars:
        system_owner: clyde@example.com
    tasks:
        - template
            src: motd.j2
            dest: /etc/motd
            owner: root
            group: root
            mode: 0644

```

## 07 Implementing Roles 225-265

### structure

* defaults: main.yml contains default value of role s variable, can be overwritten
* files: static file
* handlers: main.yml containing handler
* meta: main.ymlcontains role info author, licence, platform, dependencies
* tasks: main.yml contains task
* templates: jinja2 template
* tests: test.yml playbook that can be used to test the role
* vars: main.yml define role s variable value

#### in default and vars:

var1: val1
var2: val2

#### in meta/main.yml

```yml
---
dependencies:
- { role: apache, port: 8080 }
- { role: postgres, dbname: serverlist, admin_user: felix }
```

#### order of execution

```yml
# pre_task, task, post_tasks
---
- hosts: remote.example.com
    pre_tasks:
        - debug:
            msg: 'hello'
    roles:
        - role1
        - role2
    tasks:
        - debug:
            -msg: 'still busy'
    post_tasks:
        - debug:
            msg: 'goodbye'
```

### use role in playbook

```yml
---
- hosts: remote.example.com
    roles:
        - role1
        - role2
            var1: val1
            var2: val2
```

### creating roles

```yml
---
# roles/motd/tasks/main.yml
- name: deliver motd file
    template:
        src: templates/motd.j2
        dest: /etc/motd
        owner: root
        group: root
        mode: 0444
```

```jinja2
{# roles/motd/templates/motd.j2 #}
This is the system {{ ansible_hostname }}.

Today's date is: {{ ansible_date_time.date }}.

Only use this system with permission.
You can ask {{ system_owner }} for access.
```

```yml
---
# roles/motd/defaults/main.yml
system_owner: user@host.example.com
```

```yml
---
# use-motd-role.yml
- name: use motd role playbook
    hosts: remote.example.com
    user: devops
    become: true

    roles:
        - motd
```

### exo

```yml
---
# tasks/main.yml

- name: install httpd
    yum:
        name: httpd
        state: latest
- name: start and enable httpd service
    service:
        name: httpd
        state: started
        enabled: true
- name: deliver html content
    copy:
        src: html/
        dest: "/var/www/vhost/{{ ansible_hostname }}"
- name: template vhost file
    template:
        src: vhost.conf.j2
        dest: /etc/httpd/conf.d/vhost.conf
        owner: root
        group: root
        mode: 0644
    notify:
        - restart httpd
```

```yml
---
# handlers/main.yml

- name: restart httpd
    service
        name: httpd
        state: restarted
```

```yml
---
# use-vhost-role.yml
- name: use vhost playbook
    host: webservers
    pre_tasks:
        - debug:
            - msg: 'Beginning web server configuration.'
    roles:
        - myvhost
    post_tasks:
        - debug:
            msg: 'Web server has been configured.'
```

### ansible-galaxy

```bash
ansible-galaxy search 'install git' --platform el
ansible-galaxy info davidkarban.git
ansible-galaxy install davidkarban.git -p roles
```

p249 (268/495)

## 08. Optimizing Ansible 267-313

## 09. Implementing Ansible Vault 315-342

## 10. Troubleshooting Ansible 343-368

## 11. Implementing Ansible Tower 369-397

## 12. Implementing Ansible in a Devops Environment 399-424

## 13. Comprehensive Review: Automation with Ansible 425-466
