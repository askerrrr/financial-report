import dbUtils from '../../../database/collections/index.js'

var getReportYears = async (req, res, next) => {
  var { getReportTree } = dbUtils.reportsTreeCollectionServices;

  var userId = req.app.locals.userId;

  var reportsTree = await getReportTree(userId);

  var years = reportsTree.years.map((date) => date.year);

  return res.json({ years });
};

export default getReportYears;
