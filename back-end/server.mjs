import express from 'express';
import cors from 'cors';
import { client, db, tasksCollection } from './database.mjs';
// import bodyParser from 'body-parser';

const app = express();
const port = 4000;

app.use(cors());

// bodyParser.json() for older Express versions
// app.use(bodyParser.json());

// express.json() for newer Express Versions
app.use(express.json());

app.get('/tasks', async (req, res) => {
  const tasksArray = await tasksCollection.find({ }).toArray();
  const tasks = tasksArray.map(item => item.task) 
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = req.body.inputVal;
  const insertTask = await tasksCollection.insertOne({ task })

  const tasksArray = await tasksCollection.find({ }).toArray();
  const tasks = tasksArray.map(item => item.task) 
  res.status(201).json(tasks);
});

app.delete('/tasks/:task', async (req, res) => {
  const { task } = req.params;

  try {
    const deleteTask = await tasksCollection.deleteOne({ task });

    if (deleteTask.deletedCount === 0) {
      return res.status(404).json({ error: 'Task not found'});
    }

    const tasksArray = await tasksCollection.find({ }).toArray();
    const tasks = tasksArray.map(item => item.task) 
    res.json(tasks);  
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  
    console.log('Server is running on port: ', port);
  
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
});

