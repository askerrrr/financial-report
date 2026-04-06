import Joi from "joi";
import s3 from "../services/s3/index.js";

var schema = Joi.object({ skuName: Joi.string().required() });

var skuPhotoUpload = async (req, res, next) => {
  var { error } = schema.validate(req.params);

  if (error) {
    return res.sendStatus(400);
  }

  var { skuName } = req.params;
  var buffer = req.file.buffer;
  var userId = req.app.locals.userId;
  var objectKey = "skuname=" + skuName + ";" + "userId=" + userId;
  var { httpStatusCode } = await s3.uploadFile(objectKey, buffer);
  return res.sendStatus(httpStatusCode);
};

export default skuPhotoUpload;
