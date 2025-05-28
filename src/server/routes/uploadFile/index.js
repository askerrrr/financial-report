var multer = require("multer");
var { Router } = require("express");
var writeReport = require("./controllers/writeReport");
var writeReports = require("./controllers/writeReports");
var fileFilter = require("./services/fileFilter");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/var/report_uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var updoad = multer({ storage, fileFilter });

var router = Router();

router.post("/file", updoad.single("file"), writeReport);

router.post("/files", updoad.array("file", 10), writeReports);

module.exports = router;
