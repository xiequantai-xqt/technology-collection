const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'mytest';

async function clientFun(c){
  await client.connect();
  const db = client.db(dbName);
  return db.collection(c);
}
async function main() {
  var cc = await clientFun('cc')
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());