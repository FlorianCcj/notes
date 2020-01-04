DB - Postgres User Permissions
##############################

There are no users in Postgres, just role

in the prompt if you have => instead of =# it means that you don t have superuser right

* :code:`psql postgres`: login with username postgres
* :code:`psql postgres -U testing`: login with another user
* :code:`\du`: list roles
* :code:`\q`: quit
* :code:`CREATE ROLE <role>;`: create a role but without right to login
* :code:`CREATE ROLE <role> WITH LOGIN;`: create a role but with right to login
* :code:`CREATE ROLE <role> WITH LOGIN PASSWORD <pwd>;`: create a role but with right to login and a password
* :code:`CREATE USER <role> PASSWORD <pwd>;`: same as :code:`CREATE ROLE <role> WITH LOGIN PASSWORD <pwd>;`
* :code:`DROP ROLE <role>`: remove a role
* :code:`ALTER ROLE <role> WITH LOGIN;`: edit a role to add attribute

Built-in role attributes


* :code:`LOGIN` / :code:`NOLOGIN`: allow (or not) to login to Postgres
* :code:`SUPERUSER` / :code:`NOSUPERUSER`: allow (or not) superuser permissions. A database superuser will bypass other permission checks, except for LOGIN (it must be granted separately).
* :code:`CREATEDB` / :code:`NOCREATEDB`: allow (or not) the ability to create new databases
* :code:`CREATEROLE` / :code:`NOCREATEROLE`: allow (or not) the ability to create new roles
* :code:`CREATEUSER` / :code:`NOCREATEUSER`: allow (or not) the ability to create new users
* :code:`INHERIT` / :code:`NOINHERIT`: allow (or not) the ability to make the privileges inheritable
* :code:`REPLICATION` / :code:`NOREPLICATION`: grant (or not) replication permissions (an advanced topic we’ll not cover)

Group roles

* :code:`CREATE ROLE <groupname>;`: create group
* :code:`GRANT <groupname> TO <role>`: add a role in a group
* :code:`REVOKE <groupname> FROM <username>`: remove role from group

Group role attributes

* :code:`CREATE ROLE employee WITH CREATEDB INHERIT;`: every one in :code:`employee` group will have :code:`CREATEDB` right

Sources
*******

* https://flaviocopes.com/postgres-user-permissions/

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2020.01.20 | V1.0    | Some basic in postgres rights                                      |
+------------+---------+--------------------------------------------------------------------+
