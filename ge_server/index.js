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
                res.send(false)
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(response) {
                        req.session.user = result
                        res.send(req.session.user)
                    } else {
                        res.send(false)
                    }
                })
            } else {
                res.send(false)
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

app.post('/user/:id/change_email', (req, res) => {
    db.query(
        'SELECT * FROM users WHERE email = ?',
        req.body.newEmail,
        (err, result) => {
            newEmail = req.body.newEmail
            oldEmail = req.body.email
            if (result && result.length > 0) {
                res.send(false)
                } else {
                db.query(
                    'UPDATE users SET email=? WHERE email = ?',
                    [newEmail, oldEmail],
                    (error, result2) => {
                        db.query(
                            "SELECT * FROM users WHERE email = ?",
                            req.body.newEmail,
                            (err, result) => {
                                req.session.user = result
                                res.send(req.session.user)
                                console.log(req.session.user)
                            }
                        )
                    }
                )
            }

        }
        )
})

app.post('/user/:id/change_password', (req, res) => {
       db.query(
           'SELECT * FROM users WHERE email = ?',
            req.body.email,
            (err, result) => {
               if(err){
                   res.send(false)
               }
                bcrypt.compare(req.body.oldPassword, result[0].password, (err, response) => {
                    console.log(response)
                    if(response === true) {
                        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                            db.query(
                                'UPDATE users SET password=? WHERE email=?',
                                [hash, req.body.email],
                                (errUpdate, updateResult) => {
                                    req.session.user = result
                                    res.send(req.session.user)
                                }
                            )
                        })
                    } else {
                        res.send(false)
                    }
                })
           }

       )
            })


app.get('/stations_data', (req, res) => {
    db.query(
        'SELECT * FROM stations',
        (err, result) => {
            res.send(result)
        }
    )
})

app.post('/user/:id/station/:id/start_charging', (req, res) => {
    db.query(
        'UPDATE stations SET is_taken=1 WHERE station_id=?',
        req.body.stationId,
        (err, result) => {
            db.query(
                'INSERT INTO connections(user_id, station_id, started_at, is_over) VALUES(?,?,?,0)',
                [req.body.userId, req.body.stationId, req.body.started_at],
                (err, result) => {
                    let active_con  = result.insertId
                    db.query(
                        'UPDATE users SET active_connection=? WHERE id=?',
                        [active_con, req.body.userId],
                        (error, response) => {
                            db.query(
                                "SELECT * FROM users WHERE id = ?",
                                req.body.userId,
                                (err, result1) => {
                                    console.log(result1 )
                                    res.send(result1)
                                }
                            )
                        }
                    )
                }
            )

        }
    )
})

app.post('/user/:id/station/:id/stop_charging', async (req, res) => {
     db.query(
        'SELECT * FROM connections WHERE connection_id=?',
        req.body.activeCon,
        (err, result) => {
            console.log(result)
            db.query('UPDATE stations SET is_taken=0 WHERE station_id=?',
            result[0].station_id)
        }
    )

    db.query(
        'UPDATE connections SET is_over=1, finished_at=? WHERE connection_id=?',
        [req.body.finishedAt, req.body.activeCon]
    )

    db.query(
        'UPDATE users SET active_connection=0, balance=balance-1 WHERE id=? AND active_connection=?',
        [req.body.userId, req.body.activeCon]
    )
    db.query(
        "SELECT * FROM users WHERE id = ?",
        req.body.userId,
        (err, result) => {
            req.session.user = result
            res.send(req.session.user)
        }
    )
})


app.post('/connections_data', (req, res) => {
    db.query(
        'SELECT connections.connection_id, stations.station_name, connections.station_id, stations.station_address, connections.is_over, connections.started_at, stations.price, connections.finished_at FROM connections INNER JOIN stations ON connections.station_id = stations.station_id WHERE user_id=?',
        req.body.userId,
        (err, response) => {
            res.send(response)
        }
    )
})


app.listen(3001, () => {
    console.log('Running server')
})