var checkReportsLoadingProgress = async (req, res, next) => {
  var { userId, dateFrom, dateTo } = req.body;
  var { getLoadingProgressStatus, prependToReportsQueue } = req.app.locals.reportLoadingStatesCollectionServices;

  var { loadingInProgress } = await getLoadingProgressStatus(userId);

  if (loadingInProgress) {
    await prependToReportsQueue(userId, dateFrom, dateTo);
    return res.status(202).json({ msg: "Отчет скоро будет добавлен." });
  }

  next();
};

module.exports = checkReportsLoadingProgress;
