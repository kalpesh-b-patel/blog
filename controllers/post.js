const { response, generateUniqueId } = require('../utils/utils');
const {
  findAll,
  findOne,
  createOne } = require('../models/orm');

exports.getPosts = async (req, res) => {
  const startAt = req.query.startAt || 0;
  const limit = req.query.limit || 10;
  try {
    const posts = await findAll('posts', 'id', startAt, limit);
    res.status(200).json(response(posts, ''));
  } catch (err) {
    res.status(200).json(response(null, 'Something went wrong! Please try again.'));
  }
};

/* TODO: Next version
exports.getPostsByCategory = (req, res) => {
  res.status(200).json(response(null, ''));
};

exports.getPostsByReadCount = (req, res) => {
  res.status(200).json(response(null, ''));
};

exports.getPostsByLikeCount = (req, res) => {
  res.status(200).json(response(null, ''));
}; */

exports.getPostById = async (req, res) => {
  try {
    const post = await findOne(
      'posts',
      ['*'],
      ['id'],
      [req.params.id]
    );

    if (!post.length) {
      return res.status(404).json(response(null, 'Post does not exist!'));
    }

    res.status(404).json(response(post, ''));

  } catch (err) {
    res.status(200).json(response(null, 'Something went wrong! Please try again.'));
  }
};

exports.createPost = async (req, res) => {
  const post = req.body;
  post.id = generateUniqueId();
  post.createdAt = Math.floor(Date.now() / 1000);

  try {
    await createOne(
      'posts',
      [post]
    );
    res.status(201).json(response(post, ''));
  } catch (err) {
    res.status(201).json(response(null, err));
  }
};

exports.updatePost = (req, res) => {
  res.status(204).json({});
};

exports.deletePost = (req, res) => {
  res.status(204).json({});
};
