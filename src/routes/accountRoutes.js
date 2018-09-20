const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:accountRoutes');

const accountRouter = express.Router();

function router() {
  accountRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'akava';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const response = await db.collection('users').find().toArray();
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  accountRouter.route('/account/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'akava';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const col = await db.collection('users');
          const user = await col.findOne({ _id: new ObjectID(id) });
          debug(user);
          res.json(user);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return accountRouter;
}


module.exports = router;
