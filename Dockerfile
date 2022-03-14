FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY /dist/eita /usr/share/nginx/html
