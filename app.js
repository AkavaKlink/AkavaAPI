const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
require('./databaseConnection')();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(morgan('tiny'));
app.use(express.json());
app.use((req, res, next) => {
  if (!req.get('ApiKey') || req.headers.apikey !== apiKey) {
    res.sendStatus(401);
    return;
  }
  next();
});

const userRouter = require('./src/routes/userRoutes')();

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello from my library app');
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
