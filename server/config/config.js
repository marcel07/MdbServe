var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  var port = process.env.PORT || 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
  var port = process.env.PORT || 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}