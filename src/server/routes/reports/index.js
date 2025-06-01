var multer = require("multer");
var { Router } = require("express");
var writeReport = require("./controllers/writeReport");
var writeReports = require("./controllers/writeReports");
var fileFilter = require("./services/downloadFileServices/fileFilter");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/var/report_uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var updoad = multer({ storage, fileFilter });

var router = Router({ caseSensitive: true, strict: true });

router.get("/:id", require("./controllers/getReportHTML"));

router.get("/:userId/:id", require("./controllers/getReport"));

router.post("/period", require("./controllers/changeReportPeriod"));

router.post("/upload/file", updoad.single("file"), writeReport);

router.post("/upload/files", updoad.array("file", 10), writeReports);

router.post(
  "/wbapi",
  require("./controllers/getReportFromWBAPI"),
  require("./controllers/writeReportFromWBAPI")
);

router.post("/change", require("./controllers/changeReportDetail"));

module.exports = router;
