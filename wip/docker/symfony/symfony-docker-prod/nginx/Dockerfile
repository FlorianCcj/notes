FROM nginx:alpine

# default workdir is /var/www/html (see base dockerfile)
WORKDIR /var/www/html/
ADD ./web/* ./
ADD docker/default.conf /etc/nginx/conf.d/
RUN chown -R nginx:nginx /var/www/html
