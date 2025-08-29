var env = require("../../../../env");
var { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

var uploadFile = async (objectKey, buffer) => {
  var client = new S3Client(env.S3Client_OPTIONS);
  var command = new PutObjectCommand({ Bucket: env.bucketName, Key: objectKey, Body: buffer, ContentType: "image/png" });
  var res  = await client.send(command);
  console.log("httpStatusCode: ", res['$metadata'].httpStatusCode);
  return { httpStatusCode: res['$metadata'].httpStatusCode }
};

module.exports = uploadFile;
