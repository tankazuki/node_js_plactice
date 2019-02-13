let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    let name = req.query.name;
    let mail = req.query.mail;
   let data = {
       title: 'Hello!',
       content: `※何か描いてください。`
   };
   res.render('hello', data);
});

router.post('/post', (req, res, next) => {
    let msg = req.body['message'];
    let data = {
        title: 'Hello!',
        content: msg
    }
    res.render('hello', data);
});

module.exports = router;