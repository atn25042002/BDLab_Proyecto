import database as db

#Maneja el nombre de los campos que contiene la Entidad en la base de Datos
atributos={
    'seccion' : ['lzz_seccion','SecCod', 'SecNom', 'SecEstReg'],
    'marca' : ['lzz_marca','MarCod', 'MarNom', 'MarEstReg'],
    'tipo_movimiento' : ['lzz_tipo_movimiento','TipMovCod', 'TipMovDes', 'TipMovEstReg'],
    'tipo_ticket' : ['lzz_tipo_ticket','TipTickNro', 'TipTickDes', 'TipTickEstReg'],
    'producto' : ['l1m_producto','ProCod', 'ProNom' , 'ProFecVenAño','ProFecVenMes','ProFecVenDia','ProStc','ProStcMin','ProStcMax','ProStcRsv', 'SecCod', 'MarCod','ProPreUni','UniMedNro','ProEstReg'],
    'proveedor' : ['l2m_proveedor','ProvCod','ProvNom','ProvNumCel','ProvDir','ProvEstReg'],
    'pedido_cabecera' : ['g2t_ped_cab','PedCabCod','ProvCod','PedCabPedAño','PedCabPedMes','PedCabPedDia','PedCabEntrAño','PedCabEntrMes','PedCabEntrDia','PedCabEstReg'],
    'pedido_detalle' : ['g2t_ped_det','PedDetNro','PedCabCod','ProCod','PedDetProCan','PedDetProPreUni','PedDetProPreTot','PedDetObs', 'PedDetEstReg'],
    'persona_juridica' : ['l2m_persona_juridica','PerJurCod','PerJurRazSoc','PerJurNumCel','PerJurEstReg'],
    'persona_natural' : ['l2m_persona_natural','PerNatCod','PerNatNom','PerNatNumCel','PerNatEstReg'],
    'ticket_cabecera' : ['g2t_ticket_cab','TickCabCod','PerJurCod','PerNatCod','TickCabAño','TickCabMes','TickCabDia','TipTickNro','TickCabEstReg'],
    'ticket_detalle' : ['g2t_ticket_det','TickDetNro','TickCabCod','ProCod','TickDetCanPro','TickDetPreUni','TickDetPreTot','TickDetEstReg'],
    'unidad_medida' : ['g2m_unidad_medida','UniMedNro','UniMedDescCor','UniMedDescLar','UniMedEstReg'],
    'act_inven_cabecera' : ['g2c_act_inventario_cab','ActInvCabCod','ActInvFecAño','ActInvFecMes','ActInvFecDia','TipMovCod','ActInvEstReg'],
    'act_inven_detalle' : ['g2c_act_inventario_det','ActInvDetNro','ActInvCabCod','ProCod','ActInvDetCanPro','ActInvDetMot','ActInvDetEstReg']
}

#Maneja el formato o restricciones que debe un valor para poder ingresarlos
campos={
    #[nombre del atributo, tipo(1 si es numerico), longitud maxima, dependencia(si la hubiera)]
    #0: Caracteres    1: Entero     2:Decimal    3:Llave foranea 
    'seccion' : [ ['Código de la Sección',0,6] , ['Nombre de la Seccion',0,60] ],
    'marca' : [['Código de la marca',0,6],['Nombre de la marca',0,60]],
    'tipo_movimiento' : [['Código del Tipo de Movimiento', 0, 3],['Descripción',0,7]],
    'tipo_ticket' : [['Código del Tipo de Ticket', 1, 2],['Descripción',0,60]],
    'producto' : [['Codigo de Producto',1,12],['Nombre de de Producto',0,60],['Fecha de Vencimiento(Año) del Producto',1,4],['Fecha de Vencimiento(Mes) del Producto',1,2]
            ,['Fecha de Vencimiento(Dia) del Producto',1,2],['Stock del Producto',1,3],['Stock Minimo del Producto',1,3],['Stock Maximo del Producto',1,3],['Stock de Reserva del Producto',1,3],
            ['Codigo de Seccion',3,6],['Codigo de Marca',3,6],['Precio Unitario del Producto',2,7],['Numero de Unidad de Medida',3,2]],
    'proveedor' : [['Codigo de Proveedor',1,11],['Nombre de Proveedor',0,40],['Numero de Celular de Proveedor',1,9],['Direccion de Proveedor',0,60]],
    'persona_juridica' : [['Codigo de Persona Juridica',1,11],['Razon Social',0,60],['Numero de Celular',1,9]],
    'persona_natural' : [['Codigo de Persona Natural',1,8],['Nombre de Persona Natural',0,60],['Numero de Celular',1,9]],
    'unidad_medida' : [['Numero de Unidad de Medida',1,2],['Descripcion Corta',0,4],['Descripcion Larga',0,40]],
    'pedido_cabecera' : [['Codigo de Pedido Cabecera',1,10],['Codigo de Proveedor',3,11],['Fecha Pedido(Año) de Pedido Cabecera',1,4],['Fecha Pedido(Mes) de Pedido Cabecera',1,2],['Fecha Pedido(Dia) de Pedido Cabecera',1,2],['Fecha Entrada(Año) de Pedido Cabecera',1,4],['Fecha Entrada(Mes) de Pedido Cabecera',1,2],['Fecha Entrada(Dia) de Pedido Cabecera',1,2]],
    'pedido_detalle' : [['Numero de Pedido Detalle',1,8],['Codigo de Pedido Cabecera',3,10],['Codigo de Producto',3,12],['Producto cantidad de Pedido Detalle',1,5],['Precio Unitario de Producto en Pedido Detalle',2,7],['Precio Total de Producto en Pedido Detalle',2,7],['Observaciones en Pedido Detalle',0,100]],
    'ticket_cabecera' : [['Codigo de Ticket Cabecera',1,10],['Codigo de Persona Juridica',3,11],['Codigo de Persona Natural',3,8],['Fecha(Año) de Ticket Cabecera',1,4],['Fecha(Mes) de Ticket Cabecera',1,2],['Fecha(Dia) de Ticket Cabecera',1,2],['Numero de Tipo de Ticket',3,2]],
    'ticket_detalle' : [['Numero de Ticket Detalle',1,8,0],['Codigo de Ticket Cabecera',3,10,0],['Codigo de Producto',3,12,4],['Cantidad de Producto en Ticket Detalle',1,4,0],['Precio Unitario en Ticket Detalle',4,7,0],['Precio Total en Ticket Detalle',2,7,0]],
    'act_inven_cabecera' : [['Codigo de Actualizacion de Inventario Cabecera',1,10],['Fecha(Año) de Actualizacion de Inventario Cabecera',1,4],['Fecha(Mes) de Actualizacion de Inventario Cabecera',1,2],['Fecha(Dia) de Actualizacion de Inventario Cabecera',1,2],['Código del Tipo de Movimiento',3,3]],
    'act_inven_detalle' : [['Numero de Actualizacion de Inventario Detalle',1,8],['Codigo de Actualizacion de Inventario Cabecera',3,10],['Codigo de Producto',3,12],['Cantidad de Producto en Actualizacion de Inventario Detalle',1,4],['Detalles/Motivos en Actualizacion de Inventario Detalle',0,60]]
}

enlaces={
    'MarCod' : 'marca',#[marca,MarNom]
    'SecCod' : 'seccion',
    'UniMedNro' : 'unidad_medida',
    'ProvCod' : 'proveedor',
    'ProCod' : 'producto',
    'TipMovCod' : 'tipo_movimiento',
    'TipTickNro' : 'tipo_ticket',
    'PedCabCod' : 'pedido_cabecera',
    'TickCabCod' : 'ticket_cabecera',
    'ActInvCabCod' : 'act_inven_cabecera',
    'PerJurCod' : 'persona_juridica',
    'PerNatCod' : 'persona_natural',
}

doble={
    'TickDetPreUni': ['producto','ProPreUni'],
}

def Consulta(campor):
    #Si tiene enlace
    cursor= db.database.cursor()
    print(campor)
    print('SELECT ' + campor + ' FROM ' + atributos[enlaces[campor]][0])
    cursor.execute('SELECT ' + campor + ' FROM ' + atributos[enlaces[campor]][0])
    myresult= cursor.fetchall()
    cursor.close()
    return myresult

def ConsultaDos(campor):
    #Si tiene enlace
    cursor= db.database.cursor()
    print(campor)
    print('SELECT ' + doble[campor][1] + ' FROM ' + atributos[doble[campor][0]][0])
    cursor.execute('SELECT ' + doble[campor][1] + ' FROM ' + atributos[doble[campor][0]][0])
    myresult= cursor.fetchall()
    cursor.close()
    return myresult