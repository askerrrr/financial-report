var singleUpload = async (req, res, next) => {
  try {
    return res.send("success upload");
  } catch (e) {
    next(e);
  }
};

module.exports = singleUpload;
