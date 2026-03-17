const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Configuración para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (tu index.html)
app.use(express.static(path.join(__dirname, '')));

// Configuración de la conexión a TiDB Cloud
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10
});

// RUTA PARA TU CONSULTA: Productos de Ferretería Verduzco
app.get('/api/verduzco', (req, res) => {
    db.query("SELECT * FROM conceptos WHERE proveedor = 'Ferreteria Verduzco'", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Ruta genérica para que el index.html se cargue siempre
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// EXPORTAR PARA VERCEL (Súper importante)
module.exports = app;

// Solo para pruebas locales (no afecta a Vercel)
if (process.env.NODE_ENV !== 'production') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Servidor local en http://localhost:${PORT}`));
}
