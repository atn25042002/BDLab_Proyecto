#Maneja el nombre de los campos que contiene la Entidad en la base de Datos
atributos={
    'seccion' : ['lzz_seccion','SecCod', 'SecNom', 'SecEstReg'],
    'marca' : ['lzz_marca','MarCod', 'MarNom', 'MarEstReg'],
    'tipo_movimiento' : ['lzz_tipo_movimiento','TipMovCod', 'TipMovDes', 'TipMovEstReg'],
    'tipo_ticket' : ['lzz_ticket','TipTickNro', 'TipTickDes', 'TipTickEstReg'],
    'producto' : ['l1m_producto','ProCod', 'ProNom' , 'ProFecVenAño','ProFecVenMes','ProFecVenDia','ProStc','ProStcMin','ProStcMax','ProStcRsv', 'SecCod', 'MarCod','ProPreUni','UniMedNro','ProEstReg']
}

#Maneja el formato o restricciones que debe un valor para poder ingresarlos
campos={
    #[nombre del atributo, tipo(1 si es numerico), longitud maxima]
    'seccion' : [ ['Código de la Sección',0,6] , ['Nombre de la Seccion',0,60] ],
    'marca' : [['Código de la marca',0,6],['Nombre de la marca',0,60]],
    'tipo_movimiento' : [['Código del Tipo de Movimiento', 0, 3],['Descripción',0,7]],
    'tipo_ticket' : [['Código del Tipo de Ticket', 1, 2],['Descripción',0,60]],
    'producto' : [['ProCod',0,60],['ProNom',0,60],['ProFecVenAño',0,60],['ProFecVenMes',0,60]
            ,['ProFecVenDia',0,60],['ProStc',0,60],['ProStcMin',0,60],['ProStcMax',0,60],['ProStcRsv',0,60],
            ['SecCod',0,60],['MarCod',0,60],['ProPreUni',0,60],['UniMedNro',0,60]]
}