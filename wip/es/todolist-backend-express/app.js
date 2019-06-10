const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // for parsing application/json


app.get('/', (req, res) => res.send('Hello World!'));

var todos = require(__dirname + '/controllers/todosRouter');
app.use('/todos', todos);

app.listen(3000, () => console.log('Server ready'));
