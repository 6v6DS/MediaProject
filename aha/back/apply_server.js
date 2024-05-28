const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

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

// 동아리 불러오기 - 자동완성
app.get('/club', async(req, res) => {
    const clubName = req.query.clubName || '';
    try {
        const query = 'SELECT clubname FROM club WHERE clubname ILIKE $1';
        const result = await pool.query(query, [`%${clubName}%`]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error fetching club names' });
    }
});

// 가입 신청
app.post('/apply', async(req, res) => {
    const { clubname, name, studentid, grade, department, phonenum, email, qa1, qa2 } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO apply (clubname, name, studentid, grade, department, phonenum, email, qa1, qa2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [clubname, name, studentid, grade, department, phonenum, email, qa1, qa2]);
        res.json({ success: true, message: "Application submitted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error submitting application' });
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});