const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'front', 'home')));

// DB(PostgreSQL) connection
const pool = new Pool({
    user: 'teamaha',
    host: 'localhost',
    database: 'aha',
    password: 'teamaha',
    port: 5432,
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
