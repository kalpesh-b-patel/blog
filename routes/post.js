const postRouter = require('express').Router();
const { isAuthenticated } = require('../middlewares/verifyJwt');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/post');

postRouter.route('/')
  .get(isAuthenticated, getPosts)
  .post(isAuthenticated, createPost);

postRouter.route('/:id')
  .get(isAuthenticated, getPostById)
  .put(isAuthenticated, updatePost)
  .delete(isAuthenticated, deletePost);

module.exports = postRouter;
