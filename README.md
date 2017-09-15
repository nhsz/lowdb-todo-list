# lowdb-todo-list

TODO-list **REST API** with **CRUD operations**, built with **NodeJS**, **ExpressJS**, and [**Lowdb**](https://github.com/typicode/lowdb) as database. Tested with **Mocha**, **Chai** and **SuperTest**.

## Usage

1. Clone the repository: `git clone https://github.com/nhsz/restify-todo-list.git`
2. `cd lowdb-todo-list/`
3. `npm install [yarn install]`
4. `npm start`

## Test

`npm test`

## API Endpoint Reference

| Method | Endpoint    | Usage                   | Returns   |
| ------ | ----------- | ----------------------- | --------- |
| POST   | /tasks/     | Create a new task       | New task  |
| GET    | /tasks/     | List all tasks          | TODO-list |
| GET    | /tasks/{id} | Get a specific task     | Task      |
| PUT    | /tasks/{id} | Update a specific task  | Task      |
| DELETE | /tasks/{id} | Destroy a specific task | Task      |
