const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const mockTodos = [
  {
    text: 'First test'
  },
  {
    text: 'Second test'
  },
  {
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


