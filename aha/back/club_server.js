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

// 동아리 정보
app.get('/club', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM club');
        const modifiedRows = result.rows.map(row => {
            row.image = getRandomImage();
            return row;
        });
        res.json({ result: modifiedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching clubs');
    }
});

// 랜덤 이미지
function getRandomImage() {
    const width = 300;
    const height = 300;
    const color = Math.floor(Math.random() * 16777215).toString(16);
    const bgcolor = Math.floor(Math.random() * 16777215).toString(16);
    return `https://via.placeholder.com/${width}x${height}/${color}/${bgcolor}.png`;
}


// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});
