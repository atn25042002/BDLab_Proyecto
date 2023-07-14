import mysql.connector

database=  mysql.connector.connect(
    host='localhost',
    user='root',
    password='admin',
    database='bd_lab09'
)