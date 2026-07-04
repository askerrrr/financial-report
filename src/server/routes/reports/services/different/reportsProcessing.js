import wbapi from "../WBAPI/index.js";
import sortYearsTree from "./sortYearTree.js";
import parseReports from "../reportParsing/index.js";
import parseJwt from "../../../WBToken/services/parseJwt.js";
import { WBAPIError } from "../../../../customError/index.js";
import addNewSkusToListGoods from "./addNewSkusToListGoods.js";
import dbutils from "../../../../database/collections/index.js";
import insertReportToReportTree from "../reportTreeBuilder/index.js";
import listGoodsLoader from "../../../goods/services/listGoodsLoader.js";
import updateListGoodsMetrics from "../different/updateListGoodsMetrics.js";
import { recordedToSchemaVersion, reportSchemaVersion } from "../../../../database/migration/schemaVersioning/reportsCollection.js";

var updateLastUsedTimestampNow = true;
var invalidTokenErrorMsg = "Invalid Token";
var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

var reportsProcessing = async (userId, dateFrom, dateTo, session) => {
  var { getWBTokenByUserId } = dbutils.tokenCollectionServices;

  var currentTimestamp = Date.now() + mskTimeOffsetInMs;

  var { token } = await getWBTokenByUserId(userId, session, updateLastUsedTimestampNow);

  var tokenPayload = parseJwt(token);

  if (!tokenPayload?.exp || tokenPayload.exp * 1000 <= currentTimestamp) {
    throw new WBAPIError(userId, 401, invalidTokenErrorMsg);
  }

  var { saveReportToDb } = dbutils.reportCollectionServices;
  var { getListGoodsFromDb, saveListGoodsToDb } = dbutils.goodsCollectionServices;
  var { getReportTree, updateReportTree } = dbutils.reportsTreeCollectionServices;
  var { setLastReportRequestTimestamp } = dbutils.reportLoadingStatesCollectionServices;
  var { addNewTaxYearToDb, changeTaxParamsToDb } = dbutils.taxParamsCollectionServices;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var { reportTree } = await getReportTree(userId, session);
  var reports = await wbapi.getReports(userId, dateFrom, dateTo, token);
  var { reportId } = reports.weeklyFinancialReport[0];

  var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);
  var sortedYears = sortYearsTree(years);

  if (isCrossYearPeriod) {
    var startYearTaxParams = await addNewTaxYearToDb(userId, startYear, session);
    var endYearTaxParams = await addNewTaxYearToDb(userId, endYear, session);
    var taxParams = { startYearTaxParams, endYearTaxParams };

    var { report, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams, isCrossYearPeriod);

    await changeTaxParamsToDb(userId, session, recalculatedTaxParams.startYearTaxParams, recalculatedTaxParams.endYearTaxParams);
  } else {
    var taxParams = await addNewTaxYearToDb(userId, year, session);
    var { report, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams);

    await changeTaxParamsToDb(userId, session, recalculatedTaxParams);
  }

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.isCrossYearPeriod = isCrossYearPeriod;
  report.schemaVersion = reportSchemaVersion;
  report.recordedTo = { year, month, schemaVersion: recordedToSchemaVersion };

  var { listGoods } = await getListGoodsFromDb(userId, session);

  if (!listGoods.length) {
    var listGoods = (await listGoodsLoader(userId, token)).listGoodsFromWBAPI;
  }

  var { listGoodsWithNewSkus } = await addNewSkusToListGoods(listGoods, skuNamesAndIds, isCrossYearPeriod, startYear, endYear);
  var { listGoodsWithUpdatedSkuMetrics } = await updateListGoodsMetrics(report, listGoodsWithNewSkus);

  await saveReportToDb(userId, report, session);
  await updateReportTree(userId, sortedYears, session);
  await saveListGoodsToDb(userId, listGoodsWithUpdatedSkuMetrics, session);
  await setLastReportRequestTimestamp(userId, session);

  return { reportId, year, month, dateFrom, dateTo, totalTaxAmount: report.totalTaxAmount };
};

export default reportsProcessing;
