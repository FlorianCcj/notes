# README.md

https://medium.com/q-software/symfony-5-the-rest-the-crud-and-the-swag-7430cb84cd5

docker run -it --rm -u ${UID} -v "$(pwd)"/mount:/app composer:1.8.6 bash
composer create-project symfony/skeleton project-name

php -S localhost:8000 -t public

TUTO
====

create project
php server
controller + annotation
entity + maker
fixtures + faker
controler + orm
les migrations
paramconverter

DB
==

without volume

docker run --rm --name mysql -e MYSQL_ROOT_PASSWORD="root" -e MYSQL_DATABASE="symfony" -e MYSQL_USER="symfony" -e MYSQL_PASSWORD="symfony" -d -p 3306:3306 mysql --default-authentication-plugin=mysql_native_password

relative path

docker run --rm --name mysql -e MYSQL_ROOT_PASSWORD="root" -e MYSQL_DATABASE="symfony" -e MYSQL_USER="symfony" -e MYSQL_PASSWORD="symfony" -v $(pwd)/mysql-data-dir:/var/lib/mysql -d -p 3306:3306 mysql --default-authentication-plugin=mysql_native_password

Full path

docker run --rm --name mysql -e MYSQL_ROOT_PASSWORD="root" -e MYSQL_DATABASE="symfony" -e MYSQL_USER="symfony" -e MYSQL_PASSWORD="symfony" -v /home/florianccj/Document/git-github/notes/000-src/symfony/mount/mysql-data-dir:/var/lib/mysql -d -p 3306:3306 mysql --default-authentication-plugin=mysql_native_password


Volume Method 1
---------------

docker volume create mysql-data

docker run --name mysql -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest

# data can be find with :code:`docker volume inspect mysql-data`

Volume Method 2
---------------

mkdir mysql-data-dir

docker run --name mysql -v $(pwd)/mysql-data-dir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest

Dump and restore

docker exec some-mysql sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql
 docker exec -i some-mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /some/path/on/your/host/all-databases.sql




curl -OL https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar
chmod +x phpcs.phar
mv phpcs.phar /usr/local/bin/phpcs






test ? https://github.com/eko/docker-symfony/blob/master/docker-compose.yml


