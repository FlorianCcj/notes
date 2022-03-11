Vault - Admin
#############

Secret_engine
*************

Def
===

I see secret engine as root directory. When you install vault you already one by  default: :code:`secret`
But you can create as many as you want

Command
=======

* :code:`vault secrets list`
* :code:`vault secrets enable -path=test kv` : add a new secret engine typed kv
* :code:`vault secrets disable test`: remove secret engine named test

Token
*****

Def
===

You should create token only in some exceptional moment,generally use Github, LDAP, AppRole, etc auth system

Command
=======

* :code:`vault token create`                                : create a token with the same right than the current token used
* :code:`vault token revoke <token>`                        : remove all peròission in a token
* :code:`vault token renew (-increment=<EXTENSION>) <TOKEN>`:
* :code:`vault token create -policy=default -use-limite=2`  : create a token with a certain number of use

* :code:`vault write auth/token/roles/zabbix allowed_policies="default" period="24h"`
* :code:`vault token create -role=zabbix`

Token check
-----------

* :code:`VAULT_TOKEN=3B1X9cnfkFYSJh4QS2ma7Cug vault token lookup`                           : check token detail
* :code:`VAULT_TOKEN=3B1X9cnfkFYSJh4QS2ma7Cug vault write cubbyhole/token value=1234567890` : test to write
* :code:`VAULT_TOKEN=3B1X9cnfkFYSJh4QS2ma7Cug vault read cubbyhole/token`                   : test to read

API
===

* .. code-block:: console

    # like :code:`vault token create -policy=default -use-limite=2
    curl --header "X-Vault-Token: ..." --request POST \
        --data '{ "policies": ["default"], "num_uses":2 }' \
        http://127.0.0.1:8200/v1/auth/token/create | jq
* .. code-block:: console

    # like :code:`export VAULT_TOKEN=3oV2cF9K94Z58gwlnKSPHfu1 && vault token lookup`
    curl --header "X-Vault-Token: 3oV2cF9K94Z58gwlnKSPHfu1" http://127.0.0.1:8200/v1/auth/token/lookup-self | jq

* .. code-block:: console

    # to write
    curl --header "X-Vault-Token: d9c2f2e5-6b8a-4021-476c-ebd3f166d668"
        --request POST
        --data '{ "value": "d9c2f2e5-6b8a-4021-476c-ebd3f166d668" }'
        http://127.0.0.1:8200/v1/cubbyhole/token

* .. code-block:: console

    tee payload.json <<EOF
    {
        "allowed_policies": [
            "default"
        ],
        "period": "24h"
    }
    EOF
    curl --header "X-Vault-Token: ..." --request POST --data @payload.json http://127.0.0.1:8200/v1/auth/token/roles/zabbix
    curl --header "X-Vault-Token: ..." --request POST http://127.0.0.1:8200/v1/auth/token/create/zabbix | jq

Auth
****

* :code:`vault auth enable approle`: activate a new auth method
* :code:`vault auth enable -path=github github`: activate github auth method
* :code:`vault write auth/github/map/teams/my-team value=default,my-policy`: ???

* :code:`vault auth help github`
* :code:`vault auth help aws`
* :code:`vault auth help userpass`
* :code:`vault auth help token`

* :code:`vault login -method=github`

.. warning:: Find what is github F*** teams are

Policies and role
*****************

Policies
========

Command
-------

* .. code-block:: yaml

    # jenkins-pol.hcl
    # Login with AppRole
    path "auth/approle/login" {
        capabilities = [ "create", "read" ]
    }

    # Read test data
    # Set the path to "secret/data/mysql/*" if you are running `kv-v2`
    path "secret/mysql/*" {
        capabilities = [ "read" ]
    }

* :code:`vault policy write <POLICY_NAMES> <PATH_TO_HCL_FILE>`: add file :code:`jenkins-pol.hcl` in policy :code:`jenkins`
* :code:`vault policy fmt my-policy.hcl`: check policy synthax

Check
^^^^^

* :code:`vault token create -policy=my-policy`
* :code:`vault login s.X6gvFko7chPilgV0lpWXsdeu`

Example
^^^^^^^

* :code:`vault policy write jenkins jenkins-pol.hcl`: example
* .. code-block:: console

    vault policy write my-policy -<<EOF
    # Normal servers have version 1 of KV mounted by default, so will need these
    # paths:
    path "secret/*" {
        capabilities = ["create", "update"]
    }
    path "secret/foo" {
        capabilities = ["read"]
    }

    # Dev servers have version 2 of KV mounted by default, so will need these
    # paths:
    path "secret/data/*" {
        capabilities = ["create", "update"]
    }
    path "secret/data/foo" {
        capabilities = ["read"]
    }
    EOF

* .. code-block:: ECL

    # Normal servers have version 1 of KV mounted by default, so will need these
    # paths:
    path "secret/*" {
        capabilities = ["create"]
    }
    path "secret/foo" {
        capabilities = ["read"]
    }

    # Dev servers have version 2 of KV mounted by default, so will need these
    # paths:
    path "secret/data/*" {
        capabilities = ["create"]
    }
    path "secret/data/foo" {
        capabilities = ["read"]
    }

Role
====

Def
---

A role is a label on which you can asign temporality, periodicity, policies, ... to assign  it all together to token

Command
-------

* :code:`vault read auth/approle/role/jenkins`: print role
* :code:`vault list auth/approle/role`: list role
* :code:`vault write auth/approle/role/jenkins policies="jenkins"`: associate/create a role with a policy
* :code:`vault write auth/approle/role/jenkins policies="jenkins,anotherpolicy"`: associate a role with multiple policy

* :code:`vault write auth/token/roles/<ROLE_NAME> allowed_policies="<POLICY_NAMES>" period=<RENEWAL_PERIOD>`
                                                            : create role for token which will be renewal all :code:`<RENEWAL_PERIOD>`
* :code:`vault write auth/approle/role/jenkins policies="jenkins" period="72h"`: Create a role for your app specifying that the generated token should be periodic
* :code:`vault write auth/approle/role/shipping policies="shipping" token_type="batch" token_ttl="60s": generate batch token`

Manage AppRole
**************

Command
=======

* :code:`vault read auth/approle/role/jenkins/role-id`: acces/generate role/secret-id
* :code:`vault write -f auth/approle/role/jenkins/secret-id`: acces/generate role/secret-id

Todo
====

.. warning:: Todo

.. code-block:: yaml

    login:
      persona: app
      cli: vault write auth/approle/login role_id="675a50e7-cfe0-be76-e35f-49ec009731ea" secret_id="ed0a642f-2acf-c2da-232f-1b21300d5f29"
      api:
        payload.json: { "role_id": "675a50e7-cfe0-be76-e35f-49ec009731ea", "secret_id": "ed0a642f-2acf-c2da-232f-1b21300d5f29"}
        cmd: curl --request POST --data @payload.json http://127.0.0.1:8200/v1/auth/approle/login | jq
    read_secret:
      cli: VAULT_TOKEN=3e7dd0ac-8b3e-8f88-bb37-a2890455ca6e vault kv get secret/mysql/webapp # No value found at secret/mysql/webapp
      cli2: >
        vault login 3e7dd0ac-8b3e-8f88-bb37-a2890455ca6e
        vault kv get secret/mysql/webapp
      api: 'curl --header "X-Vault-Token: 3e7dd0ac-8b3e-8f88-bb37-a2890455ca6e" --request GET http://127.0.0.1:8200/v1/secret/data/mysql/webapp | jq'
    add_value:
      mysqldb.json: >
        {
          "url": "foo.example.com:35533",
          "db_name": "users",
          "username": "admin",
          "password": "pa$$w0rd"
        }
      cli: vault kv put secret/mysql/webapp @mysqldb.txt
      api: 'curl --header "X-Vault-Token: ..." --request POST --data @mysqldb.txt'

Prod
****

Check status
============

* :code:`curl -sS http://localhost:8200/v1/sys/health | jq`
* :code:`curl -sS http://localhost:8200/v1/sys/seal-status | jq`

Deployment
==========

multi cluster need entreprise licence

* 8 nodes:
    - consul agent on each nodes
    - vault server on 3 of them
* small_cluster:
    - vault: 2 core 4-8 Gi RAM 25 Gi Disk
    - consul: 2 core 8-16 Gi RAM 50 Gi Disk
* large_cluster:
    - vault: 4-8 core 16-32 Gi RAM 50 Gi Disk
    - consul: 4-8 core 32-64+ Gi RAM 100 Gi Disk

Hardening
=========

* e2e TLS
* single tenancy: only vault on the machine
* firewall trafic: ?
* disable SSH/remote desktop
* disable swap
* don t run as root: vault is designed to run as unprevileged user
* turn off core dumps: set RLIMIT_CORE to 0 to disable core dump
* immutable upgrade
* avoid root token:
* enable auditing

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.08.04 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
