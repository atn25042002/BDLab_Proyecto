from flask import Flask, render_template, request, redirect, url_for
import os
import database as db

template_dir = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'src', 'templates')

app= Flask(__name__, template_folder=template_dir)

#Rutas
@app.route('/')
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
    return render_template('index.html', data=insertObject)

@app.route('/section', methods=['POST'])
def addSection():
    SecCod = request.form['seccod']
    SecNom = request.form['secnom']
    SecEstReg = request.form['secestreg']

    if SecCod and SecNom and SecEstReg:
        cursor= db.database.cursor()
        sql= "INSERT INTO lzz_seccion (SecCod, SecNom, SecEstReg) VALUES(%s, %s, %s)"
        data = (SecCod,SecNom,SecEstReg)
        cursor.execute(sql,data)    
        db.database.commit()
    return redirect(url_for('home'))

# Funcion de eliminar registros a nivel físico
#@app.route('/delete/<string:seccod>')
#def delete(seccod):
#    cursor = db.database.cursor()
#    sql= "DELETE FROM lzz_seccion WHERE SecCod=%s"
#    data= (seccod, )
#    cursor.execute(sql,data)
#    db.database.commit()
#    return redirect(url_for('home'))

@app.route('/edit/<string:seccod>', methods=['POST'])
def edit(seccod):
    SecCod = request.form['seccod']
    SecNom = request.form['secnom']
    SecEstReg = request.form['secestreg']

    if SecCod and SecNom and SecEstReg:
        cursor= db.database.cursor()
        sql= "UPDATE lzz_seccion SET SecNom = %s, SecEstReg = %s WHERE SecCod = %s"
        data = (SecNom,SecEstReg,SecCod)
        cursor.execute(sql,data)    
        db.database.commit()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True, port= 4000)