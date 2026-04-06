import { reportLoadingStatesCollection } from "../../connections/index.js";

import getReportLoadingState from "./services/getReportLoadingState.js";
import prependToReportsQueue from "./services/prependToReportsQueue.js";
import getLoadingProgressStatus from "./services/getLoadingProgressStatus.js";
import deleteReportLoadingStates from "./services/deleteReportLoadingStates.js";
import setLastReportRequestTimestamp from "./services/setLastReportRequestTimestamp.js";

var reportLoadingStatesCollectionServices = {
  getReportLoadingState: (userId, session) => getReportLoadingState(reportLoadingStatesCollection, userId, session),
  getLoadingProgressStatus: (userId) => getLoadingProgressStatus(reportLoadingStatesCollection, userId),
  deleteReportLoadingStates: (userId, session) => deleteReportLoadingStates(reportLoadingStatesCollection, userId, session),
  prependToReportsQueue: (userId, dateFrom, dateTo) => prependToReportsQueue(reportLoadingStatesCollection, userId, dateFrom, dateTo),
  setLastReportRequestTimestamp: (userId, session) => setLastReportRequestTimestamp(reportLoadingStatesCollection, userId, session),
};

export default reportLoadingStatesCollectionServices;
