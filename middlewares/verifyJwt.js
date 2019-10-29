require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { response } = require('../utils/utils');

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};

exports.isAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const publicKey = process.env.PUBLIC_KEY;
      const user = jwt.verify(authToken, publicKey);

      const query = 'SELECT id FROM users WHERE id = ?';
      const found = await pool.query(query, [user.id]);

      if (found.length) {
        return next();
      } else {
        res.status(401).json(response(null, 'You are not authorised to make this request!'));
      }
    } catch(err) {
      res.status(401).json(response(null, 'You are not authorised to make this request!'));
    }
  });
};
