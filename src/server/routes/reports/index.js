var multer = require("multer");
var { Router } = require("express");
var fileFilter = require("./services/fileFilter");

var storage = multer.memoryStorage()
var upload = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/:id", require("./controllers/getReportPage"));

router.get("/:userId/:id", require("./controllers/getReport"));

router.get("/download-report-as-xlsx/:userId/:reportId", require("./controllers/downloadReportAsXLSX"));

router.post("/download-reports-as-zip/", require("./controllers/checkAllCostPricesNonZero"), require("./controllers/downloadReportsAsZip"));

router.post(
  "/save-new-report",
  require("./controllers/checkReportExists"),
  require("./controllers/getReportsFromWBAPI"),
  require("./controllers/writeReportFromWBAPI")
);

router.put("/change", require("./controllers/changeReportDetail"));

router.post("/sku-photo-upload/:skuName", upload.single("sku-photo"), require("./controllers/skuPhotoUpload"));

router.delete("/delete/", require("./controllers/deleteReport"));

router.delete("/delete_all_reports/:userId", require("./controllers/deleteAllReports"));

router.delete("/delete_all_reporting_periods/:userId", require("./controllers/deleteReportsTree"));

router.delete("/delete-image/", require("./controllers/deleteImage"));

module.exports = router;
