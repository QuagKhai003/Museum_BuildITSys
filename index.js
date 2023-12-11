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

app.get('/all', (req, res) => {
    res.render('allartworkpage/allartwork');
})
  
app.get('/about', (req, res) => {
    res.render('aboutuspage/aboutus');
})

app.get('/dashUser', (req, res) => {
    res.render('dashboardpage/user');
})

app.get('/dashArtist', (req, res) => {
    res.render('dashboardpage/artist');
})

app.get('/dashAdmin', (req, res) => {
    res.render('dashboardpage/admin');
})


app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
});