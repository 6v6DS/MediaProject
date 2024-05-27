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
app.use(express.static(path.join(__dirname, '..', 'front', 'join')));

// DB(PostgreSQL) connection
const pool = new Pool({
    user: 'teamaha',
    host: 'localhost',
    database: 'aha',
    password: 'teamaha',
    port: 5432,
});


// Routing

// Fetch all posts
app.get('/new', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM newclub');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new post
app.post('/new', async (req, res) => {
    const { title, body, image, author, likes } = req.body;
    const createdOn = new Date();

    try {
        const result = await pool.query(
            'INSERT INTO newclub (title, body, image, author, created_on, likes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, body, image, author, createdOn, likes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// Fetch comments for a specific post
app.get('/comments/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM comments WHERE post_id = $1', [postId]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new comment to a post
app.post('/comments', async (req, res) => {
    const { postId, body, author } = req.body;
    const createdOn = new Date();

    // 유효성 검사: postId가 실제로 데이터베이스에 존재하는지 확인
    const postExists = await pool.query('SELECT EXISTS(SELECT 1 FROM newclub WHERE id = $1)', [postId]);
    if (!postExists.rows[0].exists) {
        return res.status(404).send("Post with the specified ID does not exist.");
    }

    try {
        const result = await pool.query(
            'INSERT INTO comments (post_id, body, author, created_on) VALUES ($1, $2, $3, $4) RETURNING *',
            [postId, body, author, createdOn]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});




// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});
