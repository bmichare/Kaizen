const path = require('path');
const express = require('express');

const skillsRouter = require('./routers/skillsRouter');
const groupsRouter = require('./routers/groupsRouter');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/skills', skillsRouter);
app.use('/groups', groupsRouter);

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server Listening on port: http://localhost:${PORT}`);
});

module.exports = app;
