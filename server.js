const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 4000,
    ssl: { rejectUnauthorized: false } // Obligatorio para TiDB
});

// --- RUTAS PARA CONCEPTOS ---
app.get('/api/conceptos', (req, res) => {
    db.query('SELECT * FROM conceptos', (err, resu) => res.json(resu));
});
app.post('/api/conceptos', (req, res) => {
    const { clave, descripcion } = req.body;
    db.query('INSERT INTO conceptos VALUES (?, ?)', [clave, descripcion], () => res.json({ok:true}));
});

// --- RUTAS PARA DESTINOS ---
app.get('/api/destinos', (req, res) => {
    db.query('SELECT * FROM destinos', (err, resu) => res.json(resu));
});
app.post('/api/destinos', (req, res) => {
    const { nombre, ubicacion } = req.body;
    db.query('INSERT INTO destinos (nombre, ubicacion) VALUES (?, ?)', [nombre, ubicacion], () => res.json({ok:true}));
});

// --- RUTAS PARA UNIDADES ---
app.get('/api/unidades', (req, res) => {
    db.query('SELECT * FROM unidades_medida', (err, resu) => res.json(resu));
});

// --- RUTAS PARA PRODUCTOS ---
app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, resu) => res.json(resu));
});

module.exports = app;