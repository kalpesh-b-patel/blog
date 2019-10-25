const router = require('express').Router();
const {
  createUser,
  getUserByEmailAndPassword } = require('../controllers/user');

router.route('/registration')
  .post(createUser);

router.route('/login')
  .post(getUserByEmailAndPassword);

module.exports = router;
