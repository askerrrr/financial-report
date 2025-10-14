var { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

var deleteFile = async (Key) => {
  var client = new S3Client(JSON.parse(process.env.S3_CLIENT_OPTIONS));
  var command = new DeleteObjectCommand({ Bucket: process.env.BUCKET_NAME, Key });
  var res = await client.send(command);
  return res;
};

module.exports = deleteFile;
