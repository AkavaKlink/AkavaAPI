/* eslint no-underscore-dangle: 0 */
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app:accountRoutes');
const Joi = require('joi');
const uuidv4 = require('uuid/v4');
const chalk = require('chalk');
const User = require('../models/userModel');

const userRouter = express.Router();

function router() {
  // userRouter.route('/')
  //  .get((req, res) => {
  //    const url = 'mongodb://localhost:27017';
  //    const dbName = 'akava';

  //    (async function mongo() {
  //      let client;
  //      try {
  //        client = await MongoClient.connect(url);
  //        debug('Connected correctly to server');
  //        const db = client.db(dbName);
  //        const response = await db.collection('users').find().toArray();
  //        res.json(response);
  //      } catch (err) {
  //        debug(err.stack);
  //        res.status(500).send({ message: 'An error occurred processing the request' });
  //      }
  //      client.close();
  //    }());
  //  });

  // userRouter.route('/:id')
  //  .get((req, res) => {
  //    const { id } = req.params;
  //    const url = 'mongodb://localhost:27017';
  //    const dbName = 'akava';

  //    (async function mongo() {
  //      let client;
  //      try {
  //        client = await MongoClient.connect(url);
  //        debug('Connected correctly to server');
  //        const db = client.db(dbName);
  //        const col = await db.collection('users');
  //        const user = await col.findOne({ _id: new ObjectID(id) });
  //        debug(user);
  //        res.json(user);
  //      } catch (err) {
  //        debug(err.stack);
  //        res.status(500).send({ message: 'An error occurred processing the request' });
  //      }
  //      client.close();
  //    }());
  //  });

  userRouter.route('/register')
    .post((req, res) => {
      const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).required(),
      };

      const validationResult = Joi.validate(req.body, schema);

      if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
        return;
      }

      const user = new User();
      user._id = new mongoose.Types.ObjectId();
      user.local.ledgerId = uuidv4();
      user.local.email = req.body.email;
      user.local.password = user.generateHash(req.body.password);

      User.findOne({ 'local.email': 'test@aol.com' },
        (err, dbUser) => {
          if (err) {
            debug(chalk.bold.red(err));
            res.status(500).send(err);
            return;
          }
          if (dbUser) {
            res.status(400).send({ message: `User with email ${dbUser.local.email} already exists.` });
            return;
          }
          user.save().then((result) => {
            debug(`save successful${result}`);
            res.status(201).json(user);
          }).catch((err2) => {
            debug(chalk.bold.red(err2));
            res.status(500).send({ message: 'An error occurred processing the request' });
          });
        });
    });
  return userRouter;
}

module.exports = router;
