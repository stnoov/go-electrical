const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Sit489hh',
    database: 'go_electrical'
})

app.post('/register', (req, res) =>
{
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const created_at = req.body.created_at;

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.log(err)
            }
                db.query(
                        "INSERT INTO users (first_name, last_name, email, created_at, password) VALUES (?,?,?,?,?)",
                        [first_name,last_name,email,created_at, hash],
                        (err, result) => {
                            if(err) {
                                res.send(err)
                            } else {
                                res.send('Success!')
                            }
                        }
                    )
                }
            )
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        email,
        (err, result) => {
            if(err) {
                res.send({err: err})
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(response) {
                        res.send({message: "Success"})
                    } else {
                        res.send({ message: "Wrong username or password"})
                    }
                })
            } else {
                res.send({ message: "user does not exist"})
            }
        }
    )
})

app.listen(3001, () => {
    console.log('Running server')
})