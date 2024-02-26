DELIMITER $$

CREATE PROCEDURE ResetFotoProdutos()
BEGIN
  /* exclusão de todas as fotos */
  DELETE FROM produto_imagens WHERE id_produto < 99999;

  /* redefinição das PRIMARY KEY */
  ALTER TABLE produto_imagens AUTO_INCREMENT = 1;
END$$
DELIMITER ;