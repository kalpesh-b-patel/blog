const commentRouter = require('express').Router();
const utils = require('../utils/utils');
require('../config/passport');
const passport = require('passport');

commentRouter.get('/',
  passport.authenticate('jwt', { session: false }, null),
  (req, res) => {
  // const token = req.headers.authorization.split(' ')[1];
  // console.log(utils.verifyJwt(token));
  res.status(200).json({
    message: 'GET comments'
  });
});

commentRouter.post('/', (_, res) => {
  res.status(201).json({
    message: 'POST comment'
  });
});

commentRouter.put('/:id', (_, res) => {
  res.status(200).json({
    message: 'PUT comment'
  });
});

commentRouter.delete('/:id', (_, res) => {
  res.status(204).json({
    message: 'DELETE comment'
  });
});

module.exports = commentRouter;
