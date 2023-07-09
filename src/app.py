from flask import Flask, render_template, request, redirect, url_for
import os
import database as db

template_dir = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'src', 'templates')

app= Flask(__name__, template_folder=template_dir, static_folder='static')

atributos={
    'seccion' : ['SecCod', 'SecNom', 'SecEstReg'],
    'marca' : ['MarCod', 'MarNom', 'MarEstReg'],
    'tipo_movimiento' : ['TipMovCod', 'TipMovDes', 'TipMovEstReg'],
    'tipo_ticket' : ['TipTickNro', 'TipTickDes', 'TipTickEstReg'],
}

campos={
    #[nombre del atributo, tipo(1 si es numerico), longitud maxima]
    'seccion' : [ ['Código de la Sección',0,6] , ['Nombre de la Seccion',0,60] ],
    'marca' : [['Código de la marca',0,6],['Nombre de la marca',0,60]],
    'tipo_movimiento' : [['Código del Tipo de Movimiento', 0, 3],['Descripción',0,7]],
    'tipo_ticket' : [['Código del Tipo de Ticket', 1, 2],['Descripción',0,60]],
}

'''
tipoCam={
    'seccion' : [0,0],
    'marca' : [0,0],
    'tipo_movimiento' : [0,0],
    'tipo_ticket' : [1,0],
}
longitudMax={
    'seccion' : [6,60],
    'marca' : [6,60],
    'tipo_movimiento' : [3,7],
    'tipo_ticket' : [2,60],
}'''

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

    return render_template('index.html', data=insertObject, name=entidad, campos= campos[entidad])

#@app.route('/<string:entidad>', methods=['POST'])
@app.route('/<string:entidad>/add', methods=['POST'])
def addSection(entidad):
    Cod = request.form['codForm']
    Nom = request.form['nomForm']
    EstReg = request.form['estForm']
    c= atributos[entidad]

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
    Cod = request.form['codForm']
    Nom = request.form['nomForm']
    EstReg = request.form['estForm']
    c= atributos[entidad]

    if Cod and Nom and EstReg:
        cursor= db.database.cursor()
        sql= "UPDATE lzz_{} SET {} = %s, {} = %s WHERE {} = %s".format(entidad, c[1], c[2], c[0])
        data = (Nom,EstReg,Cod)
        cursor.execute(sql,data)    
        db.database.commit()
    return redirect(url_for('show',entidad= entidad))

if __name__ == '__main__':
    app.run(debug=True, port= 4000)