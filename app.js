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

const tablas = ['unidades', 'proveedores', 'productos', 'conceptos', 'destinos'];

tablas.forEach(t => {
    app.get(`/api/${t}`, (req, res) => {
        db.query(`SELECT * FROM ${t}`, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });
    app.post(`/api/${t}`, (req, res) => {
        db.query(`INSERT INTO ${t} SET ?`, req.body, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app; // OBLIGATORIO PARA VERCEL
