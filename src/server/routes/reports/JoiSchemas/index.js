import getReportSchema from "./getReport.js";
import saveReportsSchema from "./saveReports.js";
import deleteImageSchema from "./deleteImage.js";
import deleteReportSchema from "./deleteReport.js";
import skuPhotoUploadSchema from "./skuPhotoUpload.js";
import setCostPriceToSkuSchema from "./setCostPriceToSku.js";
import setCostPriceToSkusSchema from "./setCostPriceToSkus.js";
import downloadReportAsXLSXSchema from "./downloadReportAsXLSX.js";
import downloadReportsAsZipSchema from "./downloadReportsAsZip.js";
import setOtherExpensesToSkuSchema from "./setOtherExpensesToSku.js";
import changeFinancialAccountingStatusSchema from "./changeFinancialAccountingStatus.js";

var schema = {};

schema.saveReports = saveReportsSchema;
schema.deleteImage = deleteImageSchema;
schema.deleteReport = deleteReportSchema;
schema.skuPhotoUpload = skuPhotoUploadSchema;
schema.setCostPriceToSku = setCostPriceToSkuSchema;
schema.setCostPriceToSkus = setCostPriceToSkusSchema;
schema.downloadReportsAsZip = downloadReportsAsZipSchema;
schema.downloadReportAsXLSX = downloadReportAsXLSXSchema;
schema.setOtherExpensesToSku = setOtherExpensesToSkuSchema;
schema.changeFinancialAccountingStatus = changeFinancialAccountingStatusSchema;

export default schema;
