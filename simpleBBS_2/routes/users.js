var express = require('express');
var router = express.Router();

let mysql = require('mysql');

let knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-nodeapp-db',
    charset: 'utf8'
  }
});

let Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('pagination');

let User = Bookshelf.Model.extend({
  tableName: 'users'
});

router.get('/add', (req, res, next) => {
  let data = {
    title: 'Users/Add',
    form: {name: '', password: '', comment: ''},
    content: '登録する名前、パスワード、コメントを入力してください'
  };
  res.render('users/add', data)
});

router.post('/', (req, res, next) => {
  let request = req;
  let response = res;
  req.check('name', 'NAMEは必ず入力してください').notEmpty();
  req.check('password', 'PASSWORDは必ず入力してください').notEmpty();
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      let content = '<ul class="error">';
      let result_arr = result.array();
      for(let n in result_arr){
        content += `<li>${result_arr[n].msg}</li>`
      }
      content += '</ul>';
      let data = {
        title: 'Users/Login',
        content: content,
        form: req.body
      }
      response.render('users/login', data);
    } else {
      let nm = req.body.name;
      let pw = req.body.password
      User.query({where: {name: nm}, andWhere: {password: pw}})
      .fetch()
          .then((model) => {
            if (model == null){
              let data = {
                title: '再入力',
                content: `<p class="error">名前またはパスワードが違います。`,
                form: req.body
              };
              response.render('users/login', data);
            } else {
              request.session.login = model.attributes;
              let data = {
                title: 'Users/Login',
                content: `<p>ログインしました！<br>トップページに戻ってメッセージを送信ください`,
                form: req.body
              };
              response.render('users/login', data);
            }
          });
    }
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
