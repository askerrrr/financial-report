import reportLoadingStatesCollectionServices from "../../../database/collections/reportLoadingStates/index.js";

var getReportLoadingState = async (req, res, next) => {
  var { userId } = req.params;
  var { reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed } =
    await reportLoadingStatesCollectionServices.getReportLoadingState(userId);

  return res.json({ reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed });
};

export default getReportLoadingState;
