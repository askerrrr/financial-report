import { reportsTreeCollection } from "../../connections/index.js";

import getReportTree from "./services/getReportTree.js";
import updateReportTree from "./services/updateReportTree.js";
import deleteReportTreeByUserId from "./services/deleteReportTreeByUserId.js";
import deleteReportFromReportTree from "./services/deleteReportFromReportTree.js";

var reportsTreeCollectionServices = {
  updateReportTree: (userId, years) => updateReportTree(reportsTreeCollection, userId, years),

  getReportTree: (userId, session) => getReportTree(reportsTreeCollection, userId, session),

  deleteReportFromReportTree: (userId, year, month, reportId, session) =>
    deleteReportFromReportTree(reportsTreeCollection, userId, year, month, reportId, session),

  deleteReportTreeByUserId: (userId) => deleteReportTreeByUserId(reportsTreeCollection, userId),
};

export default reportsTreeCollectionServices;
