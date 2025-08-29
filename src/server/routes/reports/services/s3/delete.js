var env = require("../../../../env");
var { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

var deleteFile = async (Key) => {
  var client = new S3Client(env.S3Client_OPTIONS);
  var command = new DeleteObjectCommand({ Bucket: env.bucketName, Key });

  var res = await client(command);
};

module.exports = deleteFile;
