FROM nginx:1.28-alpine3.23

COPY ./dist /data/www/
COPY devops-nginx.conf /etc/nginx/conf.d/devops-nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf