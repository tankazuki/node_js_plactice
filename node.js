const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');

let server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start');

function getFromClient(request, response){
     let url_parts = url.parse(request.url, true);
     switch (url_parts.pathname) {

     case '/':
       response_index(request, response);
       break;

     case '/style.css':
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.write(style_css);
      response.end();
      break;

     case '/other':
      response_other(request, response);
      break;

    default:
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('no page...');
      break;
   }
}
let data = {
    'Taro': '000-111-222',
    'kazuki': '000-111-333',
    'yoshio': '000-111-444'
};

function response_index(request, response){
  let msg = "これはIndexページです";
  let content = ejs.render(index_page, {
    title: "Index",
    content: msg,
      data: data,
      filename: 'data_item'
  });
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(content);
  response.end();
}

var data2 = {
    'Taro': ['taro@kkkkk', '000-111-222', 'Tokyo'],
    'kazuki':['kazuki@kkkkk', '000-111-333', 'Yamagata'],
    'yoshio':['yoshio@kkkkk', '000-111-444', 'USA']
};

function response_other(request, response){
  let msg = "これはOtherページ。";
  let content = ejs.render(other_page, {
      title: "Other",
      content: msg,
      data: data2,
      filename: 'data_item'
  });
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(content);
  response.end();
}
