var updateToken = async (req, res, next) => {
  var { updateWBToken } = req.app.locals.tokenCollectionServices();

  var { userId, token } = req.body;

  await updateWBToken(userId, token);
};

module.exports = updateToken;
