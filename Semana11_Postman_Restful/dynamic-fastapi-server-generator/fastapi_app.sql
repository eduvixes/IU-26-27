DROP DATABASE IF EXISTS `fastapi_server`;
CREATE DATABASE IF NOT EXISTS `fastapi_server`;
USE `fastapi_server`;

DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `clases`;
DROP TABLE IF EXISTS `documentos`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameUser` varchar(50) NOT NULL,
  `emailUser` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `clases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameClase` varchar(50) NOT NULL,
  `profesorClase` varchar(50) NOT NULL,
  `fechaClase` date NOT NULL,
  `horaClase` time NOT NULL,
  `inicioClase` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `documentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameDoc` varchar(50) NOT NULL,
  `numPaginasDoc` int(4) NOT NULL,
  `tipoDoc` varchar(50) NOT NULL,
  `publicadoDoc` boolean NOT NULL,
  `autorId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (nameUser, emailUser) VALUES
	('SteveAuto','steve@gmail.com'),
	('DavidAuto','david1@gmail.com'),
	('LuisAuto','luis@gmail.com')
;

INSERT INTO `clases` (nameClase, profesorClase, fechaClase, horaClase, inicioClase) VALUES
	('IU','Javier', '2026-11-01', '09:00:00', '2026-11-01 09:00:00'),
	('BBDD','David', '2026-11-02', '11:00:00', '2026-11-02 11:00:00'),
	('Redes','Luisa', '2026-11-03', '15:30:00', '2026-11-03 15:30:00')
;

INSERT INTO `documentos` (nameDoc, numPaginasDoc, tipoDoc, publicadoDoc, autorId) VALUES
	('contrato', 10, 'pdf', TRUE, 1),
  ('manual', 100, 'docx', FALSE, 2),
  ('informe', 50, 'txt', TRUE, 3),  
	('libro', 300, 'pdf', TRUE, 1),
	('resumen', 50, 'docx', FALSE, 2)
;
