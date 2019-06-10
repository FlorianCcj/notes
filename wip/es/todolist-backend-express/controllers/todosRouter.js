import  { TodoModel } from '../models/TodoModel';
import { isObject, isNumber } from '../utils/typeTester';

var express = require('express');
var router = express.Router();

const TodoManager = new TodoModel();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  TodoManager.list().then(
    (data) => res.send({data})
  );
});
router.get('/:id', function(req, res) {
  console.log(req.params);
  if (
    !isObject(req.params)
    && !req.params.hasOwnProperties('id')
    && !isNumber(req.params.id)
  ) {
    res.status(400).send('Miss ID parameter')
  } else {
    TodoManager.read(req.params.id).then(
      (data) => res.send({data})
    );
  }
});
router.post('/', function(req, res) {
  TodoManager.create(req.body).then(
     (data) => res.send({data})
  );
});

module.exports = router;
