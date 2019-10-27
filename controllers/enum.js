const orm = require('../models/orm');
const { response } = require('../utils/utils');

exports.addEnum = async (req, res) => {
  const newEnum = req.body;
  try {
    await orm.createOne('enums', [newEnum]);
    res.status(400).json(response('Success!', ''));
  } catch (err) {
    console.log(err);
    res.status(400).json(response(null, 'Failed!'));
  }
};
