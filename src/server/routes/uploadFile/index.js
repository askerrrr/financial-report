var multer = require("multer");
var { Router } = require("express");
var singleUpload = require("./controllers/singleUpload");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/var/report_uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var updoad = multer({ storage });

var router = Router();

router.post("/file", updoad.single("file"), singleUpload);

module.exports = router;
