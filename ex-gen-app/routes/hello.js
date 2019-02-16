let express = require('express');
let router = express.Router();
let mysql= require('mysql');
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

let MyData = Bookshelf.Model.extend({
   tableName: 'mydata'
});

let mysql_setting = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-nodeapp-db'
};

router.get('/', (req, res, next) => {
    new MyData().fetchAll().then((collection) => {
     let data = {
         title: 'Hello',
         content: collection.toArray()
     };
     res.render('hello/index', data);
    })
    .catch((err) =>{
        res.status(500).json({error: true, data: {
            message: err.message
            }});
    });
});

router.post('/post', (req, res, next) => {
    let msg = req.body['message'];
    req.session.message = msg;
    let data = {
        title: 'Hello!',
        content: `Last message: ${req.session.message}`
    };
    res.render('hello', data);
});

router.get('/add', (req, res, next) => {

    let data = {
        title: 'Hello/Add',
        content: '※新しいレコードを入力',
        form: {name: "", mail: "", age: 0}
    };
    res.render('hello/add', data);
});

router.post('/add', (req, res, next) => {
    let response = res;
    new MyData(req.body).save().then((model)=>{
        response.redirect('/hello');
    })
});

router.get('/show', (req, res, next) => {
    let id = req.query.id;

    let connection = mysql.createConnection(mysql_setting);

    connection.connect();

    connection.query('SELECT * FROM mydata WHERE id=?', id,
        function(error, results, fields){
            if(error === null){
              let data = {
                  title: 'Hello/show',
                  content: `id = ${id} のレコード`,
                  mydata: results[0]
              };
              res.render('hello/show', data);
            }
        });
    connection.end();
});

router.get('/edit', (req, res, next) => {
    let id = req.query.id;

    let connection = mysql.createConnection(mysql_setting);

    connection.connect();

    connection.query('SELECT * FROM mydata WHERE id=?', id,
        function(error, results, fields){
            if (error == null){
                let data = {
                    title: 'Hello/edit',
                    content: `id = ${id}のレコード`,
                    mydata: results[0]
                };
                res.render('hello/edit', data);
            }
        });
    connection.end();
});

router.post('/edit', (req, res, next) => {
   let id = req.body.id;
   let nm = req.body.name;
   let ml = req.body.mail;
   let ag = req.body.age;
   let data = {name: nm, mail: ml, age: ag};

   let connection = mysql.createConnection(mysql_setting);

   connection.connect();

   connection.query('UPDATE mydata SET ? WHERE id = ? ', [data, id],
       function(error, results, fields){
       res.redirect('/hello');
       });
    connection.end();
});

router.get('/delete', (req, res, next) => {
    let id = req.query.id;

    let connection = mysql.createConnection(mysql_setting);

    connection.connect();

    connection.query('SELECT * FROM mydata WHERE id=?', id,
        function(error, results, fields){
            if (error == null){
                let data = {
                    title: 'Hello/delete',
                    content: `id = ${id}のレコード`,
                    mydata: results[0]
                };
                res.render('hello/delete', data);
            }
        });
    connection.end();
});

router.post('/delete', (req, res, next) => {
   let id = req.body.id;

   let connection = mysql.createConnection(mysql_setting);

   connection.connect();

   connection.query('DELETE FROM mydata WHERE id=?', id,
       function(error, results, fields){
       res.redirect('/hello');
       });

    connection.end();
});

router.get('/find', (req, res, next) => {
   let data = {
       title: '/Hello/Find',
       content: '検索IDを入力',
       form: {fstr: ''},
       mydata: null
   };
   res.render('hello/find', data)
});

router.post('/find', (req, res, next) => {
    new MyData().where('id', '=', req.body.fstr).fetch().then((collection) =>{
        let data = {
            title: 'Hello',
            content: `id = ${req.body.fstr}の検索結果`,
            form: req.body,
            mydata: collection
        };
        res.render('hello/find', data);
    })
});

Bookshelf.plugin('pagination');

router.get('/:page', (req, res, next) => {
   let pg = req.params.page;
   pg *= 1;
   if (pg < 1){pg = 1; }
   new MyData().fetchPage({page:pg, pageSize:3}).then((collection) => {
       let data = {
           title: 'Hello',
           content: collection.toArray(),
           pagination: collection.pagination
       };
       console.log(collection.pagination);
       res.render('hello/index', data);
   })
});
module.exports = router;