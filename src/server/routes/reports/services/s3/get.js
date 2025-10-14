var { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

var getFile = async (Key) => {
  try {
    var client = new S3Client(process.env.S3_CLIENT_OPTIONS);
    var command = new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key });
    var { Body } = await client.send(command);
    var base64 = Body.transformToString("base64");
    return base64;
  } catch (e) {
    if (e.message == "NuSuchKey") {
      return null;
    }
  }
};

module.exports = getFile;
