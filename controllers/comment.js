exports.getComments = (req, res) => {
  res
    .status(200)
    .json({
      message: 'comments'
    });
};

exports.createComment = (req, res) => {
  res
    .status(201)
    .json({
      message: 'comment created!'
    });
};

exports.updateComment = (req, res) => {
  res
    .status(200)
    .json({
      message: 'comment updated!'
    });
};

exports.deleteComment = (req, res) => {
  res
    .status(204)
    .json({
      message: 'comment deleted!'
    });
};
