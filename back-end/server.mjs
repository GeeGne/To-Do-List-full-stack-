import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

let tasks = ['Clean The Kitchen', 'Take a Shower', 'Charge the Phone'];
// let tasks = ['Clean The Kitchen', 'Take a Shower'];

// get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// add new task
app.post('/tasks', (req, res) => {
  const task = req.body.inputVal;
  tasks = [ task, ...tasks ];
  res.json(tasks);
});

// delete a task
app.delete('/tasks/:index', (req, res) => {
  const index = req.params.index;
  tasks = tasks.filter((_, i) => i.toString() !== index);
  res.json(tasks);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log('Server is running on port: ', port);
});