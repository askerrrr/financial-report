var getUserOptions = async (req, res, next) => {
  var { getUserOptionsFromDb } = req.app.locals.optionsCollectionServices;

  var userId = req.app.locals.userId;

  var options = await getUserOptionsFromDb(userId);

  delete options._id;

  return res.json({ options });
};

module.exports = getUserOptions;
