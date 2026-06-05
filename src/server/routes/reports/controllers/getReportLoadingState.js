import reportLoadingStatesCollectionServices from "../../../database/collections/reportLoadingStates/index.js";

var getReportLoadingState = async (req, res, next) => {
  var { userId } = req.params;
  var { reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed, lastLoadedReport } =
    await reportLoadingStatesCollectionServices.getReportLoadingState(userId);

  return res.json({ reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed, lastLoadedReport });
};

export default getReportLoadingState;
