// 모듈을 추출합니다.
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'user'
});

// 데이터베이스 쿼리를 사용합니다.
client.query('SELECT * FROM user', function(error, result, fields) {
    if(error) {
        console.log('쿼리 문장에 오류가 있습니다.');
    } else {
        console.log(result);
    }
});



// 서버를 생성합니다.
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

// 서버를 실행합니다.
app.listen(3030, function () {
    console.log('server running at http://127.0.0.1:3030');
});

// 라우트를 수행합니다.
app.get('/', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('list.html', 'utf8', function (error, data) {
        // 데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM user', function (error, results) {
            // 응답합니다.
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});

app.get('/insert', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('insert.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});

app.post('/insert', function (request, response) {
    // 변수를 선언합니다.
    var body = request.body;
    // 데이터베이스 쿼리를 실행합니다.
    client.query('INSERT INTO user (user_id, user_name) VALUES (?, ?)', [
        body.user_id, body.user_name
    ], function () {
        // 응답합니다.
        response.redirect('/');
    });
});

app.get('/edit/:id', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('edit.html', 'utf8', function (error, data) {
        // 데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM user WHERE user_id = ?', [
            request.params.id
        ], function (error, result) {
            // 응답합니다.
            response.send(ejs.render(data, {
                data: result[0]
            }));
        });
    });
});

app.post('/edit/:id', function (request, response) {
    // 변수를 선언합니다.
    var body = request.body;
    // 데이터베이스 쿼리를 실행합니다.
    client.query('UPDATE user SET user_name=?,user_id=? WHERE id=?'
        , [body.user_name,body.user_id,request.params.id], function () {
        // 응답합니다.
        response.redirect('/');
    });
});

app.get('/delete/:id', function (request, response) {
    // 데이터베이스 쿼리를 실행합니다.
    client.query('DELETE FROM user WHERE user_id=?', [request.params.id], function () {
        // 응답합니다.
        response.redirect('/');
    });
});
