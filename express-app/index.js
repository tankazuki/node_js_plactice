let express = require('express');
let ejs = require('ejs');

let app = express();

app.engine('ejs', ejs.renderFile);

app.get('/', (req, res) => {
    res.render('index.ejs', {
        title: 'Index',
        content: 'This is Express-app Top Page'
    });
});

app.listen(3000, () => {
   console.log('Server is running!');
});