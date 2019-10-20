const postRouter = require('express').Router();

postRouter.get('/', (_, res) => {
  res.status(200).json({
    message: 'GET posts'
  });
});

postRouter.post('/', (_, res) => {
  res.status(201).json({
    message: 'POST posts'
  });
});

postRouter.put('/:id', (_, res) => {
  res.status(200).json({
    message: 'PUT post'
  });
});

postRouter.delete('/:id', (_, res) => {
  res.status(204).json({
    message: 'PUT post'
  });
});

module.exports = postRouter;
