var JWT = require("jsonwebtoken");

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

  var payload = { login: userData.login, role: "user" };

  var token = JWT.sign(payload, "secretkey", { expiresIn: "2h" });

  return res
    .cookie("token", token, { httpOny: true, maxAge: 2000 * 60 * 60 })
    .json({ redirectUrl: "/" });
};

module.exports = createUser;
