import dbUtils from "../../../database/collections/index.js";
import shouldWaitBeforeNextRequest from "../services/different/shouldWaitBeforeNextRequest.js";
import sendReportPeriodsToReportLoader from "../services/different/sendReportPeriodsToReportLoader.js";

var reportLoadDelegate = async (req, res, next) => {
  var { uploadAllReports } = req.body;
  var { getReportLoadingState } = dbUtils.reportLoadingStatesCollectionServices;

  if (uploadAllReports) {
    try {
      var { status } = await sendReportPeriodsToReportLoader(req.body);
      return res.status(status).json({ msg: "Загрузка отчётов началась. Они будут отображаться по мере их добавления" });
    } catch {
      return res.status(503).json({ msg: "Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному" });
    }
  }

  var { isPeriodWithinSameWeek } = req.body;

  if (!isPeriodWithinSameWeek) {
    try {
      var { status } = await sendReportPeriodsToReportLoader(req.body);
      return res.status(status).json({ msg: "Загрузка отчётов началась. Они будут отображаться по мере их добавления" });
    } catch {
      return res.status(503).json({ msg: "Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному" });
    }
  }

  var { lastReportRequestTimestamp } = await getReportLoadingState(req.body.userId);

  var { nextRequestDelayMs } = shouldWaitBeforeNextRequest(lastReportRequestTimestamp);
  if (nextRequestDelayMs) {
    try {
      req.body.needsReportLoadingDelay = true;
      req.body.nextRequestDelayMs = nextRequestDelayMs;
      var { status } = await sendReportPeriodsToReportLoader(req.body);
      return res.status(status).json({ msg: "Отчет скоро будет добавлен." });
    } catch (e) {
      return res.status(500).json({ msg: "Произошла ошибка при добавлении отчета.\nПопробуйте повторить через минуту." });
    }
  }

  next();
};

export default reportLoadDelegate;
