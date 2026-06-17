FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root123
ENV MYSQL_DATABASE=crazychicken

COPY db.sql /docker-entrypoint-initdb.d/
