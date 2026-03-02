var Joi = require("joi");
var s3 = require("../services/s3");

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

module.exports = skuPhotoUpload;
