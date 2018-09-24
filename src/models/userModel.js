const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  local: {
    ledgerId: String,
    email: String,
    password: String,
  },
  facebook: {
    legerId: String,
    id: String,
    email: String,
  },
  linkedIn: {
    legerId: String,
    id: String,
    email: String,
  },
  google: {
    legerId: String,
    id: String,
    email: String,
  },
  github: {
    legerId: String,
    id: String,
    email: String,
  },
});

userSchema.methods.generateHash = function generateHash(password) {
  return bcryptjs.hashSync(password, bcryptjs.genSaltSync(9));
};

userSchema.methods.isPasswordValid = function isPasswordValid(password) {
  return bcryptjs.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
