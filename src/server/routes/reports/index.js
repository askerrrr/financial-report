import multer from "multer";
import { Router } from "express";
import fileFilter from "./services/fileFilter/index.js";

import getReport from "./controllers/getReport.js";
import deleteImage from "./controllers/deleteImage.js";
import saveReports from "./controllers/saveReports.js";
import deleteReport from "./controllers/deleteReport.js";
import getReportPage from "./controllers/getReportPage.js";
import skuPhotoUpload from "./controllers/skuPhotoUpload.js";
import deleteAllReports from "./controllers/deleteAllReports.js";
import setCostPriceToSku from "./controllers/setCostPriceToSku.js";
import deleteReportsTree from "./controllers/deleteReportsTree.js";
import checkReportExists from "./controllers/checkReportExists.js";
import reportLoadDelegate from "./controllers/reportLoadDelegate.js";
import setCostPriceToSkus from "./controllers/setCostPriceToSkus.js";
import downloadReportAsXLSX from "./controllers/downloadReportAsXLSX.js";
import downloadReportsAsZip from "./controllers/downloadReportsAsZip.js";
import setOtherExpensesToSku from "./controllers/setOtherExpensesToSku.js";
import checkReportsLoadingProgress from "./controllers/checkReportsLoadingProgress.js";
import changeFinancialAccountingStatus from "./controllers/changeFinancialAccountingStatus.js";

var storage = multer.memoryStorage();
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/:id", getReportPage);

router.get("/:userId/:reportId", getReport);

router.get("/download-report-as-xlsx/:userId/:reportId", downloadReportAsXLSX);

router.post("/download-reports-as-zip/", downloadReportsAsZip);

router.post("/save-new-report", reportLoadDelegate, checkReportExists, checkReportsLoadingProgress, saveReports);

router.patch("/set-cost-price-to-sku", setCostPriceToSku);

router.patch("/change-financial-accounting-status", changeFinancialAccountingStatus);

router.patch("/set-other-expenses-to-sku", setOtherExpensesToSku);

router.patch("/set-cost-price-to-skus", setCostPriceToSkus);

router.put("/sku-photo-upload/:skuName", upload.single("sku-photo"), skuPhotoUpload);

router.delete("/delete/", deleteReport);

router.delete("/delete_all_reports/:userId", deleteAllReports);

router.delete("/delete_all_reporting_periods/:userId", deleteReportsTree);

router.delete("/delete-image/", deleteImage);

export default router;
