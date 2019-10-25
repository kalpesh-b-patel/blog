require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signJwt = {
  payload: {
    id: ''
  },
  privateKey: process.env.PRIVATE_KEY, //fs.readFileSync(privateKey, 'utf8'),
  signOptions: {
    issuer: process.env.ISSUER,
    audience: process.env.AUDIENCE,
    expiresIn: process.env.EXPIRES_IN,
    algorithm: process.env.ALGORITHM
  }
};

exports.generateJwt = user => {
  /* TODO: generate token using id and role as a payload */
  signJwt.payload.id = 1;
  return jwt.sign(signJwt.payload, signJwt.privateKey, signJwt.signOptions);
};

exports.decodeJwt = token => {
  return jwt.decode(token);
};

exports.generateHash = (plainPassword) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
};
