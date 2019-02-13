let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
   let data = {
       title: 'Hello!',
       content: `これは、サンプルのコンテンツです。
                 this is sample content.`
   };
   res.render('hello', data);
});

module.exports = router;