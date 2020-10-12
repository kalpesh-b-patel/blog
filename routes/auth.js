const router = require('express').Router();
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })
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

router.post('/file', upload.array('file'), (req, res) => {
  const files = req.files;
  const test = req.body.test;
  console.log(files);
  console.log(test);
  res.status(200).json({});
});

module.exports = router;
