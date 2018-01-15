const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

console.log(obj.getTimestamp());

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err) {
    return console.log(`Unable to connect to MongoDB server`);
  };
  console.log(`Connected to MongoDB server`);
  
  const db = client.db('TodoApp');
  const todoCollection = db.collection('Todos');
  const usersCollection = db.collection('Users');
  
  // todoCollection
  //   .findOneAndUpdate({text: 'Feed Fishes'}, {
  //    $set: {
  //      completed: true
  //    }
  //   }, {
  //     returnOriginal: false
  //   })
  //   .then((res) => {
  //     console.log('Completed with task ->', res);
  //   })

  usersCollection
    .findOneAndUpdate({_id: ObjectID('5a5cee659c2f170a84c35bbc')}, {
      $set: {
        name: 'Marchello'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    })
    .then(res => {
      console.log(res);
    })

  client.close();
});