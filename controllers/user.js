const bcrypt = require('bcryptjs');
const {
  response,
  generateUniqueId,
  generateHash,
  generateJwt } = require('../utils/utils');
const { mailer } = require('../config/nodemailer');
const orm = require('../models/orm');

exports.getUsers = (req, res) => {
  res
    .status(200)
    .json({
      message: 'Get Users!'
    });
};

exports.getUserById = (req, res) => {
  res
    .status(200)
    .json({
      message: 'Get User By Id!'
    });
};

exports.getUserByEmail = (req, res) => {
  res
    .status(200)
    .json({
      message: 'Get User By Email!'
    });
};

exports.getUserByEmailAndPassword = async (req, res) => {
  const user = req.body;

  const exists = await orm.findOne(
    'users',
    ['*'],
    ['email'],
    [user.email]
  );

  if (!exists.length) {
    return res.status(400).json(response(null, 'Invalid credentials!'));
  }

  const matched = bcrypt.compareSync(user.password, exists[0].password);

  if (!matched) {
    return res.status(400).json(response(null, 'Invalid credentials!'));
  }

  const token = generateJwt({
    id: exists[0].id,
    isAdmin: exists[0].isAdmin
  });

  res.status(200).json(response(
    {
      token,
      email: exists[0].email,
      displayName: exists[0].firstname + ' ' + exists[0].lastname
    }, '')
  );
};

exports.createUser = async (req, res) => {
  const newUser = req.body;
  try {
    const exists = await orm.findOne('users', ['email'], ['email'], [newUser.email]);

    if (exists.length) {
      return res.status(400).json(response(null, 'This email is already registered with us!'));
    }

    newUser.id = generateUniqueId();
    newUser.password = generateHash(newUser.password);
    newUser.createdAt = Math.floor(Date.now() / 1000);

    await orm.createOne('users', [newUser]);

    const token = generateJwt({
      id: newUser.id,
      isAdmin: false
    });

    mailer(newUser.email, newUser.id).then(() => {});

    res.status(201).json(response({
      token,
      email: newUser.email,
      displayName: newUser.firstname + ' ' + newUser.lastname
    }, ''));

  } catch(err) {
    res.status(400).json(response(null, err));
  }
};

exports.updateUser = (req, res) => {
  res
    .status(200)
    .json({
      message: 'Update User!'
    });
};

exports.deleteUser = (req, res) => {
  res
    .status(204)
    .json({
      message: 'Delete User!'
    });
};

exports.verifyEmail = async (req, res) => {
  const id = req.query.id;
  const email = req.query.email;
  const currentTime = Math.floor(Date.now() / 1000);

  try {
    const user = await orm.findOne(
      'users',
      ['createdAt', 'verified'],
      ['id', 'email'],
      [id, email]);

    if (user[0].verified) {
      return res.status(200).json(response(null, 'This account has already been verified!'));
    }

    const diff = currentTime - user[0].createdAt;
    if (diff > 86400) {
      res.status(200).json(response(null, 'Verification link has been expired!'));
    }

    await orm.updateOne(
      'users',
      'verified',
      ['id', 'email'],
      [true, id, email]
    );

    res.status(200).json(response(`You've successfully verified the email!`, ''));
  } catch(err) {
    res.status(200).json(response(null, 'Invalid verification link! Please contact support team!'));
  }
};
