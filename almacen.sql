CREATE DATABASE almacen_node;
USE almacen_node;

CREATE TABLE conceptos (
    clave VARCHAR(10) PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

INSERT INTO conceptos (clave, descripcion) VALUES ('101', 'Tornillo de acero');
INSERT INTO conceptos (clave, descripcion) VALUES ('102', 'Tuerca hexagonal');
INSERT INTO conceptos (clave, descripcion) VALUES ('103', 'Arandela plana');