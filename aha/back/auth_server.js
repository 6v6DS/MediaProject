require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;    // PW hashing을 위한 salt 값

const app = express();
const port = 3001;

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

// 회원가입
app.post('/register', async(req, res) => {
    const { studentid, name, department, password } = req.body;
    console.log('회원가입 요청');
    try {
        const hashedPW = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
            'INSERT INTO univuser (studentid, name, department, password) VALUES ($1, $2, $3, $4) RETURNING *', 
            [studentid, name, department, hashedPW]);
        console.log('회원가입 성공: ', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('회원가입 실패: ', error.message);
        res.status(500).json({ message: error.message });
    }
});

// 로그인
app.post('/login', async(req, res) => {
    const { studentid, password } = req.body;
    console.log("로그인 시도");
    try {
        const result = await pool.query(
            'SELECT * FROM univuser WHERE studentid = $1', 
            [studentid]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.status(200).json({ message: "로그인 성공" });
            } else {
                res.status(401).json({ message: "로그인 실패" });
            }
        } else {
            res.status(401).json({ message: "유저 정보 없음" });
        }
    } catch (error) {
        console.error("로그인 에러: ", error.message);
        res.status(500).json({ message: error.message });
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Connected, ${port} port ...`);
});
