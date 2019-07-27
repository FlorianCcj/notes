import { isObject, isNumber } from '../utils/typeTester';
let TodoModel = require('../models/todoSchema');

var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  let test = new TodoModel({
    title: 'profsdut'
  });
  test.save()
    .then(doc => console.log(doc))
    .catch(err => console.log(err))
  /*
  TodoManager.list().then(
    (data) => res.send({data})
  );
  */
  res.end();
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
  res.send({data});
});

module.exports = router;
