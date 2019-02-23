var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
  .container {
    position: relative;
    width: 100%;
  }
  
  .image {
    display: block;
    width: 100%;
    height: 100%;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: #FDFDFD;
  }
  
  .container:hover .overlay {
    opacity: 1;
  }
  
  .text {
    color: black;
    font-size: 80px;
    font-family: Georgia, "맑은 고딕", serif; 
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    onclick: window.location.reload();
  }
  </style>
  </head>
  <body>
    
  <div onclick="window.location.reload()" class="container">
    <img src="/imgs" alt="Avatar" class="image">
    <div class="overlay">
      <div class="text">Hello! 안녕하세요!</div>
    </div>
  </div>
  
  </body>
  </html>`;
}

//서버를 생성하는 객체를 만듬
var app = http.createServer(function(request, response) {
  //_url 변수에 현재 url를 저장함
  var _url = request.url;
  //_url 에서 쿼리 데이터만을 저장함
  var queryData = url.parse(_url, true).query;
  //_url 에서 path만을 저장함
  var pathname = url.parse(_url, true).pathname;
  //path가 루트 디렉터리 인경우
  if (pathname === '/') {
    //쿼리데이터가 정의된게 아니라면(없다면)
    if (queryData.id === undefined) {
        var template = templateHTML();
        //200은 상태코드
        //명시적 헤더 데이터전송
        //헤더 작성 메서드
        response.writeHead(200);
        //헤더의 마지막 비트를 지정
        //헤더의 마지막 데이터로 template(html)을 전송함
        response.end(template);
    }
    else {
      fs.readdir('../project', function(error, filelist) {
          var template = templateHTML();
          //200은 상태코드
          response.writeHead(200);
          response.end(template);
      });
    }
    
}else if(pathname === '/imgs'){
    fs.readFile('coding2.jpg',function(error,data){
      //200은 상태코드
      response.writeHead(200);
      response.end(data);
    })
    //에러페이지 조건
  }else {
    //404은 상태코드
    response.writeHead(404);
    response.end('Not found');
  }
});
//3000번 포트에 서버를 실행시킨다.
app.listen(3000);
