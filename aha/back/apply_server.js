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
app.use(express.static(path.join(__dirname, '..', 'front')));

// DB(PostgreSQL) connection
const pool = new Pool({
    user: 'teamaha',
    host: 'localhost',
    database: 'aha',
    password: 'teamaha',
    port: 5432,
});


// Routing

// 동아리 불러오기
app.get('/club', async(req, res) => {
    const clubName = req.query.clubName || '';
    try {
        const query = 'SELECT clubname FROM club WHERE clubname ILIKE $1';
        const result = await pool.query(query, [`%${clubName}%`]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Database query failed' });
    }
});

// 가입 신청 제출
app.post('/apply', async(req, res) => {
    const { clubname, name, studentid, grade, department, phonenum, email, qa1, qa2 } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO apply (clubname, name, studentid, grade, department, phonenum, email, qa1, qa2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [clubname, name, studentid, grade, department, phonenum, email, qa1, qa2]);
        res.json({ success: true, message: "가입 신청 완료" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Database query failed' });
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});
