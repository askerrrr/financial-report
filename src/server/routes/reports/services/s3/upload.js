var { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

var uploadFile = async (userId, itemname, filePath) => {
  var fileName = itemname + "_" + userId;

  var client = new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId: process.env.accessKeyIds, secretAccessKey: process.env.secretAccessKey },
  });

  var command = new PutObjectCommand({ Bucket: bucketName, Key: fileName, Body: await readFile(req.file.path) });

  var res = await client.send(command);

  console.log("upload result: ", res);
  return res;
};

module.exports = uploadFile;
