import mysql.connector

database = mysql.connector.connect(
    host='127.0.0.1',       # o 'localhost'
    user='admin',           # mismo que en docker-compose.yml
    password='admin',       # mismo que en docker-compose.yml
    database='inventario_db'  # nombre definido en el initdb
)