const express = require('express');
var { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');

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
app.listen(3000, () => {
  console.log(`Started on port 3000`);
});


module.exports = { app }