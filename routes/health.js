const healthRouter = require('express').Router();

healthRouter.get('/', (_, res) => {
  res.status(200).json({
    health: 'Up'
  });
});

module.exports = healthRouter;
