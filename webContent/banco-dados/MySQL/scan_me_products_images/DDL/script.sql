CREATE TABLE produto_imagens (
  id_produto        INTEGER PRIMARY KEY AUTO_INCREMENT,
  uuid_produto      BINARY(16) NOT NULL UNIQUE,
  foto_1            LONGBLOB,
  foto_2            LONGBLOB,
  foto_3            LONGBLOB,
  foto_4            LONGBLOB,
  foto_5            LONGBLOB,
  foto_6            LONGBLOB
);