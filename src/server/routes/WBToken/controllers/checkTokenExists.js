var checkTokenExists = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var token = await getWBTokenByUserId(userId);

  return token.length ? res.sendStatus(200) : res.sendStatus(404);
};

module.exports = checkTokenExists;
