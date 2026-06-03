import reportLoadingStateCollectionServices from "../../../database/collections/reportLoadingStates/index.js";
import sendResumeAbandonedReportsLoadingRequest from "../services/different/sendResumeAbandonedReportsLoadingRequest.js";

var resumeAbandonedReportsLoading = async (req, res) => {
  var { userId, abandonedReportPeriods } = req.body;

  await reportLoadingStateCollectionServices.pushToReportsQueue(userId, abandonedReportPeriods);

  var success = await sendResumeAbandonedReportsLoadingRequest(req.body);

  return res.sendStatus(200);
};

export default resumeAbandonedReportsLoading;
