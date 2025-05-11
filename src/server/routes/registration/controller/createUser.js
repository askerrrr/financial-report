var createUser = async (req, res, next) => {
  var { createUser, getUser } = req.app.locals.userCollectionServices();

  var userData = req.body;

  var user = await getUser(userData.login);

  if (user) {
    return res.sendStatus(409);
  }

  var successCreate = await createUser(userData);

  if (!successCreate) {
  }

  return res.status(200).json({ redirectUrl: "/" });
};

module.exports = createUser;
