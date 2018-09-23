const mongoose = require('mongoose');
const debug = require('debug')('app:databaseConnection');
const chalk = require('chalk');

function databaseConnection() {
  const databaseName = 'akava';
  const { connection } = mongoose;

  mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true });

  connection.on('connected', () => {
    debug(`connected to the ${chalk.bold.cyan(databaseName)} database`);
  });

  connection.on('disconnected', () => {
    debug(`disconnected to the ${chalk.bold.red(databaseName)} database`);
  });

  connection.on('error', (error) => {
    debug(`db connection error ${chalk.bold.yellow(error)}`);
  });

  process.on('SIGINT',
    () => {
      connection.close(() => {
        debug(chalk.bold.magenta('db connection closed due to process termination'));
        process.exit(0);
      });
    });
}

module.exports = databaseConnection;
