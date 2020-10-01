const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST'],
    credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: 'userId',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + (30 * 86400 * 1000))
    }
}))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Sit489hh',
    database: 'go_electrical'
})

app.post('/register', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const balance = req.body.balance;
    const created_at = req.body.created_at;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err)
        }
        db.query(
            "SELECT * FROM users WHERE email = ?",
            email,
            (err, result) => {
                if (err) {
                    res.send({err: err})
                }
                if (result && result.length > 0) {
                    res.send('Email is already used')
                } else {
                    db.query(
                        "INSERT INTO users (first_name, last_name, email, created_at, password, balance) VALUES (?,?,?,?,?,?)",
                        [first_name, last_name, email, created_at, hash, balance],
                        (err, result) => {
                            if (err) {
                                res.send('Error!')
                            } else {
                                console.log(result)
                                res.send(true)
                            }
                        }
                    )
                }
            }
        )
    })
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        email,
        (err, result) => {
            if(err) {
                res.send("User does not exist")
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(response) {
                        req.session.user = result
                        res.send(req.session.user)
                    } else {
                        res.send("Wrong email or password")
                    }
                })
            } else {
                res.send("User does not exist")
            }
        }
    )
})

app.get('/login', ((req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user
        })
    } else {
        res.send({loggedIn: false})
    }
}))

app.get('/logout', ((req, res) => {
    req.session.destroy(function(err) {
       res.send({loggedIn: false})
    })
}))

app.post('/user/:id/add_balance', (req, res) => {
       db.query(
            'UPDATE users SET balance=balance+100 WHERE email = ?',
            req.body.email,
            (err, result) => {
                if(err) {
                    res.send("User does not exist")
                }
                db.query(
                    "SELECT * FROM users WHERE email = ?",
                    req.body.email,
                    (err, result) => {
                        req.session.user = result
                        res.send(req.session.user)
                    }
                )
           }
)
})

app.get('/user/:id/info', (req, res) => {
    db.query(
        "SELECT * FROM users WHERE email = ?",
        req.body.email
    )
})

app.listen(3001, () => {
    console.log('Running server')
})