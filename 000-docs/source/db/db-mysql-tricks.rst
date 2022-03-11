DB - MySQL - Tricks
###################

save and restore
****************

.. code-block:: bash

    mysqldump -h <host> -u <user> -p<pwd> --opt | mysql -h <host> -u <user> -p<pwd> -c <base_name>

out of the box
mysql -u root -proot: connect to the db
mysql --host=localhost --user=myname --password=password mydb

in the box
CREATE USER 'non-root'@'localhost' IDENTIFIED BY '123';: create a new user

FLUSH PRIVILEGES; : prend en compte les changement
GRANT [permission type] ON [database name].[table name] TO ‘non-root’@'localhost’; : changement des privilege

permission type : CREATE, SELECT, INSERT, UPDATE, DELETE, DROP

GRANT CREATE, SELECT ON * . * TO 'non-root'@'localhost';
REVOKE [permission type] ON [database name].[table name] FROM ‘non-root’@‘localhost’;
REVOKE ALL PRIVILEGES ON *.* FROM 'non-root'@'localhost';
DROP USER ‘non-root’@‘localhost’;

SHOW DATABASES;
CREATE DATABASE symfony;
USE symfony;
SHOW TABLES;
SELECT * FROM member;
SELECT COUNT(*) FROM member;

Sources
*******

* mysqldump: work

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2020.03.05 | V1.0    | get my note from work                                              |
+------------+---------+--------------------------------------------------------------------+
