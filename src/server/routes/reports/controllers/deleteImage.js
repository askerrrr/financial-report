import Joi from "joi";
import s3 from "../services/s3/index.js";

var schema = Joi.object({ userId: Joi.string().required(), skuName: Joi.string().required() });

var deleteImage = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId, skuName } = req.body;
  var objectKey = "skuname=" + skuName + ";" + "userId=" + userId;
  var success = await s3.deleteFile(objectKey);
  return success ? res.sendStatus(200) : res.sendStatus(304);
};

export default deleteImage;
