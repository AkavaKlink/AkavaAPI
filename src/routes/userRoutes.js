const express = require('express');
const userController = require('../controllers/userController');

// const sequence = require('sequence-sdk');

const userRouter = express.Router();
// const ledger = new sequence.Client({
//  ledgerName: process.env.SEQUENCE_LEDGER_NAME,
//  credential: process.env.SEQUENCE_API_KEY,
// });


function router() {
  const {
    addLocalUser, addFacebookUser, addLinkedInUser, addGoogleUser, addGitHubUser,
  } = userController();
  userRouter.route('/')
    .post(addLocalUser);

  userRouter.route('/facebook')
    .post(addFacebookUser);


  userRouter.route('/linkedin')
    .post(addLinkedInUser);

  userRouter.route('/google')
    .post(addGoogleUser);

  userRouter.route('/github')
    .post(addGitHubUser);

  return userRouter;
}

module.exports = router;
