import s3 from "../services/utils/s3/index.js";

var deleteImageController = async (req, res, next) => {
  var { httpStatusCode } = await s3.deleteFile(req.body.objectKey);

  return res.sendStatus(httpStatusCode);
};

export default deleteImageController;
