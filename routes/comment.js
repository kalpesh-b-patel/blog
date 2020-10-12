const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/verifyJwt');
const {
  getComments,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comment');

router.route('/')
  .get(isAuthenticated, getComments)
  .post(isAuthenticated, createComment);

router.route('/:id')
  .put(isAuthenticated, updateComment)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
