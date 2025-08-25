var multer = require("multer");
var { Router } = require("express");
var writeReport = require("./controllers/writeReport");
var writeReports = require("./controllers/writeReports");
var fileFilter = require("./services/fileFilter");

var reportStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/var/report_uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var temporaryItemsPhotoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/var/temporary-photo-storage/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var updoadReports = multer({ storage: reportStorage, fileFilter });
var uploadItemPhotos = multer({
  storage: temporaryItemsPhotoStorage,
  fileFilter,
});

var router = Router({ caseSensitive: true, strict: true });

router.get("/:id", require("./controllers/getReportHTML"));

router.get("/:userId/:id", require("./controllers/getReport"));

router.get("/download-report-as-xlsx/:userId/:reportId", require("./controllers/downloadReportAsXLSX"));

router.post("/download-reports-as-zip/", require("./controllers/checkAllCostPricesNonZero"), require("./controllers/downloadReportsAsZip"));

router.post("/period", require("./controllers/changeReportPeriod"));

router.post("/upload/file", updoadReports.single("file"), writeReport);

router.post("/upload/files", updoadReports.array("file", 10), writeReports);

router.post("/save-new-report", require("./controllers/getReportFromWBAPI"), require("./controllers/writeReportFromWBAPI"));

router.put("/change", require("./controllers/changeReportDetail"));

router.post("/item-photo-upload/:itemname", uploadItemPhotos.single("item-photo"), require("./controllers/itemPhotoUpload"));

router.delete("/delete/", require("./controllers/deleteReport"));

router.delete("/delete_all_reports/:userId", require("./controllers/deleteAllReports"));

router.delete("/delete_all_reporting_periods/:userId", require("./controllers/deleteReportsTree"));

router.delete("/delete-image/", require("./controllers/deleteImage"));

module.exports = router;
