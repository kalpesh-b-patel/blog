require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = path.join(__dirname, '..', 'jwtRS256.key');
const publicKey = path.join(__dirname, '..', 'jwtRS256.key.pub');

const signJwt = {
  payload: {
    id: ''
  },
  privateKey: fs.readFileSync(privateKey, 'utf8'),
  signOptions: {
    issuer: process.env.ISSUER,
    audience: process.env.AUDIENCE,
    expiresIn: process.env.EXPIRES_IN,
    algorithm: process.env.ALGORITHM
  }
};

exports.generateJwt = user => {
  signJwt.payload.id = user.id;
  return jwt.sign(signJwt.payload, signJwt.privateKey, signJwt.signOptions);
};

/* TODO: just for testing. Remove once done */
exports.verifyJwt = token => {
  return jwt.verify(
    token,
    fs.readFileSync(publicKey, 'utf8'),
    { algorithms: ['RS256'] });
};

exports.generateHash = (plainPassword) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
};
