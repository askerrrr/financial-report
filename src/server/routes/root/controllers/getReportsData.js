var getReportsData = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getUserById } = req.app.locals.userCollectionServices();
};

module.exports = getReportsData;
