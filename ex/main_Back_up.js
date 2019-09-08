var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

/*
function templateHTML(title, list, body, control) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="15">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
    <p><img src="/imgs" width="500" height="500"></p>
  </body>
  </html>
  `;
}
*/
/*
function templateHTML(title, list, body, control) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - nodejs 가 싫어요</title>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="10">
  </head>
  <body>
    <h1><a href="/">nodejs 가 싫어요</a></h1>
    <p><img onclick="window.location.reload()" src="/imgs" width="100%" height="100%"></p>
  </body>
  </html>
  `;
}
*/
function templateHTML(title, list, body, control) {
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

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('../#13', function(error, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        var template = templateHTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    }
    else {
      fs.readdir('../project', function(error, filelist) {
        fs.readFile(`../project/${queryData.id}`, 'utf8', function(err, description) {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>
            <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="delete">
            </form>
            `
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
    /*
  } else if (pathname === '/create') {
    fs.readdir('../#13', function(error, filelist) {
      var title = 'WEB - create';
      var list = templateList(filelist);
      var template = templateHTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `, '');
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function(data) {
      body = body + data;
    });
    request.on('end', function() {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`../#13/${title}`, description, 'utf8', function(err) {
        response.writeHead(302, {
          Location: `/?id=${title}`
        });
        response.end();
      })
    });
    //update form
  } else if (pathname === '/update') {
    fs.readdir('../#13', function(error, filelist) {
      fs.readFile(`../#13/${queryData.id}`, 'utf8', function(err, description) {
        var title = queryData.id;
        var list = templateList(filelist);
        var template = templateHTML(title, list,
          `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    });
    //update process
  } else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function(data) {
      body = body + data;
    });
    request.on('end', function() {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`../#13/${id}`, `../#13/${title}`, function(error) {
        fs.writeFile(`../#13/${title}`, description, 'utf8', function(err) {
          response.writeHead(302, {
            Location: `/?id=${title}`
          });
          response.end();
        })
      })
    });
  } else if (pathname === '/delete_process') {
    var body = '';
    request.on('data', function(data) {
      body = body + data;
    });
    request.on('end', function() {
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`../#13/${id}`, function(error) {
        response.writeHead(302, {
          Location: `/`
        });
        response.end();
      });
    });
  } else
  */
}else if(pathname === '/imgs'){
    fs.readFile('coding2.jpg',function(error,data){
      response.writeHead(200,{'Content-Type': 'text/html'});
      response.end(data);
    })
  }else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
