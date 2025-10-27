var saveWBToken = async (req, res, next) => {
  var { token } = req.body;
  var userId = req.app.locals.userId;
  var { saveWBTokenToDb, getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var currentToken = await getWBTokenByUserId(userId);

  if (currentToken === token) {
    return res.sendStatus(304);
  }

  var success = await saveWBTokenToDb(userId, token);

  return success ? res.sendStatus(200) : res.sendStatus(500);
};

module.exports = saveWBToken;
