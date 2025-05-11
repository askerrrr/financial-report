var createUser = async (req, res, next) => {
  var userData = req.body;

  console.log(userData);

  return res.status(200).json({ redirectUrl: "/" });
};

module.exports = createUser;
