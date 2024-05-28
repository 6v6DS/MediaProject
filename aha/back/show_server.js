const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'front')));
app.use(cors());

// DB(PostgreSQL) connection
const pool = new Pool({
    user: 'teamaha',
    host: 'localhost',
    database: 'aha',
    password: 'teamaha',
    port: 5432,
});


// Routing

// 공연/행사 정보
app.get('/show', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM show ORDER BY date DESC');
        res.json({ result: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching show informations' });
    }
});

// 새로운 공연/행사 등록
app.post('/show', async(req, res) => {
    const { title, clubname, date, time, location, price, description, poster } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO show (title, clubname, date, time, location, price, description, poster) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
            [title, clubname, date, time, location, price, description, poster]);
        res.json({ success: true, message: 'Show uploaded successfully', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error uploading show' });
    }
});

// 참가 신청
app.post('/ticket', async(req, res) => {
    const { title, date, price, count, name, studentid, department, phonenum, etc } = req.body;
    try {
        const query = await pool.query(
            'INSERT INTO ticket (title, date, price, count, name, studentid, department, phonenum, etc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [title, date, price, count, name, studentid, department, phonenum, etc]);
        res.json({ success: true, message: 'Ticket booked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error booking ticket' });
    }
});



// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});