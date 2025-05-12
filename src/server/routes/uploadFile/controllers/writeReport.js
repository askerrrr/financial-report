var getXLSXData = require("../services/getXLSXData");

var writeReport = async (req, res, next) => {
  if (req.file) {
    var data = await getXLSXData(req.file.path);

    console.log("data: ", data);

    res.status(200).json({ msg: "success upload" });
  }
};

module.exports = writeReport;
