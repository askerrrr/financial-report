var { readFile } = require("node:fs/promises");
var { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

var uploadFile = async (objectName, filePath) => {
  var client = new S3Client(S3Client_OPTIONS);
  var command = new PutObjectCommand({ Bucket: process.env.bucketName, Key: objectName, Body: await readFile(filePath) });

  var res = await client.send(command);

  console.log("upload result: ", res);
  return res;
};

module.exports = uploadFile;
