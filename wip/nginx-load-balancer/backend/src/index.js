// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) =>  {    
   console.log('console: I just received a GET request on port 3000!');
   res.send('res: Hello World!');
});

app.listen(3000, () => {
   console.log('console: I just connected on port 3000!');
});
