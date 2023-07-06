from flask import Flask, render_template, request, redirect, url_for
import os
import database as db

template_dir = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'src', 'templates')

app= Flask(__name__, template_folder=template_dir, static_folder='static')

campos={
    'seccion' : ['SecCod', 'SecNom', 'SecEstReg'],
    'marca' : ['MarCod', 'MarNom', 'MarEstReg'],
    'tipo_movimiento' : ['TipMovCod', 'TipMovDes', 'TipMovEstReg'],
    'tipo_ticket' : ['TipTickNro', 'TipTickDes', 'TipTickEstReg'],
}

#Rutas
"""@app.route('/')
def home():
    cursor= db.database.cursor()
    cursor.execute('SELECT * FROM lzz_seccion')
    myresult= cursor.fetchall()
    insertObject= []
    columnNames = [column[0] for column in cursor.description]
    for record in myresult:
        print(record)
        insertObject.append(dict(zip(columnNames, record)))
    cursor.close()
    return render_template('index.html', data=insertObject)"""

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/<string:entidad>')
def show(entidad):
    cursor= db.database.cursor()
    cursor.execute('SELECT * FROM lzz_' + entidad)
    print('SELECT * FROM lzz_' + entidad)
    myresult= cursor.fetchall()
    insertObject= []
    columnNames = ['Cod', 'Nom', 'EstReg']
    print(columnNames)
    for record in myresult:
        print(record)
        insertObject.append(dict(zip(columnNames, record)))
    cursor.close()
    return render_template('index.html', data=insertObject, name=entidad)

#@app.route('/<string:entidad>', methods=['POST'])
@app.route('/<string:entidad>/add', methods=['POST'])
def addSection(entidad):
    Cod = request.form['seccod']
    Nom = request.form['secnom']
    EstReg = request.form['secestreg']
    c= campos[entidad]

    if Cod and Nom and EstReg:
        cursor= db.database.cursor()
        sql= "INSERT INTO lzz_{} ({}, {}, {}) VALUES(%s, %s, %s)".format(entidad, c[0],c[1],c[2])
        print(sql)
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
    SecCod = request.form['seccod']
    SecNom = request.form['secnom']
    SecEstReg = request.form['secestreg']
    c= campos[entidad]

    if SecCod and SecNom and SecEstReg:
        cursor= db.database.cursor()
        sql= "UPDATE lzz_{} SET {} = %s, {} = %s WHERE {} = %s".format(entidad, c[1], c[2], c[0])
        data = (SecNom,SecEstReg,SecCod)
        cursor.execute(sql,data)    
        db.database.commit()
    return redirect(url_for('show',entidad= entidad))

if __name__ == '__main__':
    app.run(debug=True, port= 4000)