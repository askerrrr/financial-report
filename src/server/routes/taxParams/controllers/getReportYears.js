var getReportYears = async (req, res, next) => {
  var { getReportTree } = req.app.locals.reportsTreeCollectionServices;

  var userId = req.app.locals.userId;

  var reportsTree = await getReportTree(userId);

  var years = reportsTree.years.map((date) => date.year);

  return res.json({ years });
};

export default getReportYears;
