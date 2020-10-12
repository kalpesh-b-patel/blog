require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signJwt = {
  payload: {},
  privateKey: process.env.PRIVATE_KEY,
  signOptions: {
    issuer: process.env.ISSUER,
    audience: process.env.AUDIENCE,
    expiresIn: process.env.EXPIRES_IN,
    algorithm: process.env.ALGORITHM
  }
};

exports.generateJwt = user => {
  signJwt.payload.id = user.id;
  signJwt.payload.isAdmin = user.isAdmin;
  return jwt.sign(signJwt.payload, signJwt.privateKey, signJwt.signOptions);
};

exports.decodeJwt = token => {
  return jwt.decode(token);
};

exports.generateHash = (plainPassword) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
};

exports.response = (data, error) => {
  return {
    data,
    error
  }
};

exports.generateUniqueId = () => {
  return Math.floor(Math.random() * 900000000 + 100000000);
};
