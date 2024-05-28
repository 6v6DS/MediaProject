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

// 모든 게시물 조회
app.get('/recruit', async(req, res) => {
    try {
        const results = await pool.query('SELECT * FROM recruit');
        res.status(200).json(results.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 신규 동아리 게시물 추가
app.post('/recruit', async(req, res) => {
    const { title, body, image, author } = req.body;
    try {
        const newClub = await pool.query(
            'INSERT INTO recruit (title, body, image, author) VALUES ($1, $2, $3, $4) RETURNING *', 
            [title, body, image, author]);
        res.status(201).json(newClub.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// 신규 동아리 게시물 보기
app.get('/recruit/:id', async(req, res) => {
    try {
        const recruits = await pool.query(
            'SELECT * FROM recruit WHERE id = $1',
            [req.params.id]);
        const comments = await pool.query(
            'SELECT * FROM recomment WHERE recruit_id = $1', 
            [req.params.id]);

        res.status(200).json({
            recruits: recruits.rows[0],
            comments: comments.rows
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 신규 동아리 댓글
app.post('/recruit/:id/recomment', async(req, res) => {
    const { body, author } = req.body;
    const recruit_id = req.params.id;
    try {
        const newComment = await pool.query(
            'INSERT INTO recomment (recruit_id, body, author) VALUES ($1, $2, $3) RETURNING *', 
            [recruit_id, body, author]);
        res.status(201).json(newComment.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// 신규 동아리 좋아요
app.post('/recruit/:id/like', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            'UPDATE recruit SET likes = likes + 1 WHERE id = $1 RETURNING likes',
            [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(err.message);
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});
