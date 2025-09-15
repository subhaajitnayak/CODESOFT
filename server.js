const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/task-3(Calculator)', express.static(path.join(__dirname, 'task-3(Calculator)')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'task-3(Calculator)', 'calculator.html'));
});

app.get('/calculator.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'task-3(Calculator)', 'calculator.js'));
});

app.get('/calculator.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'task-3(Calculator)', 'calculator.css'));
});

app.listen(port, () => {
  console.log(`Calculator app listening at http://localhost:${port}`);
});
