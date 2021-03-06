const express = require('express');
const path = require('path');

//INITIALIZE EXPRESS
const app = express();

//CONFIGS
app.set('PORT', process.env.PORT || 3000);
app.set('view engine', 'pug');      //TEMPLATE ENGINE
app.set('views', path.join(__dirname, './public'));

//MIDDLEWARES
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//ROUTES
app.use(require('./routes/parser'));

module.exports = app;