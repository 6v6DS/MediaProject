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
app.use(express.static(path.join(__dirname, '..', 'front', 'show')));

// DB(PostgreSQL) connection
const pool = new Pool({
    user: 'teamaha',
    host: 'localhost',
    database: 'aha',
    password: 'teamaha',
    port: 5432,
});


// Routing

// Fetch all shows
app.get('/shows', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM shows ORDER BY date DESC');
        res.json({ result: result.rows });
    } catch (error) {
        console.error('Error fetching shows:', error);
        res.status(500).json({ message: 'Error fetching shows' });
    }
});

// Post a new show
app.post('/shows', async (req, res) => {
    const { title, date, time, location, price, description, posterUrl } = req.body;
    try {
        const query = 'INSERT INTO shows (title, date, time, location, price, description, poster) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        await pool.query(query, [title, date, time, location, price, description, posterUrl]);
        res.status(201).json({ message: 'Show uploaded successfully' });
    } catch (error) {
        console.error('Error uploading show:', error);
        res.status(500).json({ message: 'Error uploading show' });
    }
});

// Fetch all applications
app.get('/application', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM applications ORDER BY date DESC');
        res.json({ result: result.rows });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Error fetching applications' });
    }
});

// Submit an application
app.post('/application', async (req, res) => {
    const { count, name, student_ID, major, phoneNumber, etc } = req.body;
    try {
        const query = 'INSERT INTO applications (count, name, student_ID, major, phoneNumber, etc) VALUES ($1, $2, $3, $4, $5, $6)';
        await pool.query(query, [count, name, student_ID, major, phoneNumber, etc]);
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Error submitting application' });
    }
});
// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});
