const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'front')));
app.use(cors());

// DB(PostgreSQL) connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


// Routing

app.get('/calendar', async(req, res) => {
    try {
        const client = await pool.connect();
        const showResults = await client.query('SELECT title, date, description FROM show');
        const eventResults = await client.query('SELECT title, date, description FROM event');
        const results = {
            'showResults': showResults ? showResults.rows : [],
            'eventResults': eventResults ? eventResults.rows : []
        };
        res.json(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.post('/event', async(req, res) => {
    try {
        const { title, date, description, icon } = req.body;
        const client = await pool.connect();
        const insertQuery = 'INSERT INTO event(title, date, description, icon) VALUES($1, $2, $3, $4)';
        const result = await client.query(insertQuery, [title, date, description, icon]);
        res.json({ success: true, message: "Event added successfully :)" });
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error " + err);
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});
