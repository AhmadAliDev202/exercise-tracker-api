const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
app.use(express.static('public'));

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const users = [];

// POST /api/users
app.post('/api/users', (req, res) => {
  const username = req.body.username;
  const _id = uuidv4();

  const newUser = { username, _id, log: [] };
  users.push(newUser);

  res.json({ username, _id });
});

// GET /api/users
app.get('/api/users', (req, res) => {
  res.json(users.map(({ _id, username }) => ({ _id, username })));
});

// POST /api/users/:_id/exercises
app.post('/api/users/:_id/exercises', (req, res) => {
  const user = users.find(u => u._id === req.params._id);
  if (!user) return res.status(400).json({ error: 'User not found' });

  const { description, duration, date } = req.body;

  const exercise = {
    description,
    duration: parseInt(duration),
    date: date ? new Date(date).toDateString() : new Date().toDateString()
  };

  user.log.push(exercise);

  res.json({
    _id: user._id,
    username: user.username,
    ...exercise
  });
});

// GET /api/users/:_id/logs
app.get('/api/users/:_id/logs', (req, res) => {
  const user = users.find(u => u._id === req.params._id);
  if (!user) return res.status(400).json({ error: 'User not found' });

  let { from, to, limit } = req.query;
  let logs = [...user.log];

  if (from) {
    const fromDate = new Date(from);
    logs = logs.filter(entry => new Date(entry.date) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);
    logs = logs.filter(entry => new Date(entry.date) <= toDate);
  }

  if (limit) {
    logs = logs.slice(0, +limit);
  }

  res.json({
    username: user.username,
    _id: user._id,
    count: logs.length,
    log: logs
  });
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on http://localhost:' + listener.address().port);
});