const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '')));

// Conexión segura usando variables de entorno
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: true }
});

const tablas = ['unidades', 'proveedores', 'productos', 'conceptos', 'destinos'];

// Rutas automáticas para los 5 catálogos
tablas.forEach(tabla => {
    // Obtener datos
    app.get(`/api/${tabla}`, (req, res) => {
        db.query(`SELECT * FROM ${tabla}`, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });

    // Insertar datos
    app.post(`/api/${tabla}`, (req, res) => {
        // En productos, manejamos la unidad_id. Si no viene, usamos NULL.
        if (tabla === 'productos' && !req.body.unidad_id) {
            req.body.unidad_id = null;
        }
        db.query(`INSERT INTO ${tabla} SET ?`, req.body, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
