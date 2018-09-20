const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const mogran = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(mogran('tiny'));

const accountRouter = require('./src/routes/accountRoutes')();

app.use('/api/accounts', accountRouter);

app.get('/', (req, res) => {
  res.send('Hello from my library app');
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
