import reportLoadingStatesCollectionServices from "../../../database/collections/reportLoadingStates/index.js";
import sendResumeLoadingRequest from "../services/sendResumeLoadingRequest.js";

var checkForStoppedReportLoading = async (req, res, next) => {
  var { userId } = req.body;

  var userReportLoadingState = await reportLoadingStatesCollectionServices.getReportLoadingState(userId);

  if (userReportLoadingState.isReportLoadingisStopped) {
    await sendResumeLoadingRequest(userId);
  }
};

export default checkForStoppedReportLoading;
