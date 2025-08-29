var env = require("../../../../env");
var { pipeline } = require("node:stream/promises");
var { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

var getFile = async (Key) => {
  var client = new S3Client(env.S3Client_OPTIONS);
  var command = new GetObjectCommand({ Bucket: env.bucketName, Key });

  var { Body } = await client(command);
};

module.exports = getFile;
