import { data, data2 } from './data'; 
import { Animal, Cat } from './animal.class'

// https://www.youtube.com/watch?v=nZ1DMMsyVyI
// https://hackernoon.com/12-javascript-concepts-that-will-level-up-your-development-skills-b37d16ad7104

// ----- argument -----

function add(...numbers) {
    return numbers.reduce((prev, next) => prev + next);
}

function addArray(numbers) {
    return numbers.reduce((prev, next) => prev + next);
}

console.log(add(1, 2, 3, 4));
console.log(addArray(data));
let [first] = data;
console.log(first);

// const tito = new Animal('Cat', false);
const tito = new Cat('Cat', false, 1);

tito.type = 'BEAST';
const { type, wild } = tito;

console.log(tito.type);
console.log(tito.wild);
console.log(tito.metaData);

console.log(tito.roar('MEOW'));

console.log(Animal.favoriteAnimal('cat'));

function introduce({ name, age }) {
  console.log(`I'm ${name} and I'm ${age} years old!`);
}

function myFunc(...args) {
  console.log(args[0] + args[1]);
}
  
myFunc(1, 2, 3, 4);

// ----- Closure -----

function apiConnect(apiKey) {
    function get(route) {
      return fetch(`${route}?key=${apiKey}`);
    }
  
    function post(route, params) {
      return fetch(route, {
        method: 'POST',
        body: JSON.stringify(params),
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        })
    }
  
    return { get, post }
  }
  
  const api = apiConnect('my-secret-key');
  
  // No need to include the apiKey anymore
  api.get('http://www.example.com/get-endpoint');
  api.post('http://www.example.com/post-endpoint', { name: 'Joe' });

  // array method

  // map, reduce, filter
  // find, findIndex, indexOf
  // push, pop, shift, unshift
  // splice, slice
  // sort

  // ----- generator

  function* greeter() {
    yield 'Hi';
    yield 'How are you?';
    yield 'Bye';
  }
  
  const greet = greeter();
  
  console.log(greet.next().value);
  // 'Hi'
  console.log(greet.next().value);
  // 'How are you?'
  console.log(greet.next().value);
  // 'Bye'
  console.log(greet.next().value);
  // undefined

  function* idCreator() {
    let i = 0;
    while (true)
      yield i++;
  }
  
  const ids = idCreator();
  
  console.log(ids.next().value);
  // 0
  console.log(ids.next().value);
  // 1
  console.log(ids.next().value);
  // 2
  // etc...

  // ----- async await -----

  const greeter = new Promise((res, rej) => {
    setTimeout(() => res('Hello world!'), 2000);
  })
  
  async function myFunc() {
    const greeting = await greeter;
    console.log(greeting);
  }
  
  myFunc();
  // 'Hello world!'