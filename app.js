const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '')));

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: true }
});

const tablas = ['conceptos', 'destinos', 'productos', 'unidades'];

tablas.forEach(tabla => {
    // LEER: Obtiene datos de la tabla
    app.get(`/api/${tabla}`, (req, res) => {
        db.query(`SELECT * FROM ${tabla}`, (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        });
    });

    // ESCRIBIR: Guarda un nuevo registro (Para el video de validación)
    app.post(`/api/${tabla}`, (req, res) => {
        db.query(`INSERT INTO ${tabla} SET ?`, req.body, (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });
    });
});

module.exports = app;
