Vault - User
############

Login
*****

* :code:`vault login -method=github`

Basic CRUD
**********

post/put
========

* vault kv put secret/hello foo=world
* vault kv put secret/hello foo=world excited=yes

get
===

* vault kv get secret/hello
* vault kv get -field=excited secret/hello
* vault kv get -format=json secret/hello | jq -r .data.data.excited

delete
======

* vault kv delete secret/hello

.. warning:: The documentation uses the key=value based entry throughout, but it is more secure to use files if possible. Sending data via the CLI is often logged in shell history. For real secrets, please use files.

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.08.04 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
