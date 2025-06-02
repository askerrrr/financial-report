var updateToken = async (req, res, next) => {
  var { updateWBToken } = req.app.locals.tokenCollectionServices();

  var { userId, token } = req.body;

  var successUpdateToken = await updateWBToken(userId, token);

  return successUpdateToken ? res.sendStatus(200) : res.sendStatus(403);
};

module.exports = updateToken;
