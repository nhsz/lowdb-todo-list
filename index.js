const express = require('express')
const bodyParser = require('body-parser')
const shortid = require('shortid')

// Database
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const { PORT = 3000 } = process.env

const app = express()
app.use(bodyParser.json())

/*
  Method: POST
  Endpoint: /tasks/
  Usage: Create a new task
  Returns: New task
*/
app.post('/tasks', (req, res) => {
  const task = req.body

  db.get('tasks')
    .push(task)
    .last()
    .assign({ id: shortid.generate() })
    .write()

  res.status(201).json(task)
})

/*
  Method: GET
  Endpoint: /tasks/
  Usage: List all tasks
  Returns: TODO-list
*/
app.get('/tasks', (req, res) => {
  res.status(200).json(db.get('tasks'))
})

/*
  Method: GET
  Endpoint: /tasks/{id}
  Usage: Get a specific task
  Returns: Task
*/
app.get('/tasks/:id', (req, res) => {
  const task = db.get('tasks')
    .find({ id: req.params.id })
    .value()

  if (task) {
    res.status(200).json(task)
  }

  res.status(404).send(`Sorry can't find that!`)
})

/*
  Method: PUT
  Endpoint: /tasks/{id}
  Usage: Update a specific task
  Returns: Task
*/
app.put('/tasks/:id', (req, res) => {
  const task = req.body
  const id = req.params.id

  db.get('tasks')
    .find(id)
    .assign(task)
    .write()

  res.status(201).json(task)
})

/*
  Method: DELETE
  Endpoint: /tasks/{id}
  Usage: Destroy a specific task
  Returns: Task
*/
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id

  db.get('posts')
    .remove(id)
    .write()

  res.status(201).send(`Task with id: '${id}' has been deleted`)
})

// Server
app.listen(PORT, () => {
  db.defaults({ tasks: [] }).write()
  console.log(`Server listening on ${PORT}...`)
})

module.exports = { app, db }
