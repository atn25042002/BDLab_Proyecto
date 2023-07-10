from flask import Flask, render_template, request, redirect, url_for
import os
import database as db
from data import atributos, campos

template_dir = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'src', 'templates')

app= Flask(__name__, template_folder=template_dir, static_folder='static')

#Rutas
#columnNames = [column[0] for column in cursor.description]

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/<string:entidad>')
def show(entidad):
    cursor= db.database.cursor()
    nombre= atributos[entidad][0]
    cursor.execute('SELECT * FROM ' + nombre)
    myresult= cursor.fetchall()
    insertObject= []
    columnNames = ['Cod', 'Nom', 'EstReg']
    for record in myresult:
        insertObject.append(dict(zip(columnNames, record)))
    cursor.close()

    return render_template('referencial.html', data=insertObject, name=entidad, campos= campos[entidad])

#@app.route('/<string:entidad>', methods=['POST'])
@app.route('/<string:entidad>/add', methods=['POST'])
def addSection(entidad):
    Cod = request.form['codForm']
    Nom = request.form['nomForm']
    EstReg = request.form['estForm']
    #c= atributos[entidad]

    if Cod and Nom and EstReg:
        cursor= db.database.cursor()            
        cabecera= atributos[entidad].copy()
        nombre= cabecera.pop(0) #nombre real de la tabla con sufijos
        num_llaves = len(cabecera)
        llaves = ",".join(["{}" for _ in range(num_llaves)])
        sql= "INSERT INTO {} ({}) VALUES(%s, %s, %s)".format(nombre,llaves)        
        sql= sql.format(*cabecera)
        data = (Cod,Nom,EstReg)
        cursor.execute(sql,data)    
        db.database.commit()
    return redirect(url_for('show',entidad= entidad))

# Funcion de eliminar registros a nivel físico
#@app.route('/delete/<string:seccod>')
#def delete(seccod):
#    cursor = db.database.cursor()
#    sql= "DELETE FROM lzz_seccion WHERE SecCod=%s"
#    data= (seccod, )
#    cursor.execute(sql,data)
#    db.database.commit()
#    return redirect(url_for('home'))

@app.route('/<string:entidad>/edit/<string:seccod>', methods=['POST'])
def edit(seccod, entidad):
    Cod = request.form['codForm']
    Nom = request.form['nomForm']
    EstReg = request.form['estForm']

    if Cod and Nom and EstReg:
        cursor= db.database.cursor()
        cabecera = atributos[entidad].copy()
        nombre= cabecera.pop(0) #nombre real de la tabla con sufijos
        id= cabecera.pop(0) 
        num_llaves = len(cabecera)
        llaves = ",".join(["{} = %s" for _ in range(num_llaves)])
        sql= "UPDATE {} SET {} WHERE {} = %s".format(nombre,llaves,id)        
        sql= sql.format(*cabecera)
        #sql= "UPDATE lzz_{} SET {} = %s, {} = %s WHERE {} = %s".format(entidad, c[1], c[2], c[0])
        data = (Nom,EstReg,Cod)
        cursor.execute(sql,data)    
        db.database.commit()
    return redirect(url_for('show',entidad= entidad))

if __name__ == '__main__':
    app.run(debug=True, port= 4000)