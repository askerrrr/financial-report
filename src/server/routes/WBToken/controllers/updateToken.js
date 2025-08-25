var updateToken = async (req, res, next) => {
  var { userId, token } = req.body;
  var { updateWBToken, getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var currentToken = await getWBTokenByUserId(userId);

  if (currentToken === token) {
    return res.sendStatus(304);
  }

  var success = await updateWBToken(userId, token);

  return success ? res.sendStatus(200) : res.sendStatus(500);
};

module.exports = updateToken;
