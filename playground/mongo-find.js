const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

console.log(obj.getTimestamp());

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err) {
    return console.log(`Unable to connect to MongoDB server`);
  };
  console.log(`Connected to MongoDB server`);
  
  const db = client.db('TodoApp');

  db.collection('Todos')
    .find()
    .count((err, res) => {
      console.log(`Total docs: ${res}`);
    })

  client.close();
});