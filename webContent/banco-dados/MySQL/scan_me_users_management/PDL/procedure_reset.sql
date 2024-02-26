DELIMITER $$

CREATE PROCEDURE ResetUsuarios()
BEGIN
  /* exclusão da todos os registros do banco de dados */
  DELETE FROM salt WHERE id_salt < 99999;
  DELETE FROM alteracao_senha WHERE id_alteracao_senha < 99999;
  DELETE FROM usuario WHERE id_usuario < 99999;
    
  /* redefinição das sequências das primary keys */
  ALTER TABLE salt AUTO_INCREMENT = 1;
  ALTER TABLE alteracao_senha AUTO_INCREMENT = 1;
  ALTER TABLE usuario auto_increment = 1;
END$$
DELIMITER ;