var singleUpload = async (req, res, next) => {
  return res.status(200).json({ msg: "success upload" });
};

module.exports = singleUpload;
