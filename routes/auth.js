const router = require('express').Router();
const {
  createUser,
  getUserByEmailAndPassword,
  verifyEmail } = require('../controllers/user');

router.route('/registration')
  .post(createUser);

router.route('/login')
  .post(getUserByEmailAndPassword);

router.route('/verify')
  .get(verifyEmail);

module.exports = router;
