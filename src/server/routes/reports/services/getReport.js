import dbUtils from "../../../database/modelsUtil/index.js";
import getSignedUrlsToSkuImages from "./utils/different/getSignedUrlsToSkuImages.js";
import filterCostsForReportSkus from "./utils/different/filterCostsForReportSkus.js";

var { getReportById } = dbUtils.reportModelUtils;
var { getListGoodsFromDb } = dbUtils.goodsModelUtils;

var selectedFields = { "listGoods.skuName": 1, "listGoods.lastCostPrice": 1 };

var getReportService = async (data) => {
  var { userId, reportId } = data;

  var { report } = await getReportById(userId, reportId);

  if (!report) {
    return {
      report: {},
      signedUrls: [],
      reportNotFound: true,
      skusWithLastCostPrices: [],
    };
  }

  var { signedUrls } = await getSignedUrlsToSkuImages(userId, report.skus);

  var skuNames = report.skus.map((sku) => sku.skuName);

  var { listGoods } = await getListGoodsFromDb(
    userId,
    skuNames,
    selectedFields,
  );

  var { filteredSkusWithLastCostPrices } = filterCostsForReportSkus(
    report.skus,
    listGoods,
  );

  return {
    report,
    signedUrls,
    reportNotFound: false,
    skusWithLastCostPrices: filteredSkusWithLastCostPrices,
  };
};

export default getReportService;
