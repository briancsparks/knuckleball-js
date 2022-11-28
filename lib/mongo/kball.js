
const { MongoClient } = require('mongodb');

// Replace the following with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
// const uri = "mongodb://localhost:27017/?retryWrites=true&writeConcern=majority";
const uri = "mongodb://localhost/?retryWrites=true&writeConcern=majority";

(async function() {
  await main();
})().catch(console.dir);

async function main() {

  const client = new MongoClient(uri);

  try {
    const database = client.db("insertDB");
    const haiku = database.collection("haiku");
    // create a document to insert
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    const result = await haiku.insertOne(doc);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }

}
