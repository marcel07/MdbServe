const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const mockTodos = [
  {
    _id: new ObjectID(),
    text: 'First test'
  },
  {
    _id: new ObjectID(),
    text: 'Second test'
  },
  {
    _id: new ObjectID(),
    text: 'Third test'
  }
];

beforeEach(done => {
  Todo
    .remove({})
    .then(() => {
      return Todo
        .insertMany(mockTodos);
    })
    .then(() => done());
});

describe('GET /todos', () => {
  it('should get all todo list items', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length)
          .toBe(3);
      })
      .end(done);
  });
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'text to do test';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text)
          .toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        };

        Todo
          .find({text})
          .then(todos => {
            expect(todos.length)
              .toBe(1);
            expect(todos[0].text)
              .toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it(`should not create to do with bad data`, (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(418)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo
          .find({})
          .then(todos => {
            expect(todos.length)
              .toBe(3);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe(`GET /todos:id`, () => {
  it(`should get todo from id param`, done => {
    request(app)
      .get(`/todos/${mockTodos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text)
          .toBe(mockTodos[0].text);
      })
      .end(done);
  });

  it(`should return 404 if todo not found`, done => {
    request(app)
      .get('/todos/5a5dde25c3a073271823fb10')
      .expect(404)
      .end(done);
  });

  it(`should return 400 if todo id invalid`, done => {
    request(app)
      .get('/todos/123')
      .expect(400)
      .end(done);
  })
});


