DELIMITER $$

CREATE TRIGGER PedDetInsertAct_Stock
AFTER INSERT ON g2t_ped_det
FOR EACH ROW
BEGIN
    UPDATE l1m_producto
    SET l1m_producto.ProStc = l1m_producto.ProStc + NEW.PedDetProCan
    WHERE l1m_producto.ProCod = NEW.ProCod;
END$$

CREATE TRIGGER PedDetUpdateAct_Stock
AFTER UPDATE ON g2t_ped_det
FOR EACH ROW
BEGIN
    IF OLD.PedDetProCan <> NEW.PedDetProCan THEN
        UPDATE l1m_producto
        SET l1m_producto.ProStc = l1m_producto.ProStc - OLD.PedDetProCan + NEW.PedDetProCan
        WHERE l1m_producto.ProCod = NEW.ProCod;
    END IF;
END$$

CREATE TRIGGER TickDetInsertAct_Stock
AFTER INSERT ON g2t_ticket_det
FOR EACH ROW
BEGIN
    UPDATE l1m_producto
    SET l1m_producto.ProStc = l1m_producto.ProStc - NEW.TickDetCanPro
    WHERE l1m_producto.ProCod = NEW.ProCod;
END$$

CREATE TRIGGER TickDetUpdateAct_Stock
AFTER UPDATE ON g2t_ticket_det
FOR EACH ROW
BEGIN
    IF OLD.TickDetCanPro <> NEW.TickDetCanPro THEN
        UPDATE l1m_producto
        SET l1m_producto.ProStc = l1m_producto.ProStc + OLD.TickDetCanPro - NEW.TickDetCanPro
        WHERE l1m_producto.ProCod = NEW.ProCod;
    END IF;
END$$

CREATE TRIGGER ActInvDetInsertAct_Stock
AFTER INSERT ON g2c_act_inventario_det
FOR EACH ROW
BEGIN
	if (Select TipMovCod From g2c_act_inventario_cab where ActInvCabCod= new.ActInvCabCod) = 'E' then
		UPDATE l1m_producto
		SET l1m_producto.ProStc = l1m_producto.ProStc + NEW.ActInvDetCanPro
		WHERE l1m_producto.ProCod = NEW.ProCod;
	else
		UPDATE l1m_producto
		SET l1m_producto.ProStc = l1m_producto.ProStc - NEW.ActInvDetCanPro
		WHERE l1m_producto.ProCod = NEW.ProCod;
    End if;
END$$

CREATE TRIGGER ActInvDetUpdateAct_Stock
AFTER UPDATE ON g2c_act_inventario_det
FOR EACH ROW
BEGIN
    IF OLD.ActInvDetCanPro <> NEW.ActInvDetCanPro THEN				
		if (Select TipMovCod From g2c_act_inventario_cab where ActInvCabCod= new.ActInvCabCod) = 'E' then
			UPDATE l1m_producto
			SET l1m_producto.ProStc = l1m_producto.ProStc - OLD.ActInvDetCanPro + NEW.ActInvDetCanPro
			WHERE l1m_producto.ProCod = NEW.ProCod;
		else
			UPDATE l1m_producto
			SET l1m_producto.ProStc = l1m_producto.ProStc + OLD.ActInvDetCanPro - NEW.ActInvDetCanPro
			WHERE l1m_producto.ProCod = NEW.ProCod;
		End if;
    END IF;
END$$

CREATE TRIGGER PedDetPreTot_Calcular
BEFORE INSERT ON g2t_ped_det
FOR EACH ROW
BEGIN
    SET NEW.PedDetProPreTot = NEW.PedDetProCan * NEW.PedDetProPreUni;
END$$

CREATE TRIGGER PedDetPreTotUpdate_Calcular
BEFORE UPDATE ON g2t_ped_det
FOR EACH ROW
BEGIN
    SET NEW.PedDetProPreTot = NEW.PedDetProCan * NEW.PedDetProPreUni;
END$$

CREATE TRIGGER TickDetPreTot_Calcular
BEFORE INSERT ON g2t_ticket_det
FOR EACH ROW
BEGIN
    SET NEW.TickDetPreTot = NEW.TickDetCanPro * NEW.TickDetPreUni;
END$$

CREATE TRIGGER TickDetPreTotUpdate_Calcular
BEFORE UPDATE ON g2t_ticket_det
FOR EACH ROW
BEGIN
    SET NEW.TickDetPreTot = NEW.TickDetCanPro * NEW.TickDetPreUni;
END$$

DELIMITER ;