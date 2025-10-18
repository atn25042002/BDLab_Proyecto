# Imagen base de MySQL
FROM mysql:8.0

# Copia los scripts de inicialización
COPY ./initdb /docker-entrypoint-initdb.d/

# Configura el juego de caracteres y collation por defecto
ENV LANG=C.UTF-8
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=inventario_db
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin

# Puerto expuesto
EXPOSE 3306