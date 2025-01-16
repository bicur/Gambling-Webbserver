const express = require('express')
const app = express();
const port = 3000;
const sessions = require('express-session');
const dotenv = require("dotenv").config();
const dataBasConn = require("./databaseUsers");
const bcrypt = require("bcrypt");

const userRouter = require("./routes/userRouter")
const gamesRouter = require("./routes/gamesRouter")

app.set('view engine', 'ejs');
app.use('/public', express.static('public'))
app.use(express.urlencoded({extended:false}));

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: {
        maxAge: 1000*60*60*24
    },
    resave: false
}))

app.use((req,res, next) => {
    res.locals.isLoggedIn = !!req.session.user ? true : false;
    if (req.session.user){
        next();
    }else if(req.originalUrl == "/" || req.originalUrl == "/signup" || req.original == "/login"){
        next();
    }else {
        res.render('login');
    }
});

app.get('/', async function(req, res){
    res.render('index');
})

app.use('/', userRouter)
app.use('/', gamesRouter)

app.listen(port, function(){
    console.log('Servern körs på http://localhost:'+ port);
})