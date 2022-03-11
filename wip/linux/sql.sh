mysql -u root -proot : se connecter a mysql
creer un new user : CREATE USER 'non-root'@'localhost' IDENTIFIED BY '123';

FLUSH PRIVILEGES; : prend en compte les changement
GRANT [permission type] ON [database name].[table name] TO ‘non-root’@'localhost’; : changement des privilege
permission type : CREATE, SELECT, INSERT, UPDATE, DELETE, DROP

GRANT CREATE, SELECT ON * . * TO 'non-root'@'localhost';
REVOKE [permission type] ON [database name].[table name] FROM ‘non-root’@‘localhost’;
REVOKE ALL PRIVILEGES ON *.* FROM 'non-root'@'localhost';
DROP USER ‘non-root’@‘localhost’;
