const { ObjectID } =  require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('../server/models/user');

var id = '5a5d258d7f4af8239487dd24';

// Todo
//   .find({
//     _id: id
//   })
//   .then(res => {
//     console.log(res);
//   });


// Todo
//   .findOne({
//     _id: id
//   })
//   .then(res => {
//     console.log('Todo:', res);
//   });

User
  .findById(id)
  .then(user => {
    if(!user) {
      throw new Error(`User with id '${id}' not found`);
    } else if (user) {
      console.log(`user found:\n${JSON.stringify(user, undefined, 2)}`);
    }
  }, e => {
    console.log(`ID '${id}' not valid`);
  })
  .catch(e => {
    console.log(e);
  })