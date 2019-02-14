let express = require('express');
let router = express.Router();
let mysql= require('mysql');

let mysql_setting = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-nodeapp-db'
};



router.get('/', (req, res, next) => {
    let connection = mysql.createConnection(mysql_setting);

    connection.connect();

    connection.query('SELECT * FROM mydata',
        function(error, results, fields){
                if (error == null) {
                    let data = {title:'mysql', content:results};
                    res.render('hello/index', data)
                }
        });
   connection.end();
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
        content: '※新しいレコードを入力'
    };
    res.render('hello/add', data);
});

router.post('/add', (req, res, next) => {
    let nm = req.body.name;
    let ml = req.body.mail;
    let ag = req.body.age;
    let data = {name: nm, mail: ml, age: ag};

    let connection = mysql.createConnection(mysql_setting);

    connection.connect();

    connection.query('INSERT INTO mydata set ?', data, function(error, results, fields){
       res.redirect('/hello');
    });
    connection.end();
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

module.exports = router;