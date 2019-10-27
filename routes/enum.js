const router = require('express').Router();
const { addEnum } = require('../controllers/enum');

router.route('/')
  .post(addEnum);

module.exports = router;
