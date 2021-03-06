/* eslint no-underscore-dangle: 0 */
const mongoose = require('mongoose');
const debug = require('debug')('app:userController');
const Joi = require('joi');
const uuidv4 = require('uuid/v4');
const chalk = require('chalk');
const User = require('../models/userModel');

function userController() {
  const addLocalUser = async (req, res) => {
    try {
      const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).required(),
      };

      const validationResult = Joi.validate(req.body, schema);

      if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
      }

      const user = new User();
      user._id = new mongoose.Types.ObjectId();
      user.local.ledgerId = uuidv4();
      user.local.email = req.body.email;
      user.local.password = user.generateHash(req.body.password);

      const dbUser = await User.findOne({ 'local.email': user.local.email });
      if (dbUser) {
        return res.status(400).send({ message: `User with email ${dbUser.local.email} already exists.` });
      }

      const saveResult = await user.save();
      return res.status(201).json(saveResult);
    } catch (err) {
      debug(chalk.bold.red(err));
      return res.status(500).send(err);
    }
  };

  const addFacebookUser = async (req, res) => {
    try {
      const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        id: Joi.string().required(),
      };

      const validationResult = Joi.validate(req.body, schema);

      if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
      }

      const user = new User();
      user._id = new mongoose.Types.ObjectId();
      user.facebook.id = req.body.id;
      user.facebook.ledgerId = uuidv4();
      user.facebook.email = req.body.email;

      const dbUser = await User.findOne({ 'facebook.id': user.facebook.id });
      if (dbUser) {
        return res.status(400).send({ message: `Facebook user with id ${dbUser.facebook.id} already exists.` });
      }

      const saveResult = await user.save();
      return res.status(201).json(saveResult);
    } catch (err) {
      debug(chalk.bold.red(err));
      return res.status(500).send(err);
    }
  };

  const addLinkedInUser = async (req, res) => {
    try {
      const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        id: Joi.string().required(),
      };

      const validationResult = Joi.validate(req.body, schema);

      if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
      }

      const user = new User();
      user._id = new mongoose.Types.ObjectId();
      user.linkedIn.id = req.body.id;
      user.linkedIn.ledgerId = uuidv4();
      user.linkedIn.email = req.body.email;

      const dbUser = await User.findOne({ 'linkedIn.id': user.linkedIn.id });
      if (dbUser) {
        return res.status(400).send({ message: `LinkedIn User with id ${dbUser.linkedIn.id} already exists.` });
      }

      const saveResult = await user.save();
      return res.status(201).json(saveResult);
    } catch (err) {
      debug(chalk.bold.red(err));
      return res.status(500).send(err);
    }
  };

  const addGoogleUser = async (req, res) => {
    try {
      const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        id: Joi.string().required(),
      };

      const validationResult = Joi.validate(req.body, schema);

      if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
      }

      const user = new User();
      user._id = new mongoose.Types.ObjectId();
      user.google.id = req.body.id;
      user.google.ledgerId = uuidv4();
      user.google.email = req.body.email;

      const dbUser = await User.findOne({ 'google.id': user.google.id });
      if (dbUser) {
        return res.status(400).send({ message: `Google user with id ${dbUser.google.id} already exists.` });
      }

      const saveResult = await user.save();
      return res.status(201).json(saveResult);
    } catch (err) {
      debug(chalk.bold.red(err));
      return res.status(500).send(err);
    }
  };

  const addGitHubUser = async (req, res) => {
    try {
      const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        id: Joi.string().required(),
      };

      const validationResult = Joi.validate(req.body, schema);

      if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
      }

      const user = new User();
      user._id = new mongoose.Types.ObjectId();
      user.github.id = req.body.id;
      user.github.ledgerId = uuidv4();
      user.github.email = req.body.email;


      const dbUser = await User.findOne({ 'github.id': user.github.id });
      if (dbUser) {
        return res.status(400).send({ message: `Github user with id ${dbUser.github.id} already exists.` });
      }

      const saveResult = await user.save();
      return res.status(201).json(saveResult);
    } catch (err) {
      debug(chalk.bold.red(err));
      return res.status(500).send(err);
    }
  };
  return {
    addLocalUser,
    addFacebookUser,
    addLinkedInUser,
    addGoogleUser,
    addGitHubUser,
  };
}

module.exports = userController;
