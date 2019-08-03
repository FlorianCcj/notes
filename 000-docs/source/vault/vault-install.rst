Vault - Install
###############

Info
****

vault without HA is useless

Install
*******

Main
====

# curl https://releases.hashicorp.com/vault/1.0.3/vault_1.0.3_linux_amd64.zip -o /tmp/vault_1.0.3_linux_amd64.zip
# sudo unzip /tmp/vault_1.0.3_linux_amd64.zip -d /usr/bin
# sudo chmod +x /usr/bin/vault
# vault -h

Add vault to path
=================
* add it in usr/bin or /usr/local/bin
* add it in .bashrc `export $PATH=$PATH:/path/to/dir/with/bin`
* ln -s /path/to/bin /usr/bin/bin_name

Plugin
======

plugin are located here: 
vault/builtin/credential/approle/cmd/approle

Some other command
******************

Main
====

* start dev serv: vault server -dev # detail on https://www.vaultproject.io/docs/concepts/dev-server.html
* check install: vault -h
* check_server_status: vault status

Client Conf
===========

* autocomplete: vault -autocomplete-install
* point_on_server: export VAULT_ADDR='http://127.0.0.1:8200'
* save_your_token: export VAULT_DEV_ROOT_TOKEN_ID="s.lAGjfIHZvoMqWWoy6chM1pjw"

.. warning::
    the ligne to export VAULT_TOKEN 

.. warning::
    Never print secret in your server history

Tips
====

To don t print token in your history:

- use_dash: vault kv put kv-v1/eng/apikey/Google key=- # will ask you to enter secret, to end ctrl+d
- read_in_file: vault kv put kv-v1/eng/apikey/Google @apikey.json
- disable_vault_history: export HISTIGNORE="&:vault*"

Todo
****

.. warning:: Todo: read those document

* <https://learn.hashicorp.com/vault/developer/iam-authentication>_ -> advanced features reponse_wrapping
* <https://www.hashicorp.com/blog/authenticating-applications-with-vault-approle>_
* <https://www.hashicorp.com/blog/building-a-vault-secure-plugin>_