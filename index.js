const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('homepage/homepage');
});

app.get('/login', (req, res) => {
    // Render each template separately
    res.render('loginpage/login');
    res.render('registeringpage/register');
});

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});
