const { app } = require('../index.js')
const { db } = require('../index.js')
const { expect } = require('chai')
const request = require('supertest')

describe('TODO-list API Integration Tests', () => {
  describe('POST /tasks', () => {
    it('creates a new task', (done) => {
      request(app)
        .post('/tasks')
        .send({
          title: 'study',
          done: false
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('title', 'done', 'id')
          expect(res.body).to.have.property('title', 'study')
          expect(res.body).to.have.property('done', false)
          done(err)
        })
    })
  })

  describe('GET /tasks', () => {
    it('returns all tasks', (done) => {
      request(app)
        .get('/tasks')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('array')
          done(err)
        })
    })
  })

  describe('GET /tasks/:id', () => {
    it('returns a task by id', (done) => {
      const task = db.get('tasks')
        .first()
        .value()

      request(app)
        .get(`/tasks/${task.id}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.eql(task)
          done(err)
        })
    })

    it('returns HTTP status 404 when id is not found', (done) => {
      const task = {
        id: 'fakeID',
        title: 'learn async/await',
        done: false
      }

      request(app)
        .get(`/tasks/${task.id}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404)
          done(err)
        })
    })
  })

  // Testing how to update a task expecting status 201 of success
  describe('PUT /tasks/:id', () => {
    it('updates a task', (done) => {
      const task = db.get('tasks')
        .first()

      request(app)
        .put(`/tasks/${task.id}`)
        .send({
          title: 'travel',
          done: false
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201)
          done(err)
        })
    })
  })

  describe('DELETE /tasks/:id', () => {
    it('removes a task', (done) => {
      const task = db.get('tasks')
        .first()

      request(app)
        .delete(`/tasks/${task.id}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201)
          done(err)
        })
    })
  })
})
