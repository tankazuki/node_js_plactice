let express = require('express');
let router = express.Router();

let data = [
    {name:'Kazuki', age: 35, mail:'kazuki@kazuki' },
    {name:'Taro', age: 22, mail:'taro@taro'}
];

router.get('/', (req, res, next) => {
    let num = req.query.id;
    res.json(data[num]);
});

module.exports = router;