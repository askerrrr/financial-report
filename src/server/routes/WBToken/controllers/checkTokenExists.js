var checkTokenExists = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var token = await getWBTokenByUserId(userId);

  return token.length
    ? res.status(200).json({ tokenIsExists: true })
    : res.status(404).json({ tokenIsExists: false });
};

module.exports = checkTokenExists;
