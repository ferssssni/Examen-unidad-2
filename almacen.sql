-- 1. Creación de la base de datos
CREATE DATABASE IF NOT EXISTS almacen_node;
USE almacen_node;

-- 2. Creación de la tabla con la columna 'proveedor' incluida
CREATE TABLE conceptos (
    clave VARCHAR(10) PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    proveedor VARCHAR(50) DEFAULT 'Sin Proveedor'
);

-- 3. Insertar los productos indicando que son de 'Ferreteria Verduzco'
INSERT INTO conceptos (clave, descripcion, proveedor) VALUES 
('101', 'Tornillo de acero', 'Ferreteria Verduzco'),
('102', 'Tuerca hexagonal', 'Ferreteria Verduzco'),
('103', 'Arandela plana', 'Ferreteria Verduzco'),
('104', 'Martillo de uña', 'Herramientas Valdez'),
('105', 'Clavo de 2 pulgadas', 'Ferreteria Verduzco');

-- 4. CONSULTA: Todos los productos de Ferreteria Verduzco
-- (Esta es la que resuelve tu duda inicial)
SELECT clave, descripcion 
FROM conceptos 
WHERE proveedor = 'Ferreteria Verduzco';
