const likeRouter = require('express').Router();

likeRouter.get('/', (_, res) => {
  res.status(200).json({
    message: 'GET likes'
  });
});

likeRouter.delete('/:id', (_, res) => {
  res.status(204).json({
    message: 'DELETE like'
  });
});

module.exports = likeRouter;
