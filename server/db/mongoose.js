var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const getMongoUrl = () => {
  // return 'mongodb://admin:!Super1Secret!@ds159187.mlab.com:59187/todos-app';
}

mongoose.connect(getMongoUrl() ? getMongoUrl() : 'mongodb://localhost:27017/TodoApp', {useMongoClient: true});

module.exports = { mongoose };