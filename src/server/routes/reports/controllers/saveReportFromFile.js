import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import reportsProcessing from "../services/different/reportsProcessing.js";
import checkReportExistsInTree from "../services/different/checkReportExistsInTree.js";
import removeDublicateFiles from "../services/reportsFileParser/removeDublicateFiles.js";
import extractWorkSheetFromFile from "../services/reportsFileParser/extractWorkSheetFromFile.js";
import extractReportsFileBufferFromZip from "../services/reportsFileParser/extractReportsFileBufferFromZip.js";
import extractReportDataFromWorkSheets from "../services/reportsFileParser/extractReportDataFromWorkSheets.js";

var { getReportTree } = dbUtils.reportsTreeCollectionServices;

var isReportFromFile = true;

var saveReportFromFile = async (req, res, next) => {
  var { userId } = req.body;
  
  var { deduplicatedFiles } = removeDublicateFiles(req.files);

  var { weeklyFinancialReportsBuffer, paidStorageReportsBuffer } = await extractReportsFileBufferFromZip(deduplicatedFiles);
  var { workSheets } = await extractWorkSheetFromFile(weeklyFinancialReportsBuffer, paidStorageReportsBuffer);

  var reportsData = [];

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { reportTree } = await getReportTree(userId, session);

      for (var { dateFrom, dateTo, reportId, onePeriodReports } of workSheets) {
        var { reportIsExist } = checkReportExistsInTree(dateFrom, reportTree);

        if (!reportIsExist) {
          var { reports, reportPeriodIsEmpty } = await extractReportDataFromWorkSheets(userId, onePeriodReports);

          if (!reportPeriodIsEmpty) {
            var reportData = await reportsProcessing(userId, dateFrom, dateTo, session, reports, isReportFromFile);
            reportsData.push(reportData);
          }
        }
      }
    });

    res.json({ reportsData });
  } catch (e) {
    console.log({ e });
    res.sendStatus(500);
  } finally {
    if (session.inTransaction()) {
      await session.endSession();
    }
  }
};

export default saveReportFromFile;
