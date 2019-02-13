let express = require('express');
let ejs = require('ejs');

let app = express();

app.engine('ejs', ejs.renderFile);
app.use(express.static('public'));

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));



app.get('/', (req, res) => {
    let data = {
        'Taro':'taro@taro',
        'Kazuki': 'kazuki@kazuki'
    };
    res.render('index.ejs', {
        title: 'Index',
        content: 'This is Express-app Top Page',
        data: data
    });
});

app.get('/other', (req, res) => {

   let name = req.query.name;
   let pass = req.query.pass;
   let msg = `あなたの名前は「${name}」
                パスワードは「${pass}」です`;
   res.render('index.ejs',
       {
           title: 'other',
           content: msg,
           link: {href:'/', text:'トップへ戻る'}
       });
});

app.post('/', (req, res) => {
  let msg = `This is Posted Page!
             あなたは「${req.body.message}」と送信しました。`;

  res.render('index.ejs', {
      title: 'Posted',
      content: msg
  });

});

app.listen(3000, () => {
   console.log('Server is running!');
});