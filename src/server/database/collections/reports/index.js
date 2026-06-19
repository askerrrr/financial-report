import { reportCollection } from "../../connections/index.js";

import getReportById from "./services/getReportById.js";
import saveReportToDb from "./services/saveReportToDb.js";
import saveUpdatedReport from "./services/saveUpdatedReport.js";
import saveUpdatedReports from "./services/saveUpdatedReports.js";
import deleteReportFromDb from "./services/deleteReportFromDb.js";
import getReportsByUserId from "./services/getReportsByUserId.js";
import addReportToAccounted from "./services/addReportToAccounted.js";
import checkReportExistsToDb from "./services/checkReportExistsToDb.js";
import getAllDataFromReportCollection from "./services/getAllDataFromReportCollection.js";

var reportCollectionServices = {
  addReportToAccounted: (userId, reportId, status) => addReportToAccounted(reportCollection, userId, reportId, status),

  getAllDataFromReportCollection: () => getAllDataFromReportCollection(reportCollection),
  getReportById: (userId, reportId, session) => getReportById(reportCollection, userId, reportId, session),
  getReportsByUserId: (userId, session, projectQuery, reportIds) => getReportsByUserId(reportCollection, userId, session, projectQuery, reportIds),

  saveReportToDb: (userId, report, session) => saveReportToDb(reportCollection, userId, report, session),
  saveUpdatedReports: (userId, reports) => saveUpdatedReports(reportCollection, userId, reports),

  saveUpdatedReport: (userId, reportId, report, session) => saveUpdatedReport(reportCollection, userId, reportId, report, session),

  checkReportExistsToDb: (userId, dateFrom, dateTo) => checkReportExistsToDb(reportCollection, userId, dateFrom, dateTo),

  deleteReportFromDb: (userId, reportId, session) => deleteReportFromDb(reportCollection, userId, reportId, session),
};

export default reportCollectionServices;
