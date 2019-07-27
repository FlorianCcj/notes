import { Database } from './models/database';

const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 

const db = new Database("172.17.0.2", 'todos');

const app = express();

/*
const linkToMongodb = 'mongodb://172.17.0.3:27017/todos';
mongoose.connect(linkToMongodb, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
*/


app.use(bodyParser.json()); // for parsing application/json
app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'));

var todos = require(__dirname + '/controllers/todosRouter');
app.use('/todos', todos);

app.listen(3000, () => console.log('Server ready, listen port 3000'));
