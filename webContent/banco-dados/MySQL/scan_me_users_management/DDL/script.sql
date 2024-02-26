CREATE TABLE usuario (
  id_usuario        INTEGER PRIMARY KEY AUTO_INCREMENT,
  uuid_usuario      BINARY(16) NOT NULL UNIQUE,
  foto_perfil       LONGBLOB,
  nickname          VARCHAR(250) NOT NULL,
  email             VARCHAR(250) NOT NULL UNIQUE,
  hash_senha        VARCHAR(60) NOT NULL,
  numero_whatsapp   VARCHAR(12) DEFAULT '---', -- (XXX) X XXXX-XXXX >> XXXXXXXXXXXX
  numero_telegram   VARCHAR(12) DEFAULT '---', -- (XXX) X XXXX-XXXX >> XXXXXXXXXXXX
  id_telegram       VARCHAR(12) DEFAULT '---',
  tipo_usuario      TINYINT DEFAULT 0,
  bloqueado         TINYINT DEFAULT 0,
  online            TINYINT DEFAULT 1
);

CREATE TABLE salt (
  id_salt           INTEGER PRIMARY KEY AUTO_INCREMENT,
  uuid_salt         BINARY(16) NOT NULL UNIQUE,
  valor_salt        VARCHAR(29) NOT NULL,
  uuid_usuario      BINARY(16) NOT NULL UNIQUE,

  FOREIGN KEY (uuid_usuario) REFERENCES usuario(uuid_usuario)
);

CREATE TABLE alteracao_senha (
  id_alteracao_senha    INTEGER PRIMARY KEY AUTO_INCREMENT,
  uuid_alteracao_senha  BINARY(16) NOT NULL UNIQUE,
  hash_alteracao        VARCHAR(29) NOT NULL UNIQUE,
  codigo                VARCHAR(6) NOT NULL,
  data_solicitacao      DATETIME DEFAULT NOW(),
  data_alteracao        DATETIME DEFAULT NULL,
  usado                 TINYINT DEFAULT 0,
  expirado              TINYINT DEFAULT 0,
  uuid_usuario          BINARY(16) NOT NULL,

  FOREIGN KEY (uuid_usuario) REFERENCES usuario(uuid_usuario)
);