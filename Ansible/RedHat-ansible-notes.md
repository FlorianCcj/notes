# RedHat-ansible-notes.md

## Command

`ansible-playbook test.yml`: launch playbook

`ansible-playbook --syntax-check test.yml`: check synthax

`ansible-playbook -c test.yml`: dry run

`ansible dev -i inventory --list-host`: liste les serveurs du group designer

special group:

* all
* ungrouped

`ansible host-pattern -m module [-a 'module arguments'] [-i inventory]`

`ansible-doc -l`: get module list
`ansible-doc ping`: get module detail

`ansible -m user`
`ansible -m user -a 'name=florianccj uid=4000 state=present'` localhost

`ansible demo1.example.com -m setup`

`ansible demo1.example.com -m setup -a 'filter=ansible_eth0'`

`ansible demo1.example.com -m setup -a 'filter=ansible_local'`: will read in /etc/ansible/facts.d/custom.fact

### privilege escalation

`ansible localhost -m copy -a 'content="Managed by Ansible\n" dest=/etc/motd' -u devops`: create a file with the content in

`ansible localhost -m copy -a 'content="Managed by Ansible\n" dest=/etc/motd' -u devops --become`: pass root to do it

### Option

setting: command-line option
inventory       : -i
remote-user     : -u
become          : -b, --become
become_method   : --become-method 
become_user     : --become-user
become_ask_pass : -K, --ask-become-pass 

## Inventory

```yml
[dev]
servera.lab.example.com

[qualif]
serverb.lab.exemple.com

[prod]
serverc.lab.example.com

[supervision]
serverd.lab.example.com

[supervision:vars]
# usable in playbook
user=joe

[supervision:children]
qualif
prod
```

### Dynamic Inventory

not a lot of info ... go and see https://docs.ansible.com/ansible/intro_inventory.html

### vars for group

```yaml
# group_var/my_super_group_for_windobe
# usable in playbook
ansible_connection: winrm
ansible_port: 5986
```

## playbook

### full example

```yaml
- name: Enable intranet services
    host: servera.lab.example.com
    become: yes
    tasks:
        - name: test html page is installed
            copy:
                content: "Welcome to the example.com intranet! \n"
                dest: /var/www/html/index.html
        - name: Prints various Ansible facts
            debug:
                msg: > 
                    The default IPv4 address of {{ ansible_fqdn }}
                    is {{ ansible_default_ipv4.address }}
        - name: create the remote dir
            file:
                state: directory
                recurse: yes
                path: {{ remote_dir }}
        - name: test php page is intalled
            get_url:
                url: "http://materials.exemple.com/grading/var/www/html/index.php"
                dest: /var/www/html/index.php
                mode: 0644
        - name: server.example.com in /etc/hosts
            lineinfile:
                path: /etc/hosts
                line: '192.0.2.42 server.example.com server'
                state: present
        - name: httpd enable and running
            service:
                name: httpd
                enabled: true
                state: started
        - name: latest version of httpd and firewalld installed
            yum:
                name:
                    - httpd
                    - firewalld
                state: latest
- name: Test intranet web server
    host: localhost
    become: no
    tasks:
        - name: connect to intranet web server
            uri:
                url: http://servera.lab.example.com
                status_code: 200
```

### include

```yaml
# playbook
- name: all variable
    hosts: all
    vars_files:
        - vars/users.yml
    tasks:
        - name: Create the user {{ user }}
            user:
                name: "{{ user }}"
```

```yml
# vars/users.yml
user: joe
home: /home/joe
```

```yaml
tasks:
    - name: Include tasks to install the db server
        include: tasks/db_server.yml
        # overwritten
        vars:
            packages:
                web_pkg: tomcat
    - name: Include the variables from a YAML or JSON file
        include_vars: vars/variables.yml
```

```yaml
# vars/variables.yml
---
packages:
    web_package: httpd
    db_package: mariadb-server
```

```yml
---
# tasks/db_server.yml
- name: Installweb app packages
    host: all
    tasks:
        - name: Debugs the variables imported
            debug:
                msg: >
                    "{{package['web_package']}} and {{package.db_package}} 
                    have been imported"
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

### task controll

```yml
tasks:
    - name: Postfix and Dovecot are running
        service:
            name: "{{ item }}"
            state: started
        with_items:
            - postfix
            - dovecot
    - name: Postfix and Dovecot are running
        service:
            name: "{{ item }}"
            state: started
        with_items: "{{ mail_services }}"
    - name: Users exist and are in the correct groups
        user:
            name: "{{ item.name }}"
            state: present
            groups: "{{ item.groups }}"
        with_items:
            - { name: 'jane', groups: 'wheel' }
            - { name: 'joe', groups: 'root' }
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

* ==, <, >, >=, <=, !=
* is defined, is not defined
* <nom de la variable>, not <nom de la variable>
* a in b, and, or

### handlers

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

### tags

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

### block

rescue and always are optionnal

```yml
- name: block example
    host: all
    tasks:
        - block:
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

## Config

1. `$ANSIBLE_CONFIG`
2. `./ansible.cfg`
3. `~/.ansible.cfg`
4. `/etc/ansible/ansible.cfg`

`ansible servers --list-hosts -v`

`grep "^\[" /etc/ansible/ansible.cfg`: show all config category

```yaml
[defaults]
inventory = ./inventory
remote_user: root
ask_pass: false

[privilege_escalation]
become = true
become_method = sudo
become_user = root
become_ask_pass = false
```

## Utils


### ssh key

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

### STAY IDEMPOTENT !!!

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
