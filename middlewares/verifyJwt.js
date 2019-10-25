require('dotenv').config();
const jwt = require('jsonwebtoken');

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
      console.log(user);
      return next();
    } catch(err) {
      res.status(401).json({
        data: [],
        error: 'You are not authorised to make this request!',
        vErrors: []
      });
    }
  });
};
