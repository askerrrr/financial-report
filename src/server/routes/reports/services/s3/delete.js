var { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

var deleteFile = async (Key) => {
  var client = new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId: process.env.accessKeyIds, secretAccessKey: process.env.secretAccessKey },
  });

  var command = new DeleteObjectCommand({ Bucket: bucketName, Key });

  var res = await client(command);
};

module.exports = deleteFile;
