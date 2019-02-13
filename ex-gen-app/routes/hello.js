let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    let name = req.query.name;
    let mail = req.query.mail;
   let data = {
       title: 'Hello!',
       content: `あなたの名前は「${name}」。
                 メールアドレスは「${mail}」です。`
   };
   res.render('hello', data);
});

module.exports = router;