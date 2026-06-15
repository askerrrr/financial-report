import { reportLoadingStatesCollection } from "../../connections/index.js";

import pushToReportsQueue from "./services/pushToReportsQueue.js";
import getReportLoadingState from "./services/getReportLoadingState.js";
import resetAbandonedReports from "./services/resetAbandonedReports.js";
import prependToReportsQueue from "./services/prependToReportsQueue.js";
import getLoadingProgressStatus from "./services/getLoadingProgressStatus.js";
import deleteReportLoadingStates from "./services/deleteReportLoadingStates.js";
import setLastReportRequestTimestamp from "./services/setLastReportRequestTimestamp.js";
import updateReportLoadingStoppedStatus from "./services/updateReportLoadingStoppedStatus.js";

var reportLoadingStatesCollectionServices = {
  getReportLoadingState: (userId, session, selectedFields) => getReportLoadingState(reportLoadingStatesCollection, userId, session, selectedFields),
  getLoadingProgressStatus: (userId) => getLoadingProgressStatus(reportLoadingStatesCollection, userId),
  deleteReportLoadingStates: (userId, session) => deleteReportLoadingStates(reportLoadingStatesCollection, userId, session),
  prependToReportsQueue: (userId, dateFrom, dateTo) => prependToReportsQueue(reportLoadingStatesCollection, userId, dateFrom, dateTo),
  setLastReportRequestTimestamp: (userId, session) => setLastReportRequestTimestamp(reportLoadingStatesCollection, userId, session),

  pushToReportsQueue: (userId, periods, session, needToResetAbandonedReports) => pushToReportsQueue(reportLoadingStatesCollection, userId, periods, session, needToResetAbandonedReports),

  updateReportLoadingStoppedStatus: (userId, newStatus, session) =>
    updateReportLoadingStoppedStatus(reportLoadingStatesCollection, userId, newStatus, session),

  resetAbandonedReports: (userId) => resetAbandonedReports(reportLoadingStatesCollection, userId),
};

export default reportLoadingStatesCollectionServices;
