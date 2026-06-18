import multer from "multer";
import { Router } from "express";
import schemas from "./JoiSchemas/index.js";
import fileFilter from "./services/fileFilter/index.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

import getReport from "./controllers/getReport.js";
import deleteImage from "./controllers/deleteImage.js";
import saveReports from "./controllers/saveReports.js";
import deleteReport from "./controllers/deleteReport.js";
import getReportPage from "./controllers/getReportPage.js";
import skuPhotoUpload from "./controllers/skuPhotoUpload.js";
import setCostPriceToSku from "./controllers/setCostPriceToSku.js";
import deleteReportsTree from "./controllers/deleteReportsTree.js";
import checkReportExists from "./controllers/checkReportExists.js";
import reportLoadDelegate from "./controllers/reportLoadDelegate.js";
import setCostPriceToSkus from "./controllers/setCostPriceToSkus.js";
import downloadReportAsXLSX from "./controllers/downloadReportAsXLSX.js";
import downloadReportsAsZip from "./controllers/downloadReportsAsZip.js";
import setOtherExpensesToSku from "./controllers/setOtherExpensesToSku.js";
import getReportLoadingState from "./controllers/getReportLoadingState.js";
import checkReportsLoadingProgress from "./controllers/checkReportsLoadingProgress.js";
import resumeAbandonedReportsLoading from "./controllers/resumeAbandonedReportsLoading.js";
import changeFinancialAccountingStatus from "./controllers/changeFinancialAccountingStatus.js";

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/:id", getReportPage);
router.get("/:userId/:reportId", getReport);
router.post("/", joiSchemaValidator(schemas.saveReports), reportLoadDelegate, checkReportExists, checkReportsLoadingProgress, saveReports);
router.delete("/", joiSchemaValidator(schemas.deleteReport), deleteReport);

router.post("/as-zip/", joiSchemaValidator(schemas.downloadReportsAsZip), downloadReportsAsZip);
router.post("/as-xlsx/", joiSchemaValidator(schemas.downloadReportAsXLSX), downloadReportAsXLSX);

router.get("/loading-state/:userId/", getReportLoadingState);
router.post("/loading-state/abandoned/", joiSchemaValidator(schemas.resumeAbandonedReportsLoading), resumeAbandonedReportsLoading);

router.patch("/skus/cost-price", joiSchemaValidator(schemas.setCostPriceToSku), setCostPriceToSku);
router.patch("/skus/cost-prices", joiSchemaValidator(schemas.setCostPriceToSkus), setCostPriceToSkus);
router.patch("/skus/other-expenses", joiSchemaValidator(schemas.setOtherExpensesToSku), setOtherExpensesToSku);

router.patch("/financial-accounting-status/", joiSchemaValidator(schemas.changeFinancialAccountingStatus), changeFinancialAccountingStatus);

router.delete("/delete_all_reporting_periods/:userId", deleteReportsTree);

router.post("/image/", joiSchemaValidator(schemas.skuPhotoUpload), upload.single("sku-photo"), skuPhotoUpload);
router.delete("/image/", joiSchemaValidator(schemas.deleteImage), deleteImage);

export default router;
