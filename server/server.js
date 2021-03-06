const config = require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');

var { User } = require('./models/user');
var { Todo } = require('./models/todo');

var app = express();


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  
  todo
  .save()
  .then(doc => {
    res.send(doc);
  }, e => {
    res.status(418).send(e);
  })
});

app.get('/todos', (req, res) => {
  var todos = [];

  Todo
    .find({})
    .then(todos => {
      res.send({todos});
    }, e => {
      return res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(400).send({});
  } else {
    Todo
      .findById(id)
      .then(todo => {
        if(todo){
          res
            .status(200)
            .send({todo});
        } else {
          res
            .status(404)
            .send({});
        }
      })
      .catch(e => {
        res
          .status(400)
          .send({});
      })
  }
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res
      .status(400)
      .send({});
  } else {
    Todo
      .findByIdAndRemove(id)
      .then(todo => {
        if(!todo) {
          res
            .status(404)
            .send({});
        } else {
          res
            .status(200)
            .send({todo});
        }
      })
      .catch(e => {
        res
          .status(400)
          .send({});
      })
  }
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)) {
    res
      .status(400)
      .send({});
  } else {
    if(_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
    
    Todo
      .findByIdAndUpdate(id, {
        $set: body
      }, {
        new: true
      })
      .then(todo => {
        if(!todo) {
          res
            .status(404)
            .send({});
        } else {
          res
            .status(200)
            .send({todo});
        }
      })
      .catch(e => {
        res
          .status(400)
          .send({});
      });
  };
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});



module.exports = { app }