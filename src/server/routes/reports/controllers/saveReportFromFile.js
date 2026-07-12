import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import reportsProcessing from "../services/different/reportsProcessing.js";
import extractWorkSheetFromFile from "../services/weeklyFinancialReportFileParser/extractWorkSheetFromFile.js";
import extractWeeklyFinancialReportDataFromFile from "../services/weeklyFinancialReportFileParser/extractWeeklyFinancialReportDataFromFile.js";
import extractWeeklyFinancialReportFilesFromZip from "../services/weeklyFinancialReportFileParser/extractWeeklyFinancialReportFilesFromZip.js";

var { getReportTree } = dbUtils.reportsTreeCollectionServices;

var isReportFromFile = true;

var saveReportFromFile = async (req, res, next) => {
  var { userId } = req.body;
  var zipBuffers = req.files.map((file) => file.buffer);

  var { weeklyFinancialFilesBuffer } = await extractWeeklyFinancialReportFilesFromZip(zipBuffers);
  var { weeklyFinancialFilesBuffer } = await extractWorkSheetFromFile(weeklyFinancialFilesBuffer);

  // for (var fileData of weeklyFinancialFilesBuffer) {
  //   var session = await dbClient.startSession();

  //   await session.withTransaction(async () => {
  //     var { reportTree } = await getReportTree(userId, session);

  //     var { reportData, reportIsNotEmpty } = await extractWeeklyFinancialReportDataFromFile(userId, fileData, reportTree);

  //     if (reportIsNotEmpty) {
  //       var { dateFrom, dateTo } = reportData;
  //       // await reportsProcessing(userId, dateFrom, dateTo, session, reportData.data, isReportFromFile);
  //     }
  //   });
  // }
};

export default saveReportFromFile;
