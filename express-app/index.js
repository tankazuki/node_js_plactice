let express = require('express');
let app = express();

app.get('/', (req, res) => {
  res.send('Welcomet to Express!');
});

app.listen(3000, () => {
   console.log('Start server port:3000');
});