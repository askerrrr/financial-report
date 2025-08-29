var { pipeline } = require("node:stream/promises");
var { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

var getFile = async (Key) => {
  var client = new S3Client(S3Client_OPTIONS);
  var command = new GetObjectCommand({ Bucket: bucketName, Key });

  var { Body } = await client(command);
};

module.exports = getFile;
