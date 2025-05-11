var createUser = async (req, res, next) => {
  var { createUser, checkUserExists } = req.app.locals.userCollectionServices();

  var userData = req.body;

  var userIsExists = await checkUserExists(userData.login);

  if (userIsExists) {
    return res.sendStatus(409);
  }

  var successCreate = await createUser(userData);

  if (!successCreate) {
  }

  return res.status(200).json({ redirectUrl: "/" });
};

module.exports = createUser;
