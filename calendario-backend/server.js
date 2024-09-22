const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// Configura la conexión con PostgreSQL
const pool = new Pool({
    user: 'postgres', // tu usuario de PostgreSQL
    host: 'localhost',
    database: 'calendario', // tu base de datos
    password: 'postgres', // tu contraseña
    port: 5432,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para guardar los días marcados
app.post('/guardar-dia', async (req, res) => {
    const { fecha, actividad, marcado } = req.body;

    try {
        const query = `INSERT INTO dias_marcados (fecha, actividad, marcado) VALUES ($1, $2, $3) ON CONFLICT (fecha, actividad) DO UPDATE SET marcado = $3 RETURNING *`;
        const values = [fecha, actividad, marcado];
        const result = await pool.query(query, values);

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error al guardar el día marcado.' });
    }
});

// Iniciar el servidor
const port = 3001;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});