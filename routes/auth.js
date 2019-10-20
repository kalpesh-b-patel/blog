const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const utils = require('../utils/utils');

authRouter.post('/register', (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  res.status(200).json({
    user: hash
  });
});

authRouter.post('/login', (req, res) => {
  const same = bcrypt.compareSync(req.body.password, '$2a$10$ofMlA82iITzsaShCckETJe0Rwv8QbbVEqquUl.rSgDHdk3u87Mkgu');
  if (same) {
    const token = utils.generateJwt(req.body);
    res.status(200).json({
      user: token
    });
  }
});

module.exports = authRouter;
