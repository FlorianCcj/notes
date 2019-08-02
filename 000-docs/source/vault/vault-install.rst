Vault-Install
#############

Info
****

vault without HA is useless

Install
*******

main
====

# curl https://releases.hashicorp.com/vault/1.0.3/vault_1.0.3_linux_amd64.zip -o /tmp/vault_1.0.3_linux_amd64.zip
# sudo unzip /tmp/vault_1.0.3_linux_amd64.zip -d /usr/bin
# sudo chmod +x /usr/bin/vault
# vault -h

add vault to path
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

* start dev serv: vault server -dev # detail on https://www.vaultproject.io/docs/concepts/dev-server.html
* check install: vault -h
* check_server_status: vault status

conf:

* autocomplete: vault -autocomplete-install
* point_on_server: export VAULT_ADDR='http://127.0.0.1:8200'
* save_your_token: export VAULT_DEV_ROOT_TOKEN_ID="s.lAGjfIHZvoMqWWoy6chM1pjw"

.. warning::
    Never print secret in your server history

Tips
====

To don t print token in your history:

- use_dash: vault kv put kv-v1/eng/apikey/Google key=- # will ask you to enter secret, to end ctrl+d
- read_in_file: vault kv put kv-v1/eng/apikey/Google @apikey.json
- disable_vault_history: export HISTIGNORE="&:vault*"

***
***
***



    
  dont_print_secret_in_history:
    