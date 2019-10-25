exports.getUsers = (req, res) => {
  res
    .status(200)
    .json({
      message: 'Get Users!'
    });
};

exports.getUserById = (req, res) => {
  res
    .status(200)
    .json({
      message: 'Get User By Id!'
    });
};

exports.getUserByEmail = (req, res) => {
  res
    .status(200)
    .json({
      message: 'Get User By Email!'
    });
};

exports.getUserByEmailAndPassword = async (req, res) => {
  const user = req.body;
  res
    .status(200)
    .json({
      message: 'Login Success!'
    });
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  res
    .status(201)
    .json({
      message: 'User created!'
    });
};

exports.updateUser = (req, res) => {
  res
    .status(200)
    .json({
      message: 'Update User!'
    });
};

exports.deleteUser = (req, res) => {
  res
    .status(204)
    .json({
      message: 'Delete User!'
    });
};
