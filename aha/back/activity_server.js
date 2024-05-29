require('dotenv').config();

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
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


// Routing

// 모든 내역 조회
app.get('/activity', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM activity ORDER BY written DESC');
        res.status(200).json(results.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 활동 내역 추가
app.post('/activity', async(req, res) => {
    const { title, body, image, clubname } = req.body;
    try {
        const newActivity = await pool.query(
            'INSERT INTO activity (title, body, image, clubname) VALUES ($1, $2, $3, $4) RETURNING *', 
            [title, body, image, clubname]);
        res.status(201).json(newActivity.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// 활동 내역 보기
app.get('/activity/:id', async (req, res) => {
    try {
        const activities = await pool.query(
            'SELECT * FROM activity WHERE id = $1', 
            [req.params.id]);
        const comments = await pool.query(
            'SELECT * FROM actcomment WHERE activity_id = $1', 
            [req.params.id]);

        res.status(200).json({ 
            activities: activities.rows[0], 
            comments: comments.rows 
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 댓글 추가
app.post('/activity/:id/actcomment', async (req, res) => {
    const { body, author } = req.body;
    const activity_id = req.params.id;
    try {
        const newComment = await pool.query(
            'INSERT INTO actcomment (activity_id, body, author) VALUES ($1, $2, $3) RETURNING *', 
            [activity_id, body, author]);
        res.status(201).json(newComment.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});
