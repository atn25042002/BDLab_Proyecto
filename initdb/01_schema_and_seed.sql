/*
Created: 08/06/2023
Modified: 18/10/2025
Model: MySQL 8.0
Database: inventario_db
*/

-- =======================================
-- CREACIÓN DE TABLAS
-- =======================================

-- Tabla l1m_producto
CREATE TABLE l1m_producto (
  procod BIGINT(11) UNSIGNED NOT NULL COMMENT 'Código del producto',
  pronom CHAR(60),
  prostc INT(3) UNSIGNED,
  prostcmin INT(3) UNSIGNED,
  prostcmax INT(3) UNSIGNED,
  prostcrsv INT(3) UNSIGNED,
  seccod CHAR(6) NOT NULL,
  marcod CHAR(6) NOT NULL,
  propreuni DECIMAL(6,2) UNSIGNED,
  unimednro INT(2) UNSIGNED NOT NULL,
  proestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongproc CHECK (LENGTH(procod) > 0),
  PRIMARY KEY (procod)
);

-- Tabla l2m_proveedor
CREATE TABLE l2m_proveedor (
  provcod BIGINT(11) UNSIGNED NOT NULL COMMENT 'Código del proveedor',
  provnom CHAR(40),
  provnumcel INT(9) UNSIGNED,
  provdir CHAR(60),
  provestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongprov CHECK (LENGTH(provcod) > 0),
  PRIMARY KEY (provcod)
);

-- Tabla g2t_ped_cab
CREATE TABLE g2t_ped_cab (
  pedcabcod INT(10) UNSIGNED NOT NULL,
  provcod BIGINT(11) UNSIGNED NOT NULL,
  pedcabpedano INT(4) UNSIGNED,
  pedcabpedmes INT(2) UNSIGNED,
  pedcabpeddia INT(2) UNSIGNED,
  pedcabentrano INT(4) UNSIGNED,
  pedcabentrmes INT(2) UNSIGNED,
  pedcabentrdia INT(2) UNSIGNED,
  pedcabestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongpedcab CHECK (LENGTH(pedcabcod) > 0),
  PRIMARY KEY (pedcabcod)
);

-- Tabla g2t_ped_det
CREATE TABLE g2t_ped_det (
  peddetnro INT(8) NOT NULL,
  pedcabcod INT(10) UNSIGNED NOT NULL,
  procod BIGINT(11) UNSIGNED NOT NULL,
  peddetprofecvenano INT(4) UNSIGNED,
  peddetprofecvenmes INT(2) UNSIGNED,
  peddetprofecvendia INT(2) UNSIGNED,
  peddetprocan INT(5),
  peddetpropreuni DECIMAL(6,2),
  peddetpropretot DECIMAL(6,2),
  peddetobs CHAR(100),
  peddetestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongpeddet CHECK (LENGTH(peddetnro) > 0),
  PRIMARY KEY (peddetnro)
);

-- Tabla l2m_persona_juridica
CREATE TABLE l2m_persona_juridica (
  perjurcod BIGINT(11) UNSIGNED NOT NULL,
  perjurrazsoc CHAR(60),
  perjurnumcel INT(9) UNSIGNED,
  perjurestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongperjur CHECK (LENGTH(perjurcod) > 0),
  PRIMARY KEY (perjurcod)
);

-- Tabla l2m_persona_natural
CREATE TABLE l2m_persona_natural (
  pernatscod INT(8) UNSIGNED NOT NULL,
  pernatnom CHAR(60),
  pernatnumcel INT(9) UNSIGNED,
  pernatestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongpernat CHECK (LENGTH(pernatscod) > 0),
  PRIMARY KEY (pernatscod)
);

-- Tabla g2t_ticket_cab
CREATE TABLE g2t_ticket_cab (
  tickcabcod INT(10) UNSIGNED NOT NULL,
  perjurcod BIGINT(11) UNSIGNED NOT NULL,
  pernatscod INT(8) UNSIGNED NOT NULL,
  tickcabano INT(4) UNSIGNED,
  tickcabmes INT(2) UNSIGNED,
  tickcabdia INT(2) UNSIGNED,
  tipticknro INT(2) UNSIGNED NOT NULL,
  tickcabestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongtickcab CHECK (LENGTH(tickcabcod) > 0),
  PRIMARY KEY (tickcabcod)
);

-- Tabla g2t_ticket_det
CREATE TABLE g2t_ticket_det (
  tickdetnro INT(8) UNSIGNED NOT NULL,
  tickcabcod INT(10) UNSIGNED NOT NULL,
  procod BIGINT(11) UNSIGNED NOT NULL,
  tickdetcanpro INT(4) UNSIGNED,
  tickdetpreuni DECIMAL(6,2) UNSIGNED,
  tickdetpretot DECIMAL(6,2) UNSIGNED,
  tickdetestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongtickdet CHECK (LENGTH(tickdetnro) > 0),
  PRIMARY KEY (tickdetnro)
);

-- Tabla lzz_tipo_ticket
CREATE TABLE lzz_tipo_ticket (
  tipticknro INT(2) UNSIGNED NOT NULL,
  tiptickdes CHAR(60),
  tiptickestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongtiptick CHECK (LENGTH(tipticknro) > 0),
  PRIMARY KEY (tipticknro)
);

-- Tabla g2m_unidad_medida
CREATE TABLE g2m_unidad_medida (
  unimednro INT(2) UNSIGNED NOT NULL,
  unimedsesccor CHAR(4),
  unimedsesclar CHAR(40),
  unimedestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongunimed CHECK (LENGTH(unimednro) > 0),
  PRIMARY KEY (unimednro)
);

-- Tabla g2c_act_inventario_cab
CREATE TABLE g2c_act_inventario_cab (
  actinvcabcod INT(10) UNSIGNED NOT NULL,
  actinvfecano INT(4) UNSIGNED,
  actinvfecmes INT(2) UNSIGNED,
  actinvfecdia INT(2) UNSIGNED,
  tipmovcod CHAR(3),
  actinvcabestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongactinvcab CHECK (LENGTH(actinvcabcod) > 0),
  PRIMARY KEY (actinvcabcod)
);

-- Tabla g2c_act_inventario_det
CREATE TABLE g2c_act_inventario_det (
  actinvdetnro INT(8) UNSIGNED NOT NULL,
  actinvcabcod INT(10) UNSIGNED NOT NULL,
  procod BIGINT(11) UNSIGNED NOT NULL,
  actinvdetcanpro INT(4) UNSIGNED,
  actinvdetmot CHAR(60),
  actinvdetestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongactinvdet CHECK (LENGTH(actinvdetnro) > 0),
  PRIMARY KEY (actinvdetnro)
);

-- Tabla lzz_seccion
CREATE TABLE lzz_seccion (
  seccod CHAR(6) NOT NULL,
  secnom CHAR(60),
  secestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongsec CHECK (LENGTH(seccod) > 0),
  PRIMARY KEY (seccod)
);

-- Tabla lzz_marca
CREATE TABLE lzz_marca (
  marcod CHAR(6) NOT NULL,
  marnom CHAR(60),
  marestreg SET('A','I','*') DEFAULT 'A',
  CONSTRAINT chklongmar CHECK (LENGTH(marcod) > 0),
  PRIMARY KEY (marcod)
);

-- Tabla lzz_tipo_movimiento
CREATE TABLE lzz_tipo_movimiento (
  tipmovcod CHAR(3) NOT NULL,
  tipmovdes CHAR(7),
  tipmovestreg SET('A','I','*'),
  CONSTRAINT chklongtipmov CHECK (LENGTH(tipmovcod) > 0),
  PRIMARY KEY (tipmovcod)
);

-- =======================================
-- RELACIONES
-- =======================================

ALTER TABLE g2t_ped_cab ADD FOREIGN KEY (provcod) REFERENCES l2m_proveedor(provcod);
ALTER TABLE g2t_ped_det ADD FOREIGN KEY (pedcabcod) REFERENCES g2t_ped_cab(pedcabcod);
ALTER TABLE g2t_ped_det ADD FOREIGN KEY (procod) REFERENCES l1m_producto(procod);
ALTER TABLE g2t_ticket_cab ADD FOREIGN KEY (tipticknro) REFERENCES lzz_tipo_ticket(tipticknro);
ALTER TABLE g2t_ticket_cab ADD FOREIGN KEY (pernatscod) REFERENCES l2m_persona_natural(pernatscod);
ALTER TABLE g2t_ticket_cab ADD FOREIGN KEY (perjurcod) REFERENCES l2m_persona_juridica(perjurcod);
ALTER TABLE g2t_ticket_det ADD FOREIGN KEY (tickcabcod) REFERENCES g2t_ticket_cab(tickcabcod);
ALTER TABLE g2t_ticket_det ADD FOREIGN KEY (procod) REFERENCES l1m_producto(procod);
ALTER TABLE l1m_producto ADD FOREIGN KEY (unimednro) REFERENCES g2m_unidad_medida(unimednro);
ALTER TABLE g2c_act_inventario_det ADD FOREIGN KEY (actinvcabcod) REFERENCES g2c_act_inventario_cab(actinvcabcod);
ALTER TABLE g2c_act_inventario_det ADD FOREIGN KEY (procod) REFERENCES l1m_producto(procod);
ALTER TABLE l1m_producto ADD FOREIGN KEY (seccod) REFERENCES lzz_seccion(seccod);
ALTER TABLE l1m_producto ADD FOREIGN KEY (marcod) REFERENCES lzz_marca(marcod);
ALTER TABLE g2c_act_inventario_cab ADD FOREIGN KEY (tipmovcod) REFERENCES lzz_tipo_movimiento(tipmovcod);

-- =======================================
-- DATOS INICIALES
-- =======================================

INSERT INTO lzz_seccion VALUES 
('sec001','bebidas','A'),
('sec002','snacks','A'),
('sec003','abarrotes','A');

INSERT INTO lzz_marca VALUES 
('mar001','coca-cola','A'),
('mar002','frito-lay','A'),
('mar003','gloria','A');

INSERT INTO g2m_unidad_medida VALUES 
(1,'UND','unidad','A'),
(2,'LT','litro','A'),
(3,'KG','kilogramo','A');

INSERT INTO lzz_tipo_movimiento VALUES
('E','entrada','A'),
('S','salida','A');

INSERT INTO lzz_tipo_ticket VALUES
(1,'factura','A'),
(2,'boleta','A');

INSERT INTO l2m_proveedor VALUES
(20123456789,'distribuidora central',987654321,'av. grau 123','A'),
(20987654321,'alimentos del sur',976543210,'av. arequipa 456','A');

INSERT INTO l1m_producto VALUES
(1001,'coca-cola 500ml',50,10,100,0,'sec001','mar001',3.50,2,'A'),
(1002,'papitas lays 50g',80,20,150,0,'sec002','mar002',2.00,1,'A'),
(1003,'leche gloria 1L',60,10,200,0,'sec003','mar003',4.50,2,'A');