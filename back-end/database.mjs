import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://geegne:qweqweqwe1@cluster0.tua8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const db = client.db('tasks');
const tasksCollection = db.collection('tasks')


export { client, db, tasksCollection};