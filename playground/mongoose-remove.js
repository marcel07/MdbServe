const { ObjectID } =  require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('../server/models/user');

Todo
  .findByIdAndRemove('5a5def8a0f50510574ac814f')
  .then(todo => {
    console.log(JSON.stringify(todo, undefined, 2));
  })