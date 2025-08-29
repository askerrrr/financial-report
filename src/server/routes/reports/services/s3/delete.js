var { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

var deleteFile = async (Key) => {
  var client = new S3Client(S3Client_OPTIONS);
  var command = new DeleteObjectCommand({ Bucket: bucketName, Key });

  var res = await client(command);
};

module.exports = deleteFile;
