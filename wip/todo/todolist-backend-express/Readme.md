docker build . -t test
docker run -d test

npm i
npm start
dans le navigateur
localhost:3000
localhost:3000/todos
localhost:3000/todos/!

curl -d '{"title":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/todos
curl -d '@fixtures/todoToCreate' -H "Content-Type: application/json" -X POST http://localhost:3000/todos


docker run -d mongo:4.1

mongoexport -d todos -c todos -o todos.json --jsonArray
