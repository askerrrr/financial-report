import reportLoadingStatesCollectionServices from "../../../database/collections/reportLoadingStates/index.js";

var session = null;

var selectedFieldsToLoadingState = [
  "queueLength",
  "reportsQueue",
  "queueCapacity",
  "abandonedReports",
  "loadingInProgress",
  "loadingStopReason",
  "isReportLoadingDelayed",
  "isReportLoadingIsStopped",
];

var getReportLoadingState = async (req, res, next) => {
  var { userId } = req.params;
  var reportLoadingState = await reportLoadingStatesCollectionServices.getReportLoadingState(userId, session, selectedFieldsToLoadingState);

  return res.json(reportLoadingState);
};

export default getReportLoadingState;
