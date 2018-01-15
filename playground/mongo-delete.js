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
  
  // Delete Many
  // todoCollection
  //   .deleteMany({text: "Eat a burger"})
  //   .then(result => {
  //     console.log(`Great delete success: ${result}`);
  //   });

  // Delete One
  // todoCollection
  //   .deleteOne({text: "Another thing to do"})
  //   .then(result => {
  //     if(result.deletedCount == 0) {
  //       return console.log('No files deleted.');
  //     } else
  //     console.log(`Great delete success: ${result}`);
  //   });
  
  // Find One and Delete
  // todoCollection
  //   .findOneAndDelete({text: "Something to do"})
  //   .then(result => {
  //     if(result.lastErrorObject.n === 0) {
  //       return console.log('No files deleted.');
  //     }
  //     console.log(`Item Deleted:\n${JSON.stringify(result.value, undefined, 2)}`);
  //   });

  client.close();
});