const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '')));

// Configuración de conexión a TiDB Cloud (Usa variables de entorno de Vercel)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: true }, // Requerido por TiDB Cloud
    waitForConnections: true,
    connectionLimit: 10
});

// Lista de catálogos requeridos por el examen
const catalogos = ['conceptos', 'destinos', 'productos', 'unidades'];

catalogos.forEach(tabla => {
    // GET: Leer datos del catálogo
    app.get(`/api/${tabla}`, (req, res) => {
        // Si es conceptos, filtramos por Ferretería Verduzco como se pidió originalmente
        const query = tabla === 'conceptos' 
            ? "SELECT * FROM conceptos WHERE proveedor = 'Ferreteria Verduzco'" 
            : `SELECT * FROM ${tabla}`;
            
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    });

    // POST: Insertar datos (Para validación de persistencia)
    app.post(`/api/${tabla}`, (req, res) => {
        db.query(`INSERT INTO ${tabla} SET ?`, req.body, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: result.insertId });
        });
    });
});

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
