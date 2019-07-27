/**
 *
 */

import {AbstractModel} from './AbstractModel';

// const path = require('path');
// const file = path.join(__dirname, 'test.data.json');

class TodoManager extends AbstractModel {
  constructor() {
    super('todo');
  }
}

const todoManager = new TodoManager();
todoManager.list().then(res => console.log(res));
const todo = {
  title: 'hey',
  content: 'yp',
};
todoManager.create(todo).then(() => {
  todoManager.list().then(res => console.log(res));
  todoManager.read(2).then(res => console.log(res));
});
