/*
app.get('/', function (req, res) {
  //console.log('Hello World!');
  res.sendFile(__dirname+'/app/index.html');

});
app.get('/get',function(req,res){
  dbconn.query('select * from user where user_id=?',req.query.user_id,function(err,rows,fields){
    res.json(rows);
    console.log('done');
  });
});
app.get('/get/:user_id',function(req,res){
  dbconn.query('select * from user where user_id=?',req.params.user_id,function(err,rows,fields){
    res.json(rows);
    console.log('done');
  });
});
app.get('/tests',function(req,res){
  dbconn.query('select * from user',function(err,rows,fields){
    res.json(rows);
    console.log('done');
  });
});
*/
var mysql = require('mysql');
var dbconn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'1234',
  database:'user'
});
exports.getUser=function(req,res){
  dbconn.query('select * from user',function(err,rows,fields){
    res.json(rows);
    console.log('done/test');
  });
};

/*
exports.posttest=function(req,res){
  var user_id = req.body.user_id,
  password = req.body.password;
  console.log(user_id);
  console.log(password);
};
exports.puttest=function(req,res){
  var user_id = req.body.user_id,
  passwod = req.body.password;
  console.log(user_id);
  console.log(password);
};
*/
