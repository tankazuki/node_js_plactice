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

module.exports = router;