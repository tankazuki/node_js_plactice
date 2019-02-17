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

let Message = Bookshelf.Model.extend({
  tableName: 'messages',
  hasTimestamp: true,
  user: function() {
    return this.belongsTo(User)
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.login == null){
    res.redirect('/users');
  } else {
    res.redirect('/1');
  }
});


router.get('/:page', (req, res, next) => {
  if (req.session.login == null) {
    res.redirect('/users');
    return ;
  }
  let pg = req.params.page;
  pg *= 1;
  if (pg < 1){pg = 1;}
  new Message().orderBy('created_at', 'DESC')
      .fetchPage({page:pg, pageSize:10, withRelated: ['user']})
      .then((collection) => {
        let data = {
          title: 'miniBoard',
          login: req.session.login,
          collection: collection.toArray(),
          pagination: collection.pagination
        };
        res.render('index', data)
      }).catch((err) => {
        res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.post('/', (req, res, next) => {
  let rec = {
    message: req.body.msg,
    user_id: req.session.login.id
  };
  new Message(rec).save().then((model) => {
    res.redirect('/');
  });
});

module.exports = router;
