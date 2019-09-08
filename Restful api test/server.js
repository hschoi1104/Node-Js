var express = require('express');
var mysql = require('mysql');
var app = express();
var testApi = require('./api');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var dbconn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'1234',
  database:'user'
});

app.get('/test',testApi.gettest);

var server = app.listen(3030, function () {
  console.log('load Success!');
});
