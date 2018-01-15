const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');

beforeEach(done => {
  Todo
    .remove({})
    .then(res => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'text to do test';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        };

        Todo.find().then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
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
            expect(todos.length).toBeLessThan(1);
            done();
          })
          .catch(e => done(e));
      });
  });
})