const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./db');
const task = require('./cronJobs');
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
///const { Server } = require('socket.io');
// const cookieParser = require('cookie-parser');

// https://www.npmjs.com/package/helmet
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const server = require("http").createServer(app);

app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5

/*const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: "true"
    }
});*/

app.use(session({
    secret: "secret", // change and put in env
    name: "session_id",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

app.use(passport.initialize());

app.use(passport.session());


authUser = async (email, password, done) => {
    try {
        const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        const user = result.rows[0]
        
        bcrypt.compare(password, user.password, (err, compare) => {
            if(compare){
                console.log(user);
                return done(null, user);
            } else {
                return done(null, false, { message: "Invalid credentials" });
            }
        });
    } catch (err) {
        console.log(err);
        return done(err);
    }
}

passport.use(new localStrategy ({ usernameField: "email", passwordField: "password" }, authUser));

passport.serializeUser((userObj, done) => {
    console.log("SERIALISE")
    console.log(userObj.user_id);
    done(null, userObj.user_id);
});

passport.deserializeUser(async (id, done) => {
    console.log("DESERIALISE");
    try {
        const result = await db.query(`SELECT * FROM users WHERE user_id = $1;`, [id]);
        const user = result.rows[0];
        console.log(user);
        done(null, user);
    } catch (err) {
        console.log(err);
        return done(err);
    }
    //console.log(user);
    //done(null, user);
})

const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//io.on("connect", socket => {});
let count = 1

printData = (req, res, next) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`req.body.username -------> ${req.body.email}`) 
    console.log(`req.body.password -------> ${req.body.password}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)
  
    console.log(`\n req.user -------> `) 
    console.log(req.user) 
  
    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`) 
    console.log(`req.session.cookie -------> `) 
    console.log(req.session.cookie) 
  
    console.log("===========================================\n")

    next()
}

//app.use(printData) //user printData function as middleware to print populated variables
routes(app, db);

task.start();




app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;