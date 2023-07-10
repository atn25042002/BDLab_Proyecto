#Maneja el nombre de los campos que contiene la Entidad en la base de Datos
atributos={
    'seccion' : ['lzz_seccion','SecCod', 'SecNom', 'SecEstReg'],
    'marca' : ['lzz_marca','MarCod', 'MarNom', 'MarEstReg'],
    'tipo_movimiento' : ['lzz_tipo_movimiento','TipMovCod', 'TipMovDes', 'TipMovEstReg'],
    'tipo_ticket' : ['lzz_ticket','TipTickNro', 'TipTickDes', 'TipTickEstReg'],
}

#Maneja el formato o restricciones que debe un valor para poder ingresarlos
campos={
    #[nombre del atributo, tipo(1 si es numerico), longitud maxima]
    'seccion' : [ ['Código de la Sección',0,6] , ['Nombre de la Seccion',0,60] ],
    'marca' : [['Código de la marca',0,6],['Nombre de la marca',0,60]],
    'tipo_movimiento' : [['Código del Tipo de Movimiento', 0, 3],['Descripción',0,7]],
    'tipo_ticket' : [['Código del Tipo de Ticket', 1, 2],['Descripción',0,60]],
}