var getReportYears = async (req, res, next) => {
  var { getReportsTree } = req.app.locals.reportsTreeCollectionServices;

  var userId = req.app.locals.userId;

  var reportsTree = await getReportsTree(userId);

  var years = reportsTree.years.map((date) => date.year);

  return res.json({ years });
};

module.exports = getReportYears;
