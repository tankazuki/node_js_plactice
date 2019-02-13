let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    let msg = `何か入力して送信してください。`;

    if (req.session.message != undefined){
        msg = `Last message: ${req.session.message}`;
    }
   let data = {
       title: 'Hello!',
       content: `※何か描いてください。`
   };
   res.render('hello', data);
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

module.exports = router;