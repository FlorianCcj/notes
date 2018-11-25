# Tuto from knp labs

https://knplabs.com/fr/blog/how-to-dockerise-a-symfony-4-project

## organize dir

```
- apps/
  - my-sf-app
- bin/
- docker/
- .env
- docker-compose.yml
```

```
# transfer any incoming request to php-fpm on port 9000.
fastcgi_pass php:9000;
```

docker-compose build
docker-compose up -d
 docker-compose stop  
docker-compose exec php composer install
docker-compose exec php bin/console doctrine:schema:create
docker-compose exec php bin/console doctrine:fixtures:load
docker-compose exec php bin/console assets:install –symlink public/

## add a mysql base

```
# .env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=example

NGINX_PORT=80

ADMINER_PORT=8080

LOCAL_USER=1000:1000
```
