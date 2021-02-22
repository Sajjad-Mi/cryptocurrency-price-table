const express = require('express');
const crypto = require('./route/cryptocurrency');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.listen(3000);

app.use(crypto);
