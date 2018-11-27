FROM php:7-fpm-alpine

# uid de softuser
ARG UID=45050
ARG GID=45050

# default workdir is /var/www/html (see base dockerfile)
ADD ./ ./
RUN usermod --non-unique --uid $UID --home '/var/www/html' www-data \
	&& groupmod --non-unique --gid $GID www-data \
	&& chown -R www-data:www-data /var/www/html
