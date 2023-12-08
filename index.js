const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('homepage/homepage');
})

app.get('/login', (req, res) => {
    res.render('loginpage/login');
})

app.get('/login', (req, res) => {
    res.render('registerpage/register');
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
});