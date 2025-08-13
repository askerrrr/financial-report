var getReport = async (req, res, next) => {
  var { id } = req.params;

  var { report } = req.app.locals?.reports.find((report) => report.id === id);

  if (!report) {
    return res.status(500).json("Произошла ошибка, попробуйте позже");
  }

  return res.json({ report });
};

module.exports = getReport;
