var multer = require("multer");
var { Router } = require("express");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/var/report_uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var router = Router();

module.exports = router;
