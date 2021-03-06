const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const users =[];
const app = express();
const passport = require('passport')
const flash = require('express-flash')
const initializePassport = require('./passport-config')
const session = require('express-session')

initializePassport(passport, 
    email=> users.find(user => user-email ===email) )

app.set('view-engine','ejs');

app.use(express.urlencoded({extended: false}));
app.use(flash())

app.get('/', function(req,res){
    res.render('index.ejs')
})


app.get('/login', function(req,res){
    res.render('login.ejs')
})


app.get('/register', function(req,res){
    res.render('register.ejs')
})


app.post('/register', async function(req,res){
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login');
        console.log(users);

    } catch {
        res.redirect('/register')
    }
})

app.listen(3000);

